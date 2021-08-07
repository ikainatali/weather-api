import { useState, useEffect } from "react";
import axios from "axios";

//bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Container, Row, Col } from "react-bootstrap";

const App = () => {
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState("");
  const [params, setParams] = useState([]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    setCityName(city);
    setCity("");
  };

  //get weather data
  const getCityName = async (ct) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=775e854869ce46fe85d180626210708&q=${ct}&aqi=no`
      );
      const resData = response.data;

      setParams([
        {
          id: Math.floor(Math.random() * 100),
          ctName: resData.location.name,
          country: resData.location.country,
          temperature: resData.current.temp_c,
          //  minTemperature: resData.main.temp_min,
          //  maxTemperature: resData.main.temp_max,
          icon: resData.current.condition.icon,
          weather: resData.current.condition.text,
        },
      ]);
    } catch (err) {
      console.error(err.message);
      if (err) {
        setParams("");
      }
    }
  };

  // add remove class to style city name
  const addClass = () => {
    const ct = document.querySelector(".name");
    const ctText = ct.innerHTML;
    if (ctText.length > 15) {
      ct.classList.remove("display-4");
      ct.classList.add("display-5");
    }
  };

  useEffect(() => {
    if (cityName) {
      getCityName(cityName);
    }
  }, [cityName]);

  useEffect(() => {
    if (params) {
      params.map((param) => {
        addClass();
      });
    }
  }, [params]);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const today = new Date();

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col
              lg={{ span: 6, offset: 3 }}
              md={{ span: 6, offset: 3 }}
              sm={{ span: 8, offset: 2 }}
            >
              <div className='box shadow-lg mt-5 p-4 text-center'>
                <h1 className='heading mt-2'>Find Weather</h1>
                <form className='mt-4' onSubmit={onSubmitForm}>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter city name'
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                </form>
                {params !== "" ? (
                  params.map((param) => {
                    return (
                      <div key={param.id}>
                        <h6 className='city mt-3'>
                          <span className='name display-4'>
                            {param.ctName},
                          </span>
                          {param.country}
                        </h6>
                        <h5 className='date mt-2'>
                          {today.toLocaleDateString("en-US", options)}
                        </h5>
                        <h1 className='temp mt-4'>
                          <img src={param.icon} />
                          {param.temperature}&ordm;
                        </h1>
                        <h2 className='weather mt-2'>{param.weather}</h2>
                      </div>
                    );
                  })
                ) : (
                  <p className='mt-3'>Sorry the city name does not exits.</p>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default App;
