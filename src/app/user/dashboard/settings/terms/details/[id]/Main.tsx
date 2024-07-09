"use client";
import { useGqlClient } from "@/hooks/UseGqlClient";
import { useMutation, useQuery } from "graphql-hooks";
import React, { useEffect, useState } from "react";
import DataFrom from "./DataFrom";

import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Loading from "@/app/loading";
import Error from "@/components/Error";
import slugify from "slugify";

const UPDATE_DATA = `
mutation UpdateTermsPages($where: TermsPageWhere, $update: TermsPageUpdateInput) {
    updateTermsPages(where: $where, update: $update) {
      termsPages {
        id
      }
    }
  }
`;
const GET_DATA = `
query TermsPages($where: TermsPageWhere) {
    termsPages(where: $where) {
      id
      title
      content
      downloadUrl
    }
  }

`;

const Main = () => {
  // states
  const [descriptionEditorState, setDescriptionEditorState] = useState("");

  const [termsData, settermsData] = React.useState({
    content: "",
    title: "",
    docUrl: "",
  });

  // hooks
  const client = useGqlClient();
  const params = useParams();
  const router = useRouter();

  // QUERY
  const {
    data: previoustermsData,
    loading,
    error,
    refetch,
  } = useQuery(GET_DATA, { client, variables: { where: { id: params?.id } } });

  //mutation
  const [updatetermsFn, updateState] = useMutation(UPDATE_DATA, { client });

  // // action on change
  useEffect(() => {
    if (previoustermsData?.termsPages?.length) {
      const { title, content, downloadUrl } = previoustermsData.termsPages[0];
      setDescriptionEditorState(JSON.parse(content));
      settermsData({
        title,
        content,
        docUrl: downloadUrl,
      });
    }
  }, [previoustermsData?.termsPages?.length]);

  // initializing the mutation and  quires
  const updateterms = async (input: any) => {
    const { data } = await updatetermsFn({
      variables: {
        where: {
          id: params?.id,
        },
        update: {
          title: input.title,
          downloadUrl: input.docUrl,
          slug: slugify(input.title, {
            replacement: "_",
            remove: / [* +~.()'"!:@]/g,
          }),
          content: input.content,
          forInvoice: input.forInvoice,
        },
      },
    });
    if (data?.updateTermsPages?.termsPages?.length) {
      toast.success("terms updated successfully");
      refetch();
      router.push("/admin/dashboard/settings/terms");
    }
  };

  if (loading || updateState.loading) return <Loading />;
  if (error || updateState.error) return <Error />;

  return (
    <>
      <DataFrom
        settermsData={settermsData}
        termsData={termsData}
        descriptionEditorState={descriptionEditorState}
        setDescriptionEditorState={setDescriptionEditorState}
        updatetermsFn={updateterms}
      />
    </>
  );
};

export default Main;
