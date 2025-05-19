import React from "react";
import styles from "@/styles/Home.module.css";
import { formatDate } from "@/utils/dateFormatter";

function Details({ data }) {
  const status = data.success ? "success" : "failure";

  return (
    <>
      <h2>{data.name}</h2>
      <div className={styles.card__content}>
        <p>Date: {formatDate(data.date_utc)}</p>
        <p>Launch Status: {status}</p>
        <p>{data.details}</p>
        {!data.success && (
          <p>Failure Reason: {data.failures[0]?.reason}</p>
        )}
      </div>
    </>
  );
}

export default Details;
