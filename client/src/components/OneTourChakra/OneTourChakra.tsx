import axios from 'axios';
import {
  Box,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  FormLabel,
} from '@chakra-ui/react';
import React, { useEffect, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { tourDelete, tourEdit } from '../../redux/thunkActions';
import { increment, decrement } from '../../redux/tourSlice';
import styles from './OneTourChakra.module.css';

export default memo(function AirbnbCard({ tour, isButton }) {
  const user = useAppSelector((store) => store.userSlice.user);
  const [pic, setPic] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const changePhotoHandler = (e) => {
    setPic(e.target.files[0]);
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        const preview = document.getElementById('preview');
        preview.src = e.target?.result;
        preview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  };

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
  }, [tour.tourPhoto, user.id]);

  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useAppDispatch();

  const deleteHandler = () => {
    void dispatch(tourDelete(tour.id));
  };

  const editHandler = () => {
    setIsEdit((prev) => !prev);
  };

  const incrementHandler = (): void => {
    dispatch(increment());
  };

  const decrementHandler = (): void => {
    dispatch(decrement());
  };

  const saveHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res = Object.fromEntries(formData);
    dispatch(tourEdit({ res, id: tour.id, pic }));
    e.target.reset();
    setIsEdit(false);
  };

  const dateStart = tour.startOfTheTour
    ? new Date(tour.startOfTheTour)
        .toLocaleDateString()
        .split('-')
        .reverse()
        .join('-')
        .slice(0, 6) +
      new Date(tour.startOfTheTour)
        .toLocaleDateString()
        .split('-')
        .reverse()
        .join('-')
        .slice(8, 10)
    : [];
  console.log(dateStart);
  const dateEnd = tour.endOfTheTour
    ? new Date(tour.endOfTheTour)
        .toLocaleDateString()
        .split('-')
        .reverse()
        .join('-')
        .slice(0, 6) +
      new Date(tour.endOfTheTour)
        .toLocaleDateString()
        .split('-')
        .reverse()
        .join('-')
        .slice(8, 10)
    : [];
  console.log(dateEnd);

  console.log(typeof dateStart, typeof dateEnd);

  return (
    <Box
      style={{
        opacity: tour.reservedQuantity === tour.maxPeoples ? 0.5 : 1,
        pointerEvents:
          tour.reservedQuantity === tour.maxPeoples ? 'none' : 'auto',
      }}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      {isEdit ? (
        <form onSubmit={(e) => void saveHandler(e)}>
          <img id="preview" alt="Preview" src={pic || imageUrl} />
          <input onChange={changePhotoHandler} type="file" />
          <Input type="text" name="name" defaultValue={tour.name} />
          <Input type="text" name="location" defaultValue={tour.location} />
          <Input
            type="text"
            name="startOfTheTour"
            defaultValue={tour.startOfTheTour}
          />
          <Input
            type="text"
            name="endOfTheTour"
            defaultValue={tour.endOfTheTour}
          />
          <FormLabel>Price</FormLabel>
          <NumberInput defaultValue={tour.price}>
            <NumberInputField name="price" />
            <NumberInputStepper>
              <NumberIncrementStepper onChange={incrementHandler} />
              <NumberDecrementStepper onChange={decrementHandler} />
            </NumberInputStepper>
          </NumberInput>
          <Input
            type="text"
            name="description"
            defaultValue={tour.description}
          />
          <Input type="text" name="duration" defaultValue={tour.duration} />
          <FormLabel>Max Peoples</FormLabel>
          <NumberInput defaultValue={tour.remaindQuantity}>
            <NumberInputField name="maxPeoples" />
            <NumberInputStepper>
              <NumberIncrementStepper onChange={incrementHandler} />
              <NumberDecrementStepper onChange={decrementHandler} />
            </NumberInputStepper>
          </NumberInput>
          <button type="submit">Сохранить</button>
        </form>
      ) : (
        <>
          <div className={styles.card}>
            <Image
              src={
                imageUrl ||
                ''
              }
              alt="image"
              className={styles.preview}
            />
            <Box p="6">
              <Box
                display="flex"
                alignItems="initial"
                justifyContent="space-between"
                flexDirection="column"
                paddingBottom="10px"
              >
                {new Date(tour.createdAt).getDate() == new Date().getDate() ? (
                  <Badge borderRadius="full" px="2" colorScheme="teal">
                    New
                  </Badge>
                ) : (
                  <></>
                )}
                <Badge fontSize="revert">
                  {tour.price}
                  <small>₽</small> / 1чел
                </Badge>
              </Box>
              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                noOfLines={1}
                className={styles.cardTitle}
                paddingBottom="20px"
              >
                {tour.name}
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                marginBottom="20px"
                fontWeight="200"
              >
                <Box display="flex" justifyContent="flex-start">
                  Локация: {tour.location}
                </Box>
                <Box display="flex" justifyContent="flex-start">
                  Даты: {dateStart} - {dateEnd}
                </Box>
                {/* <Box>
              Описание:{" "}
              {tour.description?.length > 10
                ? tour.description.slice(0, 10) + "..."
                : tour.description}
              </Box> */}
                {/* <Box>Продолжительность: {tour.duration} дней</Box> */}
                <Box display="flex" justifyContent="flex-start">
                  Расчитано на: {tour.maxPeoples} людей
                </Box>
              </Box>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Link to={`/tour/${tour.id}`}>
                  <button className={styles.btnInfo}>Подробнее</button>
                </Link>
                {user.role === 'Гид' && !isButton ? (
                  <>
                    <button onClick={() => void deleteHandler()}>
                      Удалить
                    </button>
                    <button onClick={() => void editHandler()}>
                      Редактировать
                    </button>
                  </>
                ) : (
                  <></>
                )}
                {tour.reservedQuantity === tour.maxPeoples ? (
                  <h4 className={styles.ifAllBooked} style={{ color: 'red' }}>
                    Все места забронированы!
                  </h4>
                ) : (
                  <Box fontSize="inherit" fontWeight="500" marginTop="20px">
                    Занято: {tour.reservedQuantity}/{tour.maxPeoples} мест
                  </Box>
                )}
                <>
                  {/* <Box display="flex" alignItems="initial" justifyContent='space-between' flexDirection='column'>
                  <Badge borderRadius="full" px="2" colorScheme="teal">
                    New
                  </Badge>
                  <Badge fontSize='medium'>{tour.price}руб/1чел</Badge>
              </Box> */}
                </>
              </div>
            </Box>
          </div>
        </>
      )}
    </Box>
  );
});
