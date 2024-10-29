import { FormControl, FormLabel, Input, tokenToCSSVar } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { newPassword, userUpdate } from "../../redux/thunkActions";
import { useAppDispatch } from "../../redux/hooks";
import styles from "./ChangePassword.module.css";
import { toast, ToastContainer } from "react-toastify";

export default function ChangePassword() {
  const [inputPassword, setInputPassword] = useState("");
  const { token } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const newPasswordHandler = (e) => {
    setInputPassword(e.target.value);
  };

  const saveNewPassword = (e) => {
    e.preventDefault();
    dispatch(newPassword({ token, password: inputPassword }))
      .then((res) => {
        console.log(res);
        if (res.meta.requestStatus === "fulfilled") {
          setTimeout(() => {
            toast.success("Вы успешно поменяли пароль!");
          }, 500);
          setTimeout(() => {
            navigate("/auth");
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className={styles.form} onSubmit={saveNewPassword}>
      <FormControl className={styles.formControl}>
        <h4 className={styles.header}>Задать новый пароль:</h4>
        <FormLabel>Новый пароль:</FormLabel>
        <Input
          className={styles.input}
          onChange={newPasswordHandler}
          value={inputPassword}
          type="password"
          name="password"
          placeholder="Enter new password"
        />
        <button className={styles.button} type="submit">
          Отправить
        </button>
      </FormControl>
      <ToastContainer />
    </form>
  );
}
