import { useState } from "react";

function App() {
  const [response, setResponse] = useState<any>();
  const [isError, setIsError] = useState("");

  const fetchWithCity = async () => {
    const inputElement = document.getElementById(
      "city-input"
    ) as HTMLInputElement;

    await fetch(
      `https://api.openweathermap.org/data/2.5/weather/?q=${inputElement?.value}&units=metric&APPID=7c6410a650a22c83550af3b0bcf2b912`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setResponse(result);
        setIsError("");
      })
      .catch((e) => {
        console.log(e);
        setIsError("Something wrong while fetching weather!");
      });
  };
  const getCurrentLocationWeather = async () => {
    const successLocation = async (position: any) => {
      console.log(position);

      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=7c6410a650a22c83550af3b0bcf2b912`
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setResponse(result);
          setIsError("");
        })
        .catch((e) => {
          console.log(e);
        });
    };
    await navigator.geolocation.getCurrentPosition(successLocation, (e) => {
      console.log("Error occured while fetching location.");
      setIsError("Error occured while fetching location.");
    });
  };

  console.log(response);

  return (
    <main className="w-full h-screen flex justify-center items-center bg-gray-200">
      <div className="flex flex-col justify-center items-center gap-10 w-[600px] shadow-md bg-white p-10 rounded-md">
        <h1 className="rounded-md text-2xl w-full bg-teal-500 text-white py-2 text-center">
          Weather App
        </h1>
        <div className="space-y-5 flex flex-col justify-center items-center ">
          <button
            onClick={getCurrentLocationWeather}
            className="w-max bg-blue-500 text-white rounded-md px-5 py-2"
          >
            My location weather
          </button>
          <div className="flex space-x-5">
            <input
              id="city-input"
              className="border border-gray-300 rounded px-4 focus:outline-none focus:border focus:border-blue-500"
              placeholder="Enter city..."
            />
            <button
              onClick={fetchWithCity}
              className="w-max bg-blue-500 text-white rounded-md px-5 py-2 "
            >
              Get weather
            </button>
          </div>
        </div>
        {response !== undefined && (
          <div>
            <div className="border-t text-center pt-4 text-xl border-b-blue-500 w-full">
              Weather details
            </div>
            <div className="mt-3">
              {response === undefined && !isError ? (
                <h1>Fetching weather...</h1>
              ) : isError ? (
                <h1>{isError}</h1>
              ) : (
                response?.main && (
                  <div className="text-center">
                    <img
                      src={`http://openweathermap.org/img/w/${response.weather[0].icon}.png`}
                      alt="weather status icon"
                      className="weather-icon mx-auto"
                    />
                    <p className="h2">
                      Temperature : {response.main.temp}&deg; C
                    </p>

                    <div className="flex justify-center space-x-2">
                      <div>Location: </div>
                      <p className="h5">
                        <i className="fas fa-map-marker-alt"></i>{" "}
                        <strong>{response.name}</strong>
                      </p>
                    </div>

                    <div className="">
                      <div className="">
                        <p>
                          {" "}
                          <strong>{response.weather[0].main}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
