"use client";

import { useGqlClient } from "@/hooks/UseGqlClient";
import { useManualQuery } from "graphql-hooks";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "../loading";
import Pagination from "@/components/Pagination";
import Eads from "@/components/Home/Eads";

const GET_PRODUCTS = `
query Query($where: ProductWhere, $options: ProductOptions) {
    products(where: $where, options: $options)  {
      title
      shortDescription
      price
      id
      image
    }
  }`;

const Main = () => {
  // states
  const [products, setProducts] = useState<any[]>([]);
  const [pageLimit, setPageLimit] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [hdetails, setHdetails] = useState<any>(null);
  const [searchInput, setSearchInput] = useState("");

  // hooks
  const client = useGqlClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("query");

  // queries
  const [getProductsFn, dataState] = useManualQuery(GET_PRODUCTS, { client });

  useEffect(() => {
    const where = search
      ? {
        IsApproved: true,
        title_CONTAINS: search,
      }
      : {
        IsApproved: true,
      };

    getProducts(where);
  }, [search]);

  useEffect(() => {
    getProducts();
    getItemsCount();
  }, [currentPage]);

  const getProducts = async (where: any = { IsApproved: true }) => {
    const { data } = await getProductsFn({
      variables: {
        where: where,
        options: {
          limit: pageLimit,
          offset: (currentPage - 1) * pageLimit,
          sort: [
            {
              createdAt: "DESC",
            },
          ],
        },
      },
    });

    if (data?.products) {
      setProducts(data?.products);
    }
  };

  const getItemsCount = async () => {
    const { data } = await getProductsFn();

    if (data?.products?.length > 0) {
      setTotalProduct(data?.products?.length);
      setTotalPages(Math.ceil(data?.products?.length / pageLimit));
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`?query=${searchInput}`);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch('http://localhost:25000/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: `query AboutPages {
              aboutPages {
                id
                title
                image
                description
                count
                ctext
                hoadsimg
                hadstitle
                hadsdesc
                btadstitle
                btadsdesc
                productsastitle
                productsasdesc
                producthoradstitle
              }
            }`,
          }),
          next: { revalidate: 10 }
        });

        const { data } = await res.json();
        if (data.aboutPages.length > 0) {
          setHdetails(data.aboutPages[0]);
        }
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, []);

  if (dataState.loading) return <Loading />;

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 pb-24 mx-auto">
          <form onSubmit={handleSearchSubmit} className="mb-6">
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="w-full p-2 border rounded"
              style={{width:'200px'}}
            />
          </form>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {products.length ? (
              products.map((product, index) => (
                <div
                  key={index}
                  className="group relative my-5 flex w-full flex-col overflow-hidden border rounded dark:bg-darkBgLight dark:border-darkBorder bg-white/30 cursor-pointer"
                  style={{ backgroundColor: '#f8f9fa',borderRadius:'10px',padding:'1px',boxShadow:'0 2px 5px #0000001a' }}
                >
                  <div className="product_card">
                    <div className="add_to_wishlist">
                      <i className="far fa-heart"></i>
                    </div>
                    <div className="image">
                      <img
                        src={product?.image || "/assets/no_image.png"} alt="" />
                    </div>
                    <div className="product_info">
                      <h2 className="product_name">
                        {product?.title}
                      </h2>
                      <div className="bottom">
                        <div className="price">
                          <span className="_price">₹{product?.price}</span>
                        </div>
                        {/* <div className="buttons"> */}
                          {/* <button className="add_to_cart"> */}
                            <Link
                              href={`/products/details/${product?.id}`}
                              className="text-white gradient-bg font-400 rounded text-sm px-4 py-1.5 text-center"
                              style={{ backgroundColor: '#eaeaea', color: 'black', border: '1px solid black',padding:'0.5rem' }}
                            >
                               Details
                            </Link>
                          {/* </button> */}
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p className="text-dimText">No Products Found</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* <div className="sticky_bottom">
        <div className="ads_sticky_bottom">
          {hdetails?.producthoradstitle}
          <a href="#">
            <img
              data-original-height="129"
              data-original-width="1024"
              height="80"
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiemnIKcQNgpCAr8FkQ98KqWewgvX4yCO5AbE77FbQxCCjtcKfUAMsQPpnvDxfPuyQxvyl9vz6qMUIsPRxb1E3ybA6djfLevmsl3VHnaMFfuhtI4ieNlZUv7rn2DqzMouR6q_Rra0pwEm0Etkno3qTiQU6BxOfNnreoj_r4UUg4eRbj9dwRWTGCA4tN/w640-h80/How%20to%20Explain%20Banner%20Ads%20to%20Anyone-5.webp"
              width="640"
            />
          </a>
        </div>
      </div> */}
      
      <Eads/>
    </>
  );
};

export default Main;
