import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Button,
  Image,
  Text,
  Flex,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ButtonBlank from '../../widgets/Button/Button';
import DisplayMap from '../../widgets/Yapi/DisplayMap';
import { useAppDispatch } from '../../redux/hooks';
import { tourAccept, tourDelete } from '../../redux/thunkActions';

export default function AdminHorisontalCard({ tour }) {
  const dispatch = useAppDispatch();
  const [imageUrl, setImageUrl] = useState('https://i.gifer.com/ZKZg.gif');
  useEffect(() => {
    if (tour.tourPhoto) {
      axios
        .post(
          `http://localhost:3000/content/image`,
          {
            imageName: tour.tourPhoto,
          },
          {
            responseType: 'blob',
          }
        )
        .then((res) => {
          const image = URL.createObjectURL(res.data);
          setImageUrl(image);
        })
        .catch((err) => console.log(err));
    }
  }, [tour.tourPhoto]);
  const acceptHandler = () => {
    dispatch(tourAccept(tour.id));
  };
  const declineHandler = () => {
    dispatch(tourDelete(tour.id));
  };
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '500px' }}
        maxH={{ base: '100%', sm: '300px' }}
        src={imageUrl}
        alt="tour pic"
      />

      <Stack>
        <div style={{ display: 'flex', width: '40vw' }}>
          <CardBody display="flex" flexDirection="column" alignItems="center">
            <Heading width="fit-content" size="md" display="flex">
              Название:
              <br />
              {tour?.name}
            </Heading>
            <Text py="2">Описание: {tour?.description}</Text>
            <Text py="2">C {tour?.startOfTheTour}</Text>
            <Text py="2">По {tour?.endOfTheTour}</Text>
          </CardBody>
          <CardBody>
            <Heading size="md">Цена: {tour?.price}р</Heading>
            <Text py="2">Места: {tour?.maxPeoples} шт</Text>
            <Text py="2">Локация: {tour?.location}</Text>
            <Text py="2">Сбор в: {tour?.gatherTime}</Text>
          </CardBody>
          <CardBody>
            <Heading size="md">Автор: {tour?.User?.login}</Heading>
            <Text py="2">Опыт: {tour?.User?.experience}</Text>
            <Text py="2">Возраст: {tour?.User?.age}</Text>
            <Text py="2">
              На сайте с: {new Date(tour?.User?.createdAt).toLocaleDateString()}
            </Text>
          </CardBody>
        </div>

        <CardFooter>
          <ButtonBlank
            color={'green'}
            size={'lg'}
            type={undefined}
            text={'Принять'}
            margin={'5px'}
            handler={acceptHandler}
          />
          <ButtonBlank
            color={'red'}
            size={'lg'}
            type={undefined}
            text={'Отклонить'}
            margin={'5px'}
            handler={declineHandler}
          />
        </CardFooter>
      </Stack>
    </Card>
  );
}
