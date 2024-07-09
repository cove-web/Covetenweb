'use client'
import Button from '@/components/Button';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useQuery } from 'graphql-hooks';
import React, { useEffect,useState,useRef } from 'react';
import Modal from './Modal';
import PageTextEditor from '@/components/PageTextEditor';
import Content from './Content';
import { useParams } from 'next/navigation'
import { BsCurrencyRupee } from 'react-icons/bs';
import Link from 'next/link';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const GET_PRODUCTS = `
query Query($where: ProductWhere) {
    products(where: $where)  {
        title
        shortDescription
        price
        id
        file
        video
        image
        others
        features
        sideImage
    }
  }`


// component
const Main = () => {
    // states
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [features, setFeatures] = React.useState<any>(null)
    const [highlights, setHighlights] = React.useState<any>(null)

    // hooks
    const client = useGqlClient()
    const params = useParams()

    // quires
    const { data, loading } = useQuery(GET_PRODUCTS, {
        client,
        variables: {
            where: {
                id: params.slug
            }
        }

    })

    useEffect(() => {
        if (data?.products[0]?.features) {
            setFeatures(JSON.parse(data?.products[0]?.features))
        }
        if (data?.products[0]?.others) {
            setHighlights(JSON.parse(data?.products[0]?.others))
        }
    }, [data?.products[0]])
    const [imgId, setImgId] = useState(1);
  const imgShowcaseRef = useRef(null);

  const images = [
    "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_1.jpg",
    "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg",
    "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg",
    "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg"
  ];

  const slideImage = () => {
    const displayWidth = imgShowcaseRef.current.querySelector('img').clientWidth;
    imgShowcaseRef.current.style.transform = `translateX(${-(imgId - 1) * displayWidth}px)`;
  };

  useEffect(() => {
    window.addEventListener('resize', slideImage);
    slideImage(); // Initial call to set the position
    return () => window.removeEventListener('resize', slideImage);
  }, [imgId]);

    return (
        <>
            {/* <section id="product-info">
                <h1 className="text-2xl font-bold mb-4">{data?.products[0].title}</h1>

                <div className="item-image-parent">
                    <div className="item-image-main">
                        <img src={data?.products[0].image || '/assets/no_image.png'} className='w-full' />
                    </div>
                    <div className="item-list-horizontal mt-4 flex justify-center">
                        <div className="thumb-box mx-2">
                            <img src={data?.products[0].image || '/assets/no_image.png'} className='w-full' />
                        </div>
                        <div className="thumb-box mx-2">
                            <img src={data?.products[0].sideImage || '/assets/no_image.png'} className='w-full' />
                        </div>
                        <div className="thumb-box mx-2">
                            <img src={data?.products[0].sideImage || '/assets/no_image.png'} className='w-full' />
                        </div>
                        <div className="thumb-box mx-2">
                            <img src={data?.products[0].sideImage || '/assets/no_image.png'} className='w-full' />
                        </div>
                    </div>
                </div>

                <div className="item-info-parent mt-6">
                    <div className="main-info mb-6">
                        <h4>Details:</h4>
                        <div className="star-rating mb-4">
                            <span>★★★★</span>★
                        </div>
                        <p className="text-lg font-bold">Price: {data?.products[0].price}</p>
                    </div>

                    <div className="select-items">
                        <h4>Features:</h4>
                        <div>
                            {features && <Content content={features} />}
                        </div>
                        <div className="change-size mt-4">
                            <label><b>Quantity:</b></label><br />
                            <select className="mt-2">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="description mt-4">
                            <h4>Details:</h4>
                            {highlights && <Content content={highlights} />}
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex items-center">
                    <div className="flex items-center space-x-2 mr-5">
                        <span className="font-bold text-3xl leading-none align-baseline">Price: {data?.products[0].price}</span>
                    </div>
                    <div onClick={() => setIsModalOpen(true)} className="inline-block align-bottom">
                        <Button title='Inquiry' />
                    </div>
                </div>

                <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} product={data?.products[0].title} />
            </section> */}
            <div className="card-wrapper">
                <div style={{backgroundColor:'rgb(254,153,3)'}}>
      <div className="pdcard">
        
        {/* card left */}
        <div className="product-imgs" style={{marginLeft:'2rem'}}>
          <div className="img-display">
          {/* <h2 className="product-title" style={{textDecoration:'none'}}> {highlights && <Content content={highlights} />}</h2> */}

            <div className="img-showcase" ref={imgShowcaseRef}>
              {images.map((img, index) => (
                // <img key={index} src={img} alt={`shoe image ${index + 1}`} />
                <img src={data?.products[0].image || '/assets/no_image.png'}  />
              ))}
            </div>
          </div>
          <div className="img-select">
            {images.map((img, index) => (
              <div className="img-item" key={index}>
                <a href="#" data-id={index + 1} onClick={(event) => {
                  event.preventDefault();
                  setImgId(index + 1);
                }}>
                  {/* <img src={img} alt={`shoe image ${index + 1}`} /> */}
                  <img src={data?.products[0].image || '/assets/no_image.png'}  />
                </a>
              </div>
            ))}
          </div>
          {/* <p> {highlights && <Content content={highlights} />}</p> */}
          <p>{data?.products[0].title}</p>
        </div>
        {/* card right */}
        <div className="product-content" style={{marginTop:'5rem',backgroundColor:'white',width:'27rem',marginBottom:'3rem'}}>
          {/* <h2 className="product-title"> {highlights && <Content content={highlights} />}</h2> */}
          <a href="#" className="product-link" style={{marginTop:'2rem'}}> Details </a>
          <div className="product-rating">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
            <span>4.7(21)</span>
          </div>

          <div className="product-price">
            {/* <p className="last-price">Old Price: <span>{data?.products[0].price}</span></p> */}
            <p className="new-price"> Price: <span>{data?.products[0].price} Rs</span></p>
          </div>

          <div className="product-detail">
            <h2>Details </h2>
           <p> {highlights && <Content content={highlights} />}</p>
            <ul>
              <li>Color: <span>Black</span></li>
              <li>Available: <span>in stock</span></li>
              <li>Category: <span>Shoes</span></li>
              <li>Shipping Area: <span>All over the world</span></li>
              <li>Shipping Fee: <span>Free</span></li>
            </ul>
          </div>

          <div className="purchase-info">
            {/* <input type="number" min="0" defaultValue="1" /> */}
            <button type="button" className="btn" style={{backgroundColor:'rgb(196,0,92)'}}>
              Buy Now <i className="fas fa-shopping-cart"></i>
            </button>
            <button type="button" className="btn">Compare</button>
          </div>

          <div className="social-links">
            <p>Share At: </p>
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            {/* <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="#">
              <i className="fab fa-pinterest"></i>
            </a> */}
          </div>
        </div>
      </div>
      </div>
    </div>
        </>
    );
};

export default Main;
