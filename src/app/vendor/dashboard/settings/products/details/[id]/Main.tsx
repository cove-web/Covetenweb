"use client";
import { useGqlClient } from "@/hooks/UseGqlClient";
import { useMutation, useQuery } from "graphql-hooks";
import React, { useEffect, useState } from "react";
import DataFrom from "./DataFrom";

import { useParams, useRouter } from "next/navigation";
import { Product } from "@/gql/graphql";
import { toast } from "react-hot-toast";
import Loading from "@/app/loading";
import Error from "@/components/Error";

const UPDATE_PRODUCT = `
mutation UpdateProducts($connect: ProductConnectInput, $disconnect: ProductDisconnectInput, $where: ProductWhere, $update: ProductUpdateInput) {
  updateProducts(connect: $connect, disconnect: $disconnect, where: $where, update: $update)  {
      products {
        id
      }
    }
  }
`;
const GET_PRODUCT = `
query Products($where: ProductWhere) {
    products(where: $where) {
      id
      title
      shortDescription
      others
      features
      image
      file
      video
      sideImage
       categoryHas {
      id
      name
    }
    }
  }

`;

const Main = () => {
  // states
  const [featureEditorState, setFeatureEditorState] = useState("");

  const [othersEditorState, setOthersEditorState] = useState("");
  const [productData, setProductData] = React.useState({
    title: "",
    shortDescription: "",
    image: "",
    price: "",
    video: "",
    file: "",
    sideImage: "",
    category: "",
  });

  // hooks
  const client = useGqlClient();
  const params = useParams();
  const router = useRouter();

  // QUERY
  const {
    data: previousProductData,
    loading,
    error,
  } = useQuery(GET_PRODUCT, {
    client,
    variables: { where: { id: params?.id } },
  });

  //mutation
  const [updateProductFn, updateState] = useMutation(UPDATE_PRODUCT, {
    client,
  });

  // // action on change
  useEffect(() => {
    if (previousProductData?.products?.length) {
      const {
        title,
        shortDescription,
        sideImage,
        features,
        others,
        image,
        price,
        video,
        file,
        categoryHas,
      } = previousProductData.products[0];
      setFeatureEditorState(JSON.parse(features));
      setOthersEditorState(JSON.parse(others));
      setProductData({
        title,
        shortDescription,
        image,
        price,
        file,
        video,
        sideImage,
        category: categoryHas,
      });
    }
  }, [previousProductData?.products?.length]);

  // initializing the mutation and  quires
  const updateProduct = async (input: any) => {
    const { data } = await updateProductFn({
      variables: {
        where: {
          id: params?.id,
        },
        update: {
          title: input.title,
          shortDescription: input.shortDescription,
          features: input.features,
          others: input.others,
          image: input.image || previousProductData?.products[0].image,
          sideImage:
            input.sideImage || previousProductData?.products[0].sideImage,
          price: input.price,
          video: input.video,
          file: input.file,
          categoryHas: {
            connect: {
              where: {
                node: {
                  id: input.category,
                },
              },
            },
          },
        },
        disconnect: {
          categoryHas: {
            where: {
              node: {
                id:
                  input.previousCategory === input.category
                    ? ""
                    : input.previousCategory,
              },
            },
          },
        },
      },
    });
    if (data?.updateProducts?.products?.length) {
      toast.success("Product updated successfully");
      router.push("/admin/dashboard/settings/products");
    }
  };

  if (loading || updateState.loading) return <Loading />;
  if (error || updateState.error) return <Error />;

  return (
    <>
      <DataFrom
        setProductData={setProductData}
        productData={productData}
        othersEditorState={othersEditorState}
        setOthersEditorState={setOthersEditorState}
        featureEditorState={featureEditorState}
        setFeatureEditorState={setFeatureEditorState}
        updateProductFn={updateProduct}
      />
    </>
  );
};

export default Main;
