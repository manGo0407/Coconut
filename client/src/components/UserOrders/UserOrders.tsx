import React, { useEffect, useState } from "react";
import SingleUserOrder from "../SingleUserOrder/SingleUserOrder";
import { useAppSelector } from "../../redux/hooks";
import styles from "./UserOrder.module.css";

export default function UserOrders({ orders }) {
  const user = useAppSelector((store) => store.userSlice.user);
  const ours = orders?.filter(
    (elem) => elem.userId === user.id && elem.statusPay === false
  );
  return (
    <div className={styles.flex_container}>
      {ours?.length === 0 && (
        <>
          <h2>Здесь пока ничего нет</h2>
        </>
      )}
      {ours.length > 0 &&
        ours?.map((el) => (
          <div className={styles.all_orders}>
            <SingleUserOrder order={el} key={el.id} />
          </div>
        ))}
    </div>
  );
}
