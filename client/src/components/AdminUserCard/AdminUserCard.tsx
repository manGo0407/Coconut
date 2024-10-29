import {
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Text,
  Avatar,
  Tooltip,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ButtonBlank from '../../widgets/Button/Button';
import axios from 'axios';

export default function AdminUserCard({ user, setter }) {
  const [picUrl, setPicUrl] = useState('');
  useEffect(() => {
    if (user.photoUser) {
      axios
        .post(
          `http://localhost:3000/content/avatar`,
          {
            imageName: user.photoUser,
          },
          {
            responseType: 'blob',
          }
        )
        .then((res) => {
          const image = URL.createObjectURL(res.data);
          setPicUrl(image);
        })
        .catch((err) => console.log(err));
    }
  }, [user.photoUser]);
  const approveHandler = async () => {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_URL}/admin/user/${user.id}`
    );
    if (response.status === 200) {
      setter((prev) => prev.filter((el) => el.id !== user.id));
    }
  };
  const deletePfpHandler = async () => {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_URL}/admin/user/profilePic/${user.id}`
    );
    if (response.status === 200) {
      setPicUrl('');
    }
  };
  return (
    <Card>
      <CardBody>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar src={picUrl} borderRadius="full" />
          <ButtonBlank
            color={'red'}
            size={'xs'}
            type={'button'}
            text={'Сбросить фото'}
            margin={undefined}
            handler={deletePfpHandler}
          />
        </div>
        <Stack mt="6" spacing="1">
          <Heading size="md">{user.login}</Heading>
          <Text>Роль: {user?.role}</Text>
          <Text>Имя: {user?.firstName}</Text>
          <Text>Фамилия: {user?.lastName}</Text>
          <Tooltip label={user?.aboutMe} placement="auto-start">
            <Text>
              Опиание: {user.aboutMe && (user?.aboutMe).slice(0, 8) + '...'}
            </Text>
          </Tooltip>
          <Text>Почта: {user?.email}</Text>
          <Text>Возраст: {user?.age}</Text>
          <Text>Опыт: {user?.experience}</Text>
          <Text>
            На сайте с {new Date(user?.createdAt).toLocaleDateString()}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonBlank
          color={'green'}
          size={'lg'}
          type={'button'}
          text={'Одобрить профиль'}
          margin={undefined}
          handler={approveHandler}
        />
      </CardFooter>
    </Card>
  );
}
