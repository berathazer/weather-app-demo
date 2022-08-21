import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import SelectIcon from "../SelectIcon/SelectIcon";

import Loading from "../Loading";

import { setErrorMessage } from "../../features/ApiKey";

import TempChart from "../Chart/TempChart";

import Grid from "@mui/material/Grid";

import axios from "axios";

import { BsArrowLeftSquareFill } from "react-icons/bs";

import DayCard from "../DayCard/DayCard";

import AOS from "aos";
import SelectBox from "../SelectBox/SelectBox";

const SingleCity = () => {
  AOS.init();

  const cityName = sessionStorage.getItem("cityName");
  const apiKey = sessionStorage.getItem("userApiKey");
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&lang=tr&units=metric&appid=${apiKey}`;

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [icons, setIcons] = useState({});
  const [start, setStart] = useState(0);
  const [error, setError] = useState({
    state: false,
    message: "",
  });
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const getDay = (index) => {
    switch (index) {
      case 0:
        return "Pazar";
      case 1:
        return "Pazartesi";
      case 2:
        return "Salı";
      case 3:
        return "Çarşamba";
      case 4:
        return "Perşembe";
      case 5:
        return "Cuma";
      case 6:
        return "Cumartesi";
      default:
        return "Pazar";
    }
  };
  const backToMap = () => {
    navigate("/map");
    setIsLoading(true);
  };

  useEffect(() => {
    axios
      .get(url)
      .then((data) => {
        let jsonData = data.data;

        setIcons(() => ({
          day1: {
            icon: jsonData.list[0].weather[0].icon,
            minTemp: jsonData.list[0].main.temp_min,
            maxTemp: jsonData.list[0].main.temp_max,
            day: getDay(new Date(jsonData.list[0].dt_txt).getUTCDay()),
          },
          day2: {
            icon: jsonData.list[8].weather[0].icon,
            minTemp: jsonData.list[8].main.temp_min,
            maxTemp: jsonData.list[8].main.temp_max,
            day: getDay(new Date(jsonData.list[8].dt_txt).getUTCDay()),
          },
          day3: {
            icon: jsonData.list[16].weather[0].icon,
            minTemp: jsonData.list[16].main.temp_min,
            maxTemp: jsonData.list[16].main.temp_max,
            day: getDay(new Date(jsonData.list[16].dt_txt).getUTCDay()),
          },
          day4: {
            icon: jsonData.list[24].weather[0].icon,
            minTemp: jsonData.list[24].main.temp_min,
            maxTemp: jsonData.list[24].main.temp_max,
            day: getDay(new Date(jsonData.list[24].dt_txt).getUTCDay()),
          },
          day5: {
            icon: jsonData.list[32].weather[0].icon,
            minTemp: jsonData.list[32].main.temp_min,
            maxTemp: jsonData.list[32].main.temp_max,
            day: getDay(new Date(jsonData.list[32].dt_txt).getUTCDay()),
          },
        }));
        let dummyData = [];
        let i = start;
        for (i; i < start + 7; i++) {
          let time =
            jsonData.list[i].dt_txt.split(" ")[1].split(":")[0] +
            ":" +
            jsonData.list[i].dt_txt.split(" ")[1].split(":")[1];
          let day = getDay(new Date(jsonData.list[i].dt_txt).getUTCDay())
          dummyData.push({
            time: time,
            degree: Math.round(jsonData.list[i].main.temp),
            min: Math.round(jsonData.list[i].main.temp_min),
            max: Math.round(jsonData.list[i].main.temp_max),
            icon: jsonData.list[i].weather[0].icon,
            description: jsonData.list[i].weather[0].description,
            name: jsonData.city.name,
            country: jsonData.city.country,
            index: i,
            day : day
          });
        }

        setData([...dummyData]);
      })
      .catch((err) => {
        setError((prev) => {
          return { ...prev, state: true, message: err.message };
        });
      });

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [start,cityName]);

  if (error.state) {
    return (
      <>
        {dispatch(setErrorMessage(error.message))}
        {navigate("/404")}
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div
      id="mainContainer"
      className="w-full h-screen bg-slate-800 overflow-x-hidden"
      data-aos="fa"
    >
      <Grid container>
        <Grid item justifyContent={"space-between"} flexDirection={"row"} xs={12} className="bg-slate-700 flex py-4">
          <div
            className="font-bold px-5 py-2 flex items-center gap-2 text-white cursor-pointer"
            onClick={backToMap}
          >
            {" "}
            Geri Dön
            <BsArrowLeftSquareFill color="#999" size={"20px"} />
          </div>
          <div className="pr-5">
            <SelectBox city={cityName} />
          </div>
        </Grid>
        <Grid
          item
          xs={6}
          container
          justifyContent={"start"}
          alignItems={"center"}
          className="px-10 pt-5"
        >
          <div
            id="weatherIcon"
            className="pl-5 text-[100px] "
            data-aos="fade-right"
          >
            <SelectIcon
              name={data[index]?.icon}
              color={"lightblue"}
              className=""
            />
          </div>
          <div
            id="degree"
            className="text-white text-[50px] font-[400] flex pl-5 items-center"
          >
            <h2 className="relative">
              {data[index]?.degree}
              <span className="absolute top-3 -right-5 text-[20px]">°C</span>
            </h2>
          </div>
        </Grid>
        <Grid
          item
          xs={6}
          container
          alignItems="end"
          flexDirection={"column"}
          justifyContent={"center"}
          className="pr-20 py-2 text-white"
        >
          <div className="text-3xl font-[600]">{data[index]?.name}</div>
          <div className="text-[17px] text-gray-400">
            {data[index]?.day} {data[index]?.time}
          </div>
          <div className="text-[17px] text-gray-400 capitalize">
            {data[index]?.description}
          </div>
        </Grid>
        <Grid item xs={12} className="px-16 py-5">
          {data && <TempChart data={data} setIndex={setIndex} />}
        </Grid>
        <Grid
          item
          xs={12}
          container
          flexDirection={"row"}
          justifyContent={"space-between"}
          className="px-20 py-2"
        >
          <DayCard
            color={"yellow"}
            icon={icons.day1.icon}
            min={icons.day1.minTemp}
            max={icons.day1.maxTemp}
            day={icons.day1.day}
            setStart={setStart}
            start={0}
          />
          <DayCard
            color={"lightblue"}
            icon={icons.day2.icon}
            min={icons.day2.minTemp}
            max={icons.day2.maxTemp}
            day={icons.day2.day}
            setStart={setStart}
            start={7}
          />
          <DayCard
            color={"teal"}
            icon={icons.day3.icon}
            min={icons.day3.minTemp}
            max={icons.day3.maxTemp}
            day={icons.day3.day}
            setStart={setStart}
            start={15}
          />
          <DayCard
            color={"gray"}
            icon={icons.day4.icon}
            min={icons.day4.minTemp}
            max={icons.day4.maxTemp}
            day={icons.day4.day}
            setStart={setStart}
            start={23}
          />
          <DayCard
            color={"white"}
            icon={icons.day5.icon}
            min={icons.day5.minTemp}
            max={icons.day5.maxTemp}
            day={icons.day5.day}
            setStart={setStart}
            start={31}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SingleCity;
