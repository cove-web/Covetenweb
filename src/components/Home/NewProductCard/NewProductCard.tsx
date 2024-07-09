// YourComponent.js

import React from "react";
import styles from "./product.module.css";

const NewProductCard = ({ data }: any) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) ), url(${data?.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={styles.card}
    >
      {/* <p className={styles.cardP}>{data?.title}</p> */}
      {/* {data?.title} */}
      <div className={styles.cardCountent}>
        {/* <p>description</p> */}
        <p>{data?.shortDescription.slice(0, 180) || "N/A"}</p>
      </div>
    </div>
  );
};

export default NewProductCard;
