import React from "react";
import { useAppSelector } from "../../redux/hooks";
import style from "./OrdersList.module.css";

export default function OrdersList({ id }) {
  const orders = useAppSelector((store) => store.orderSlice.orders);

  const findOrder = orders?.filter((el) => el.tourId === id);

  return (
    <div className={style.one_tour}>
      {findOrder &&
        findOrder.map((el, index) => (
          <React.Fragment key={el.id}>
            <div className="tour">
              <div className={style.reserveContainer}>
                <h3>Бронирование №{index + 1}</h3>
                <div>
                  {el.user?.firstName} {el.user?.lastName}
                </div>
                {el.peoplesBooked === 1 ? (
                  <div>Забронировал {el.peoplesBooked} место</div>
                ) : el.peoplesBooked === 2 ||
                  el.peoplesBooked === 3 ||
                  el.peoplesBooked === 4 ? (
                  <div>Забронировал {el.peoplesBooked} места</div>
                ) : (
                  <div>Забронировал {el.peoplesBooked} мест</div>
                )}
                <div>На сумму {el.peoplesBooked * el.Tour?.price} рублей</div>
                <br />
              </div>
            </div>
            <br />
          </React.Fragment>
        ))}
    </div>
  );
}
