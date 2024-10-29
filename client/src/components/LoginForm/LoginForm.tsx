import { Button, Container, FormLabel, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import InputLine from "../../widgets/InputLine/InputLine";
import ButtonBlank from "../../widgets/Button/Button";
import { useAppDispatch } from "../../redux/hooks";
import { userLogin } from "../../redux/thunkActions";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [inputs, setInputs] = useState({ login: "", email: "", password: "" });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const changeHandler = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resultAction = await dispatch(userLogin(inputs));
    if (userLogin.fulfilled.match(resultAction)) {
      navigate("/");
    } else if (userLogin.rejected.match(resultAction)) {
      toast.error(resultAction.payload);
      setTimeout(() => {
        setInputs({
          login: "",
          email: "",
          password: "",
        });
      }, 2000);
    }
  };

  return (
    <div className={styles.contentContainer}>
        <form onSubmit={submitHandler} className={styles.form}>
          {/* <InputLine
          type={'text'}
          name={'login'}
          value={inputs.login}
          handler={changeHandler}
        /> */}
          <FormLabel style={{ color: "white", fontSize: "20px" }}>
            Email:
          </FormLabel>
          <Input
            type="email"
            name="email"
            style={{ borderRadius: "20px", margin: "10px 0px", width: "300px" }}
            value={inputs.email}
            onChange={changeHandler}
            placeholder="email"
          />
          <FormLabel style={{ color: "white", fontSize: "20px" }}>
            Password:
          </FormLabel>
          <Input
            type="password"
            name="password"
            style={{ borderRadius: "20px", margin: "10px 0px", width: "300px" }}
            value={inputs.password}
            onChange={changeHandler}
            placeholder="password"
          />
          <Link to="/forgotPassword">
            <div>Забыли пароль?</div>
          </Link>
          <Button
            colorScheme="blackAlpha"
            variant="outline"
            type="submit"
            style={{
              margin: "20px 0",
              width: "300px",
              borderRadius: "20px",
              color: "white",
            }}
          >
            Войти
          </Button>
        </form>
      </div>
  );
}
