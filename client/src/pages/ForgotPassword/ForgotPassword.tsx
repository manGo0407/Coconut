import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { resetPassword } from "../../redux/thunkActions";
import { useNavigate } from "react-router-dom";
import styles from "./Forgot.module.css";
import { toast, ToastContainer } from "react-toastify";
export default function ForgotPassword() {
  const [inputEmail, setInputEmail] = useState("");

  const enterEmailHandler = (e) => {
    setInputEmail(e.target.value);
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const resetPasswordHandler = (e) => {
    console.log(inputEmail);
    e.preventDefault();
    dispatch(resetPassword({ email: inputEmail }))
      .then((res) => {
        console.log(res);
        if (res.meta.requestStatus === "fulfilled") {
          setTimeout(() => {
            toast.success("Успешно! Перейдите к себе на почту!");
          }, 500);
          setTimeout(() => {
            navigate("/auth");
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.formBackground}>
      <div className={styles.content}>
        <form onSubmit={(e) => resetPasswordHandler(e)}>
          <FormControl className={styles.formControl}>
            <h4>Забыли пароль?</h4>
            <FormLabel>Email</FormLabel>
            <Input
              onChange={enterEmailHandler}
              value={inputEmail}
              name="email"
              placeholder="Enter Email"
            />
            <button type="submit">Отправить</button>
          </FormControl>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
