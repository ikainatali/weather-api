import { useState, useEffect } from "react";
import axios from "axios";

//compnents
import Data from "./components/Data";

//bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Container, Row, Col } from "react-bootstrap";

const App = () => {
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState("");
  const [params, setParams] = useState([]);

  let text;
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

  useEffect(() => {
    if (cityName) {
      getCityName(cityName);
    }
  }, [cityName]);

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
                <h1 className='heading'>Find Weather</h1>
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
                      <Data key={param.id} params={params} param={param} />
                    );
                  })
                ) : (
                  <p className='mt-3'>
                    Sorry the city name is incorrect or does not exits.
                  </p>
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
