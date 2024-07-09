"use client";

import { useGqlClient } from "@/hooks/UseGqlClient";
import { useManualQuery } from "graphql-hooks";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import Loading from "../loading";
import Pagination from "@/components/Pagination";
import { AiFillStar } from "react-icons/ai";
import Modal from "./Modal";

const GET_PRODUCTS = `
query LearnItems($where: LearnItemWhere, $options: LearnItemOptions) {
    learnItems(where: $where, options: $options) {
      id
      title
      description
      url
      imageUrl
      mode
      rating
      courseFor
      seats
      price
      credit
      startDate
      endDate
    }
  }
  `;

// components
const Main = ({ searchOption, searchTerm }: any) => {
  // states
  const [products, setProducts] = React.useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentEvent, setCurrentEvent] = React.useState<any>(null);

  // pagination states
  const [pageLimit, setPageLimit] = React.useState(12);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [totalProduct, setTotalProduct] = React.useState(0);

  // hooks
  const client = useGqlClient();
  const searchParams = useSearchParams();

  // queries
  const [getProductsFn, dataState] = useManualQuery(GET_PRODUCTS, { client });

  useEffect(() => {
    let where;

    if (searchOption === "accredited") {
      where = {
        accredited_CONTAINS: searchTerm,
      };
    } else if (searchOption === "duration") {
      where = {
        duration_CONTAINS: searchTerm,
      };
    } else if (searchOption === "certification") {
      where = {
        certification_CONTAINS: searchTerm,
      };
    } else {
      where = {};
    }

    getProducts(where);
  }, [searchTerm, searchOption]);

  useEffect(() => {
    getProducts();
    getItemsCount();
  }, [currentPage]);

  const getProducts = async (where: any = {}) => {
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

    if (data?.learnItems) {
      setProducts(data?.learnItems);
    }
  };

  const getItemsCount = async () => {
    const { data } = await getProductsFn();
    if (data?.learnItems?.length > 0) {
      setTotalProduct(data?.learnItems?.length);
      setTotalPages(Math.ceil(data?.learnItems?.length / pageLimit));
    }
  };

  useEffect(() => {}, [products?.length]);

  if (dataState.loading) return <Loading />;

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AiFillStar
          key={i}
          color={i <= rating ? "blue" : "gray"}
        />
      );
    }
    return stars;
  };

  return (
    <>
    <h5 style={{color:'#00008b',paddingLeft:'3.6rem',fontSize:'2rem',fontWeight:'600px'}}>Featured Courses</h5>
    
      <div className="courses-container">
        
        {products?.length &&
          products?.map((item: any) => (
            <div key={item.id} className="course-card">
              <img
                alt={item.name}
                width={300}
                height={200}
                className="course-image"
                style={{
                  backgroundImage: `url(${item?.imageUrl})`,
                }}
              />
              <h6 className="course-name" style={{ textTransform: 'capitalize', textAlign: 'left', padding: '0.5rem', fontSize: '1.2rem' }}>
                {item.title}
              </h6>
              <div className="course-rating" style={{ textTransform: 'capitalize', textAlign: 'left', padding: '0.5rem',display:'flex',color:'gray' }}>
                {renderStars(item.rating)}
              </div>
              <Link href={''}>
             <p style={{textAlign:'left',padding:'0.5rem',cursor:'pointer'}}>Read More....</p>
             </Link>
            </div>
          ))}
      </div>
      
      

      <div className="w-full mt-12 flex items-center justify-center">
        {totalProduct > pageLimit && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </div>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        learn={currentEvent}
      />
    </>
  );
};

export default Main;
