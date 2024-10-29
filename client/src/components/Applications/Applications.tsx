import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleApplication from "../SingleApplication/SingleApplication";
import { useAppSelector } from "../../redux/hooks";
import styles from "./Applications.module.css";

export default function Applications({ orders }) {
  return (
    <>
      <div className={styles.flex_container}>
        {orders?.length === 0 && (
          <>
            <h2>Активных заявок нет</h2>
          </>
        )}
        {orders?.length > 0 &&
          orders?.map((el) => (
            <div className={styles.all_orders}>
              <SingleApplication order={el} key={el.id} />
            </div>
          ))}
      </div>
    </>
  );
}
