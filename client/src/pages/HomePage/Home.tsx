import React, { forwardRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AirbnbCard from "../../components/OneTourChakra/OneTourChakra";
import { Select } from "@chakra-ui/select";
import { useAppSelector } from "../../redux/hooks";
import {
  FormControl,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/layout";
import DatePicker from "react-datepicker";
import { CalendarIcon } from "@chakra-ui/icons";
import "react-datepicker/dist/react-datepicker.css";
import style from "./Home.module.css";

// import NavBar from "../../components/Navbar/Navbar";

import NavBar from "../../components/Navbar/Navbar";

import "animate.css";
import Footer from "../../components/Footer/Footer";

export default function Home() {
  // const isButton = true;
  const tours = useAppSelector((store) => store.tourSlice.tours);

  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredAndSortedTours, setFilteredAndSortedTours] = useState([]);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // console.log("startDate: ", JSON.stringify(startDate).slice(1, 11));
  // console.log("endDate: ", JSON.stringify(endDate).slice(1, 11));

  const CustomDatePickerInput = forwardRef(
    ({ value, onClick, placeholder }, ref) => (
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <CalendarIcon color="gray.500" />
        </InputLeftElement>
        <Input
          ref={ref}
          onClick={onClick}
          value={value}
          readOnly
          placeholder={!value ? "Выберите дату" : undefined} // Явно управляем отображением
        />
      </InputGroup>
    )
  );
  CustomDatePickerInput.displayName = "CustomDatePickerInput";

  useEffect(() => {
    let processedTours = [...tours];

    if (startDate && endDate) {
      processedTours = processedTours.filter((tour) => {
        const start = new Date(tour.startOfTheTour);
        const finishStart = start.valueOf(); //

        const end = new Date(tour.endOfTheTour);
        const endStart = end.valueOf(); // инпут

        const startedDate = startDate.valueOf();
        const endedDate = endDate.valueOf(); // календарь

        return startedDate <= finishStart && endStart <= endedDate + 10800000;
      });
    }
    if (searchValue) {
      processedTours = processedTours.filter((tour) =>
        tour.location.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    processedTours.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
    setFilteredAndSortedTours(processedTours);
  }, [tours, searchValue, sortOrder, startDate, endDate]);

  useEffect(() => {
    const sort = localStorage.getItem("sort");
    if (sort) {
      setSortOrder(sort);
    }
  }, []);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    localStorage.setItem("sort", event.target.value);
  };

  return (
    <div className={style.contentContainer}>
      <div className={style.main_screen}>
        <div className={style.content}>
          <h1
            className="h1 animate__animated animate__fadeIn animate__delay-1s animate-duration-2s"
            style={{ color: "white", fontSize: "60px", marginTop: "7%" }}
          >
            Авторские туры —{" "}
            <span style={{ color: " rgb(35 135 35 / 94%)" }}>новый формат</span><br />
            насыщенных путешествий
          </h1>
          <div className={style.flexGap} gap="4" alignItems="center">
            <Select
              placeholder="Сортировка"
              value={sortOrder}
              onChange={handleSortChange}
              w="300px"
            >
              <option value="asc">По возрастанию цены</option>
              <option value="desc">По убыванию цены</option>
            </Select>

            <Input
              placeholder="Поиск по тура по локации"
              name="searchWord"
              onChange={(event) => setSearchValue(event.target.value)}
              style={{ width: "350px" }}
            />

            <Box p={4}>
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  const [start, end] = update;
                  setStartDate(start);
                  setEndDate(end);
                }}
                isClearable={true}
                customInput={
                  <CustomDatePickerInput placeholder="Выберите дату" />
                } // Устанавливаем placeholder здесь
              />
            </Box>
          </div>
        </div>
      </div>
      <div className={style.secondBlock}>
        <Grid
          templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
          gap={6}
          px={10}
          margin="0 auto"
          maxWidth="1200px"
        >
          <GridItem
            w="100%"
            h="44"
            className="wow animate__animated animate__backInRight animate__delay-0.3s"
          >
            <div className={style.cardContainer}>
              <span
                className="material-symbols-outlined color"
                style={{ color: "#19ca19", fontSize: "xxx-large" }}
              >
                lock
              </span>
              <div className={style.zhirniy}>Безопасная оплата</div>
              <div>Бронируйте туры через нашу надежную платежную систему</div>
            </div>
          </GridItem>
          <GridItem
            w="100%"
            h="40"
            className="wow animate__animated animate__backInRight animate__delay-0.6s"
          >
            <div className={style.cardContainer}>
              <span
                className="material-symbols-outlined color"
                style={{ color: "#19ca19", fontSize: "xxx-large" }}
              >
                sentiment_satisfied
              </span>
              <div className={style.zhirniy}>Продуманная спонтанность</div>
              <div>Маршруты могут адаптироваться под пожелания группы</div>
            </div>
          </GridItem>
          <GridItem
            w="100%"
            h="40"
            className="wow animate__animated animate__backInRight animate__delay-0.9s"
          >
            <div className={style.cardContainer}>
              <span
                className="material-symbols-outlined color"
                style={{ color: "#19ca19", fontSize: "xxx-large" }}
              >
                workspace_premium
              </span>
              <div className={style.zhirniy}>Гарантированные туры</div>
              <div>
                У нас вы найдете более 5 000 туров с гарантированным
                отправлением
              </div>
            </div>
          </GridItem>
          <GridItem
            w="100%"
            h="40"
            className=" wow animate__animated animate__backInRight animate__delay-1.2s"
          >
            <div className={style.cardContainer}>
              <span
                className="material-symbols-outlined color"
                style={{ color: "#19ca19", fontSize: "xxx-large" }}
              >
                diversity_3
              </span>
              <div className={style.zhirniy}>Небольшие группы</div>
              <div>Особенная атмосфера в компании единомышленников</div>
            </div>
          </GridItem>
        </Grid>
      </div>
      <div className={style.nadpis}>
        <h2 className={`${style.h2} wow animate__animated animate__backInLeft`}>Места для вдохновения</h2>
        <p className="wow animate__animated animate__backInLeft">Подборки путешествий для вашего wish листа</p>
      </div>
      <div id={style.tourCardContainer}>
        {filteredAndSortedTours
          .filter((el) => el.adminAproved === true)
          .map((tour) => (
            <div className="wow animate__animated animate__fadeIn animate_duration-4s">
              <AirbnbCard key={tour.id} tour={tour} isButton={true} />
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}
