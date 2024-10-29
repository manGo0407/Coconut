import React, { useState } from 'react';
import InputLine from '../../widgets/InputLine/InputLine';
import ButtonBlank from '../../widgets/Button/Button';
import { Button, Container, FormLabel, Input } from '@chakra-ui/react';
import { useAppDispatch } from '../../redux/hooks';
import { userRegister } from '../../redux/thunkActions';
import SelectBlank from '../../widgets/Select/SelectBlank';
import { toast } from 'react-toastify';
import styles from './RegisterForm.module.css';

export type InputsType = {
  login: string;
  email: string;
  password: string;
  role: string;
  photoUser?: string;
  firstName?: string;
  lastName?: string;
  experience?: number;
  age?: number;
  aboutMe?: string;
};

export default function RegisterForm() {
  const [inputs, setInputs] = useState<InputsType>({
    login: '',
    email: '',
    password: '',
    role: 'Турист',
    firstName: '',
    lastName: '',
    experience: 0,
    age: 0,
    aboutMe: '',
  });
  const [pic, setPic] = useState(null);

  const changePhotoHandler = (e) => {
    setPic(e.target.files[0]);
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        const preview = document.getElementById('preview');
        preview.src = e.target.result;
        preview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  };

  // const [isGid, setIsGid] = useState(false)

  const dispatch = useAppDispatch();
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resultAction = await dispatch(userRegister({ payload: inputs, pic }));
    if (!userRegister.fulfilled.match(resultAction)) {
      toast.error(resultAction.payload);
    }
    setTimeout(() => {
      setInputs({
        login: '',
        email: '',
        password: '',
        role: 'Турист',
      });
    }, 2000);
  };

  return (
    <>
      <div className={styles.contentContainer}>
        <form onSubmit={submitHandler} className={styles.form}>
          <FormLabel style={{ color: 'white', fontSize: '20px' }}>
            Login:
          </FormLabel>
          <Input
            isRequired
            type="text"
            name="login"
            value={inputs.login}
            onChange={changeHandler}
            placeholder="login"
            style={{
              borderRadius: '20px',
              margin: '5px 0px',
              width: '350px',
            }}
          />
          <FormLabel style={{ color: 'white', fontSize: '20px' }}>
            Email:
          </FormLabel>
          <Input
            isRequired
            type="email"
            name="email"
            value={inputs.email}
            onChange={changeHandler}
            placeholder="email"
            style={{
              borderRadius: '20px',
              margin: '5px 0px',
              width: '350px',
            }}
          />
          <FormLabel style={{ color: 'white', fontSize: '20px' }}>
            Password:
          </FormLabel>
          <Input
            isRequired
            type="password"
            name="password"
            value={inputs.password}
            onChange={changeHandler}
            placeholder="password"
            style={{
              borderRadius: '20px',
              margin: '5px 0px',
              width: '350px',
            }}
          />

          {pic ? (
            <label
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                id="preview"
                src="#"
                alt="Preview"
                className={styles.preview}
              />
              <label className={styles.label}>
                Изменить выбранный файл
                <input
                  name="userPhoto"
                  className={styles.fileInput}
                  // className="file-input"
                  type="file"
                  onChange={changePhotoHandler}
                  accept="image/*"
                />
              </label>
            </label>
          ) : (
            <label
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <label className={styles.label}>
                Выбрать фото профиля
                <input
                  className={styles.fileInput}
                  type="file"
                  onChange={changePhotoHandler}
                  accept="image/*"
                />
              </label>
            </label>
          )}

          <SelectBlank name="role" handler={changeHandler} />

          {inputs.role === 'Гид' ? (
            <>
              <Input
                isRequired
                type="text"
                name="firstName"
                value={inputs.firstName}
                onChange={changeHandler}
                placeholder="Имя"
                style={{
                  borderRadius: '20px',
                  margin: '5px 0px',
                  width: '350px',
                }}
              />
              <Input
                isRequired
                type="text"
                name="lastName"
                value={inputs.lastName}
                onChange={changeHandler}
                placeholder="Фамилия"
                style={{
                  borderRadius: '20px',
                  margin: '5px 0px',
                  width: '350px',
                }}
              />
              <Input
                type="number"
                name="experience"
                value={inputs.experience}
                onChange={changeHandler}
                placeholder="Опыт работы"
                style={{
                  borderRadius: '20px',
                  margin: '5px 0px',
                  width: '350px',
                }}
              />
              <Input
                isRequired
                type="number"
                name="age"
                value={inputs.age}
                onChange={changeHandler}
                placeholder="Возраст"
                style={{
                  borderRadius: '20px',
                  margin: '5px 0px',
                  width: '350px',
                }}
              />
              <Input
                isRequired
                type="text"
                name="aboutMe"
                value={inputs.aboutMe}
                onChange={changeHandler}
                placeholder="О себе"
                style={{
                  borderRadius: '20px',
                  margin: '5px 0px',
                  width: '350px',
                }}
              />
            </>
          ) : (
            <></>
          )}
          <Button
            colorScheme="blackAlpha"
            variant="outline"
            type="submit"
            style={{
              margin: '20px 0px 20px 0px',
              width: '350px',
              borderRadius: '20px',
              color: 'white',
            }}
          >
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </>
  );
}
