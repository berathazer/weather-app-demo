import React from "react";
import {
  WiMeteor,
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightCloudy,
  WiDayCloudyHigh,
  WiNightCloudyHigh,
  WiDaySunnyOvercast,
  WiNightPartlyCloudy,
  WiDayShowers,
  WiNightShowers,
  WiDayRain,
  WiNightRain,
  WiDayThunderstorm,
  WiNightThunderstorm,
  WiDaySnow,
  WiNightSnow,
  WiDayRainMix,
  WiNightRainMix,
} from "react-icons/wi";
const imageSelector = (name,color) => {
  let image = WiMeteor;
  switch (name) {
    case "01d":
      return (<WiDaySunny color={color}/>);
    case "01n":
      return (<WiNightClear color={color}/>);
    case "02d":
      return (<WiDayCloudy color={color}/>);
    case "02n":
      return (<WiNightCloudy color={color}/>);
    case "03d":
      return (<WiDayCloudyHigh color={color}/>);
    case "03n":
      return (<WiNightCloudyHigh color={color}/>);
    case "04d":
      return (<WiDaySunnyOvercast color={color}/>);
    case "04n":
      return (<WiNightPartlyCloudy color={color}/>);
    case "09d":
      return (<WiDayShowers color={color}/>);
    case "09n":
      return (<WiNightShowers color={color}/>);
    case "10d":
      return (<WiDayRain color={color}/>);
    case "10n":
      return (<WiNightRain color={color}/>);
    case "11d":
      return (<WiDayThunderstorm color={color}/>);
    case "11n":
      return (<WiNightThunderstorm color={color}/>);
    case "13d":
      return (<WiDaySnow color={color}/>);
    case "13n":
      return (<WiNightSnow color={color}/>);
    case "50d":
      return (<WiDayRainMix color={color}/>);
    case "50n":
      return (<WiNightRainMix color={color}/>);
    default:
      return (<WiMeteor color={color}/>);
  }
};
const SelectIcon = ({ name,color }) => {
  
  return (
    <>
        {imageSelector(name,color)}
    </>
  );
};

export default SelectIcon;
