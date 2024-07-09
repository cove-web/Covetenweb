"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { FaComment } from "react-icons/fa";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, Grid } from "swiper/modules";
import AnimatedButton from "../AnimatedButton";
import { LuArrowRight, LuArrowRightCircle } from "react-icons/lu";
import ProductSkeleton from "./ProductSkeleton";
import { Suspense } from "react";
import NewProductCard from "./NewProductCard/NewProductCard";

export default function Products({ products }: { products: any }) {
  return (
    <section className="pt-12">
      <div className="max-w-screen-2xl mx-auto px-2 lg:px-12  md:px-8">
        <div className="relative max-w-screen-xl mx-auto sm:text-center">
          <div className="relative z-10">
            {/* <h3 className=" text-3xl font-semibold text-center sm:text-4xl mb-3" style={{color:"#21618c",textTransform:"uppercase"}}>
              Popular Products
            </h3> */}
            <p className="cross-news--title">
              <strong>Our Products</strong>
            </p>
            <p className="mx-auto max-w-screen-md text-center text-dimText dark:text-darkDimText ">
              We offer you a carefully chosen range of products intended to
              improve your working style. Our goal is to deliver excellent
              solutions that satisfy your requirements and tastes. Look through
              our wide selection of items to discover the ideal fit for your
              working style.
            </p>
          </div>
        </div>
        <div className="relative mt-12" style={{backgroundColor:'#eaeaea'}}>
          <div className="prodcontainer">
          {products &&
                  products.map((item: any, idx: number) => (
            <div className="prodcard">
              <div className="prodimage-wrapper">
                <img
                  alt="traveller"
                  src={item?.image}
                  // src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </div>
              <div className="prodcontent">
                <h2 style={{color:'red'}}> {item?.title}</h2>
                <p>
                {item?.shortDescription.slice(0, 180) || "N/A"}
                </p>
              </div>
            </div>
             ))}
            {/* <div className="card">
              <div className="image-wrapper">
                <img
                  alt="traveller"
                  src="https://images.unsplash.com/photo-1628152184584-1bec8d3a3cbe?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTg4MTk2MTJ8&ixlib=rb-4.0.3&q=85"
                />
              </div>
              <div className="content">
                <h2>Card Two</h2>
                <p>
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </p>
              </div>
            </div> */}
            {/* <div className="card">
              <div className="image-wrapper">
                <img
                  alt="traveller"
                  src="https://images.unsplash.com/photo-1531210194434-2bc4d24185a8?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTg4MTk2MTJ8&ixlib=rb-4.0.3&q=85"
                />
              </div>
              <div className="content">
                <h2>Card Three</h2>
                <p>
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </p>
              </div>
            </div> */}
          </div>
        
          {/* <ProductSkeleton /> */}
          {/* <Suspense fallback={<ProductSkeleton />}>
            <ul className="">
              <Swiper
                modules={[Navigation, Pagination, A11y, Autoplay]}
                spaceBetween={10}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                pagination={{
                  clickable: true,
                }}
                slidesPerView={1}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  900: {
                    slidesPerView: 3,
                    spaceBetween: 18,
                  },
                }}
              >
                {products &&
                  products.map((item: any, idx: number) => (
                    <SwiperSlide key={item} className="pb-10  ">
                      <NewProductCard data={item} />
                      <Link href={`/products/details/${item?.id}`}>
                        <div
                          style={{
                            backgroundImage: `linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) ), url(${item?.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                          className="productCard"
                        >
                          <div className="productCard-front">
                            <p className="productTitle uppercase text-[#21618c]">
                              {item?.title}
                            </p>
                          </div>
                          <div className="productCard-back">
                            <div className="mt-4 px-5 pb-5 w-full h-full grid place-content-center ">
                              <h5 className="text-2xl font-bold  uppercase text-white ">
                                {item?.title}
                              </h5>
                              <p className="mt-2  mb-5 text-white">
                                {item?.shortDescription.slice(0, 180) || "N/A"}
                              </p>

                              <Link
                                href={`/products/details/${item?.id}`}
                                className=" w-full text-3xl "
                              >
                                <p className="border w-14 h-14  border-white rounded-full  flex items-center justify-center">
                                  <LuArrowRight />
                                </p>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </ul>
          </Suspense> */}
    
        </div>
        <button>
        <Link href="/products">
              View All
           
          </Link>
        </button>
      </div>
      
    </section>
  );
}
