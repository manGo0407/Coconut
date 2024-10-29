// import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./Navbar.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { userLogout } from "../../redux/thunkActions";
import { Button } from "@chakra-ui/button";
import { Avatar } from "@chakra-ui/react";
import axios from "axios";
import "animate.css";

export default function NavBar(): JSX.Element {
  const user = useAppSelector((store) => store.userSlice.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(userLogout());
    navigate("/");
  };

  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    if (user.photoUser) {
      axios
        .post(
          `http://localhost:3000/content/avatar`,
          {
            imageName: user.photoUser,
          },
          {
            responseType: "blob",
          }
        )
        .then((res) => {
          const image = URL.createObjectURL(res.data);
          setImageUrl(image);
        })
        .catch((err) => console.log(err));
    }
  }, [user.photoUser]);

  return (
    <>
      {user.login ? (
        <>
          <div className={styles.navbar}>
            <Link
              className={`${styles.navLink} animate__animated animate__backInLeft animate__delay-1.7s`}
              to="/"
            >
              Главная
            </Link>
            <h3
              className={`${styles.h3Navbar} animate__animated animate__backInLeft animate__delay-1.4s`}
            >
              привет, {user.login}
              <Avatar size={"xs"} src={imageUrl} />
            </h3>
            {user.role !== 'Турист' && (
              <Link className={`${styles.navLink} animate__animated animate__backInLeft animate__delay-1.0s`} 
              to="/newTour"
              >
                Создать тур
              </Link>
            )}
            <Link className={`${styles.navLink} animate__animated animate__backInLeft animate__delay-0.7s`} to="lk">
              Личный кабинет
            </Link>
            <Button
              onClick={() => void logoutHandler()}
              className={`${styles.navLink} animate__animated animate__backInLeft animate__delay-0.3s`}
            >
              Выйти
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.navbar}>

            <Link
              className={`${styles.navLink} animate__animated animate__backInLeft animate__delay-0.7s`}
              to="/"
            >
              Главная
            </Link>

            <Link
              className={`${styles.navLink} animate__animated animate__backInLeft animate__delay-0.3s`}
              to="/auth"
            >
              Войти
            </Link>
          </div>
        </>
      )}
    </>
  );
}
