import TurkeyMap from "turkey-map-react";
import { Tooltip, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import { savePlate } from "../../features/ApiKey";
import { useDispatch } from "react-redux";


const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }}></Tooltip>
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: "18px",
    padding: "10px",
  },
}));

const renderCity = (cityComponent, cityData) => (
  <BootstrapTooltip
    title={cityData.name}
    key={cityData.id}
    color="secondary"
    placement="top-end"
    arrow
  >
    {cityComponent}
  </BootstrapTooltip>
);

const Map = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickHandler = (cityInfo) => {
    dispatch(savePlate(cityInfo));
    sessionStorage.setItem("cityName",cityInfo.name)
    navigate("/map/" + cityInfo.name.toLowerCase());
    
  };
  return (
    <div className="w-screen h-screen bg-zinc-900">
      <div className="text-center text-white text-4xl pt-5">Türkiye İllerine Göre Hava Durumu</div>
      <TurkeyMap
        hoverable={true}
        cityWrapper={renderCity}
        customStyle={{ idleColor: "#444", hoverColor: "lightgrey" }}
        onClick={({ plateNumber, name }) => clickHandler({ plateNumber, name })}
      />
    </div>
  );
};

export default Map;
