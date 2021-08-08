import React from "react";
import { useEffect } from "react";

const Data = ({ params, param }) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const today = new Date();

  // add remove class to style city name
  const addClass = () => {
    const ct = document.querySelector(".city");
    const ctText = ct.innerHTML;
    if (ctText.length > 15) {
      ct.classList.remove("display-4");
      ct.classList.add("display-5");
    }
  };

  useEffect(() => {
    if (params) {
      params.map((param) => {
        addClass();
      });
    }
  }, [params]);

  return (
    <div>
      <h1 className='city mt-3 display-4'>{param.ctName}</h1>
      <p className='country'>{param.country}</p>
      <h5 className='date'>{today.toLocaleDateString("en-US", options)}</h5>
      <div className='d-flex align-items-end justify-content-center'>
        <img className='img-fluid' src={param.icon} />
        <h1 className='temp display-4 mt-2'>{param.temperature}&ordm;</h1>
      </div>
      <h4 className='weather mt-2'>{param.weather}</h4>
    </div>
  );
};

export default Data;
