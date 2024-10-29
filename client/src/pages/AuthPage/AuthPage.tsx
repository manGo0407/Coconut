import React, { useEffect, useState } from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./Authpage.module.css";
import { Button } from "@chakra-ui/react";
export default function AuthPage() {
  const [inputForm, setInputForm] = useState(false);
  const changeFormsHandler = () => {
    setInputForm(!inputForm);
  };
  return (
    <div className={styles.content}>
      <div className={styles.main_screen}>
        {inputForm ? (
          <div className={styles.login}>
            <LoginForm />
            <Button
              type="button"
              colorScheme="blackAlpha"
              variant="outline"
              onClick={changeFormsHandler}
              style={{
                // marginTop: "-540px",
                border: "1px solid white",
                color: "white",
                width: "300px",
                borderRadius: "20px",
                marginLeft: '620px',
                position: 'relative',
                top: '-56px'
              }}
            >
              Зарегистрироваться
            </Button>
          </div>
        ) : (
          <div className={styles.register}>
            <RegisterForm />
            <Button
            onClick={changeFormsHandler}
              colorScheme="blackAlpha"
              variant="outline"
              type="submit"
              style={{
                marginTop: '-86px',
                marginLeft: '587px',
                width: "350px",
                borderRadius: "20px",
                color: "white",
              }}
            >
              У меня уже есть аккаунт
            </Button>
          </div>
        )}
      </div>
     </div>
  );
}
