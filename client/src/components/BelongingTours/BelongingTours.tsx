import axios from "axios";
import React, { useEffect, useState } from "react";
import AirbnbCard from "../OneTourChakra/OneTourChakra";
import { useAppSelector } from "../../redux/hooks";
import OrdersList from "../OrdersList/OrdersList";
import style from "./BelongingTours.module.css";

export default function BelongingTours({ id }) {
  const tours = useAppSelector((store) => store.tourSlice.tours);
  const user = useAppSelector((store) => store.userSlice.user);
  console.log("tours", tours);

  return (
    <div className={style.flex_container}>
      {!tours.ownerId && (
        <>
          <h2>Здесь пока ничего нет</h2>
        </>
      )}
      {tours.length > 0 &&
        tours
          .filter((el) => el.ownerId === user.id)
          .map((tour) => (
            <>
              <div className={style.tourContainer}>
                <AirbnbCard key={tour.id} tour={tour} isButton={false} />
                <OrdersList id={tour.id} />
              </div>
            </>
          ))}
    </div>
  );
}
