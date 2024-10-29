import SingleUserOrder from "../SingleUserOrder/SingleUserOrder";
import { useAppSelector } from "../../redux/hooks";
import styles from "./UserPaidOrders.module.css";
import { RiH3 } from "react-icons/ri";

export default function UserPaidOrders({ orders }) {
  const user = useAppSelector((store) => store.userSlice.user);
  const ours = orders?.filter(
    (elem) => elem.userId === user.id && elem.statusPay === true
  );
  return (
    <div className={styles.flex_container}>
      {ours?.length === 0 && (
        <>
          <h2>Здесь пока ничего нет</h2>
        </>
      )}
      {ours?.length > 0 &&
        ours?.map((el) => (
          <div className={styles.all_orders} key={el.id}>
            <SingleUserOrder order={el} />
          </div>
        ))}
    </div>
  );
}
