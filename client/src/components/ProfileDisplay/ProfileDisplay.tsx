import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  Card,
  Heading,
  CardBody,
  Stack,
  Text,
  CardFooter,
  Divider,
  Avatar,
  Textarea,
  Box,
  Image,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import InputLine from "../../widgets/InputLine/InputLine";
import { userUpdate } from "../../redux/thunkActions";

export default function ProfileDisplay() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.userSlice.user);
  const [imageUrl, setImageUrl] = useState("");
  const [isEdit, setISEdit] = useState(false);
  const [pic, setPic] = useState(undefined);
  const [inputs, setInputs] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    experience: user.experience,
    login: user.login,
    aboutMe: user.aboutMe,
    age: user.age,
  });
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
  useEffect(() => {
    setInputs({
      firstName: user.firstName,
      lastName: user.lastName,
      experience: user.experience,
      login: user.login,
      aboutMe: user.aboutMe,
      age: user.age,
    });
  }, [user]);
  const inputsChangeHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const changePhotoHandler = (e) => {
    setPic(e.target.files[0]);
    const files = e.target.files;
    console.log(pic);
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        const preview = document.getElementById("preview");
        preview.src = e.target.result;
        preview.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  };
  const editHandler = (e) => {
    setISEdit(!isEdit);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userUpdate({ res: inputs, pic }));
    setISEdit(!isEdit);
  };
  if (user.role === "Гид") {
    const noedit = (
      <Card maxW="rm">
        <Box
          maxW="500px"
          h="600px"
          bg="white"
          boxShadow="xl"
          rounded="lg"
          overflow="hidden"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box p={5}>
            <Avatar size="2xl" src={imageUrl} mx="auto" />
            <Stack mt="6" spacing="3" align="center">
              {user.firstName ? (
                <>
                  <Heading size="md">
                    {user.firstName} {user.lastName}
                  </Heading>
                  <Text fontSize="lg">{user.login}</Text>
                </>
              ) : (
                <Heading size="md">Логин: {user.login}</Heading>
              )}
              <Text fontSize="md">Обо мне: {user.aboutMe}</Text>
              <Text color="blue.600" fontSize="2xl">
                Возраст {user.age}
              </Text>
              <Text color="blue.600" fontSize="2xl">
                {user.experience} лет опыта
              </Text>
            </Stack>
          </Box>
          <Divider />
          <Box p={5}>
            <Button colorScheme="blue" width="full" onClick={editHandler}>
              Редактировать профиль
            </Button>
          </Box>
        </Box>
      </Card>
    );

    const edit = (
      <Box
        maxW="500px"
        h="600px"
        overflowY="auto"
        // mx="auto"
        p={5}
        boxShadow="xl"
        rounded="lg"
        bg="white"
      >
        <form onSubmit={submitHandler}>
          <Box display="flex" flexDirection="column" alignItems="center" pb={5}>
            <Image
              src={imageUrl}
              id="preview"
              borderRadius="full"
              boxSize="150px"
              objectFit="cover"
            />
            <FormControl mt={5}>
              <FormLabel>Изменить фото профиля</FormLabel>
              <Input type="file" onChange={changePhotoHandler} />
            </FormControl>
          </Box>
          <Stack mt="6" spacing="3">
            <FormControl>
              <FormLabel>Имя</FormLabel>
              <Input
                type="text"
                name="firstName"
                value={inputs.firstName}
                onChange={inputsChangeHandler}
                isRequired={false}
                w="100%"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Фамилия</FormLabel>
              <Input
                type="text"
                name="lastName"
                value={inputs.lastName}
                onChange={inputsChangeHandler}
                isRequired={false}
                w="100%"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Логин</FormLabel>
              <Input
                type="text"
                name="login"
                value={inputs.login}
                onChange={inputsChangeHandler}
                isRequired={false}
                w="100%"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Обо мне:</FormLabel>
              <Textarea
                name="aboutMe"
                value={inputs.aboutMe}
                resize="none"
                onChange={inputsChangeHandler}
                isRequired={false}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Возраст</FormLabel>
              <Input
                type="text"
                name="age"
                value={inputs.age}
                onChange={inputsChangeHandler}
                isRequired={true}
                w="100%"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Опыт</FormLabel>
              <Input
                type="text"
                name="experience"
                value={inputs.experience}
                onChange={inputsChangeHandler}
                isRequired={true}
                w="100%"
              />
            </FormControl>
          </Stack>
          <Divider my="6" />
          <Button
            colorScheme="blue"
            type={isEdit ? "submit" : "button"}
            onClick={isEdit ? undefined : editHandler}
            w="100%"
          >
            Сохранить изменения
          </Button>
        </form>
      </Box>
    );

    return isEdit ? edit : noedit;
  }
  const noEdit = (
    <Card maxW="rm">
      <Box
        width="490px"
        height="520px"
        bg="white" // Фоновый цвет
        boxShadow="xl" // Тень для карточки
        rounded="lg" // Закругленные углы
        overflow="hidden"
        mx="auto"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box p={5} display="flex" flexDirection="column" alignItems="center">
          <Avatar size="2xl" src={imageUrl} />
          <Stack mt="4" spacing="2" align="center">
            {user.firstName ? (
              <>
                <Heading size="md" textAlign="center">
                  {user.firstName} {user.lastName}
                </Heading>
                <Text fontSize="lg">{user.login}</Text>
              </>
            ) : (
              <Heading size="md" textAlign="center">
                Логин: {user.login}
              </Heading>
            )}
            <Text fontSize="md">Обо мне: {user.aboutMe}</Text>
          </Stack>
        </Box>
        <Divider />
        <Box p={5}>
          <Button colorScheme="blue" width="full" onClick={editHandler}>
            Редактировать профиль
          </Button>
        </Box>
      </Box>
    </Card>
  );
  const edit = (
    <Box
      maxW="500px"
      h="600px"
      overflowY="auto"
      mx="auto"
      p={5}
      boxShadow="xl"
      rounded="lg"
      bg="white"
    >
      <form onSubmit={submitHandler}>
        <Box display="flex" flexDirection="column" alignItems="center" pb={5}>
          <Image
            src={imageUrl}
            id="preview"
            borderRadius="full"
            boxSize="150px"
            objectFit="cover"
          />
          <FormControl mt={5}>
            <FormLabel>Изменить фото профиля</FormLabel>
            <Input type="file" onChange={changePhotoHandler} />
          </FormControl>
        </Box>
        <Stack mt="6" spacing="3">
          <FormControl>
            <FormLabel>Имя</FormLabel>
            <Input
              type="text"
              name="firstName"
              value={inputs.firstName}
              onChange={inputsChangeHandler}
              isRequired={false}
              w="100%"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Фамилия</FormLabel>
            <Input
              type="text"
              name="lastName"
              value={inputs.lastName}
              onChange={inputsChangeHandler}
              isRequired={false}
              w="100%"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Логин</FormLabel>
            <Input
              type="text"
              name="login"
              value={inputs.login}
              onChange={inputsChangeHandler}
              isRequired={false}
              w="100%"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Обо мне:</FormLabel>
            <Textarea
              name="aboutMe"
              value={inputs.aboutMe}
              resize="none"
              onChange={inputsChangeHandler}
              isRequired={false}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Возраст</FormLabel>
            <Input
              type="text"
              name="age"
              value={inputs.age}
              onChange={inputsChangeHandler}
              isRequired={true}
              w="100%"
            />
          </FormControl>
        </Stack>
        <Divider my="6" />
        <Button
          colorScheme="blue"
          type={isEdit ? "submit" : "button"}
          onClick={isEdit ? undefined : editHandler}
          w="100%"
        >
          Сохранить изменения
        </Button>
      </form>
    </Box>
  );
  return isEdit ? edit : noEdit;
}
