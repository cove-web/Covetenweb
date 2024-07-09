'use client'
import React, { useEffect, useState, useRef } from 'react';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useQuery } from 'graphql-hooks';
import { useParams } from 'next/navigation';
import Content from './Content';

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
  }`;

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [features, setFeatures] = useState<any>(null);
  const [highlights, setHighlights] = useState<any>(null);
  const [imgId, setImgId] = useState(1);
  const imgShowcaseRef = useRef(null);
  const client = useGqlClient();
  const params = useParams();
  const { data, loading } = useQuery(GET_PRODUCTS, {
    client,
    variables: {
      where: {
        id: params.slug,
      },
    },
  });

  useEffect(() => {
    if (data?.products[0]?.features) {
      setFeatures(JSON.parse(data?.products[0]?.features));
    }
    if (data?.products[0]?.others) {
      setHighlights(JSON.parse(data?.products[0]?.others));
    }
  }, [data?.products[0]]);

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

  // Dummy comparison data
  const comparisonData = [
    { feature: 'Feature 1', product1: 'Lorem Ipsum 1', product2: 'Lorem Ipsum 2' },
    { feature: 'Feature 2', product1: 'Lorem Ipsum 3', product2: 'Lorem Ipsum 4' },
    { feature: 'Feature 3', product1: 'Lorem Ipsum 5', product2: 'Lorem Ipsum 6' },
    { feature: 'Feature 4', product1: 'Lorem Ipsum 7', product2: 'Lorem Ipsum 8' },
    { feature: 'Feature 5', product1: 'Lorem Ipsum 9', product2: 'Lorem Ipsum 10' },
  ];

  return (
    <>
      <div className="card-wrapper">
        <div>
          <div className="pdcard">
            <div className="product-imgs" style={{ marginLeft: '2rem' }}>
              <div className="img-select">
                {images.map((img, index) => (
                  <div className="img-item" key={index}>
                    <a href="#" data-id={index + 1} onClick={(event) => {
                      event.preventDefault();
                      setImgId(index + 1);
                    }}>
                      <img src={data?.products[0].image || '/assets/no_image.png'} />
                    </a>
                  </div>
                ))}
              </div>
              <div className="img-display" >
                <div className="img-showcase" ref={imgShowcaseRef} style={{width:'790px'}}>
                  {images.map((img, index) => (
                    <img key={index} src={data?.products[0].image || '/assets/no_image.png'} style={{width:'1000px'}}/>
                  ))}
                </div>
              </div>
              <p>{data?.products[0].title}</p>
            </div>
            <div className="product-content" style={{ marginTop: '5rem', width: '27rem', marginBottom: '3rem' }}>
              <a href="#" className="product-link" style={{ marginTop: '2rem' }}> Details </a>
              <h2 style={{ textTransform: 'capitalize', fontSize: '2rem' }}>{data?.products[0].title}</h2>
              <div className="product-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <div className="product-price">
                <p className="new-price">₹ <span>{data?.products[0].price} Rs</span></p>
              </div>
              <div className="product-detail">
                <h2 style={{ fontSize: '20px' }}>Product Details</h2>
                <p>{highlights && <Content content={highlights} />}</p>
                <ul>
                  <li>Color: <span>Black</span></li>
                  <li>Available: <span>in stock</span></li>
                  <li>Category: <span>Shoes</span></li>
                  <li>Shipping Area: <span>All over the world</span></li>
                  <li>Shipping Fee: <span>Free</span></li>
                </ul>
              </div>
              <div className="purchase-info">
                <button type="button" className="btn" style={{ backgroundColor: 'rgb(196,0,92)' }}>
                  Connect on Mail <i className="fas fa-shopping-cart"></i>
                </button>
                <button type="button" className="btn">Compare</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="comparison-table">
        <h2>Product Comparison</h2>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>{data?.products[0]?.title}</th>
              <th>Comparison Product</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((item, index) => (
              <tr key={index}>
                <td>{item.feature}</td>
                <td>{item.product1}</td>
                <td>{item.product2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Main;
