import axios from "axios";
import { useState } from "react";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const apiKey = "92ace11913cd3104c738b14a65913c8d";

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Erro ao buscar o clima: ", error);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const weatherConditionsClass = weather
    ? weather.weather[0].description.replace(" ", "-").toLowerCase()
    : "";

  const getWeatherIcon = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  return (
    <div>
      <h1>Previsão do Tempo</h1>
      <input
        type="text"
        placeholder="Digite sua cidade.."
        value={city}
        onChange={handleInputChange}
      />
      <button onClick={fetchWeather}>Buscar</button>
      {weather && (
        <div className={`card ${weatherConditionsClass}`}>
          <h2>
            <b>{weather.name}</b>
          </h2>
          <img
            className="weather-icon"
            src={getWeatherIcon(weather.weather[0].icon)}
            alt={weather.weather[0].description}
          />

          <p>
            Temperatura atual: <b>{weather.main.temp}</b> Graus celsius.
          </p>
          <p>
            Condição:
            <b>
              {weather.weather[0].description || weather.weather[0].description}
            </b>
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;
