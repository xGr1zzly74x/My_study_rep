const API_KEY_YANDEX = "85eaff1b-ef9e-4c11-89bc-ca01d1ae43de";

document
  .getElementById("city_select")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Отменяем отправку формы
    const place_name = document.getElementById("city").value
    const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${place_name}&format=json`

    fetch(API_URL_GEO_DATA)
      .then((resp_city) => resp_city.json())
      //.then(my_resp => console.log(my_resp.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos))

      .then(function (resp_city) {
        let str = resp_city.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
        let coordinates = str.split(" ")

        //console.log(coordinates)
        const API_OPEN_METEO = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coordinates[1]}&longitude=${coordinates[0]}&hourly=pm10,pm2_5`;
        
        fetch(API_OPEN_METEO)
          .then((resp_meteo) => resp_meteo.json())

          // .then(resp_meteo => console.log(resp_meteo.hourly.time))
          // .then(resp_meteo => console.log(resp_meteo.hourly.pm10))
          // .then(resp_meteo => console.log(resp_meteo.hourly.pm2_5))

          .then((resp_meteo) => {
            for (let i = 0; i < resp_meteo.hourly.time.length; i += 1) {
              const ztime = document.getElementById("ztime")
              let li = document.createElement("li")
              let span = document.createElement("span")
              let str_time_date = resp_meteo.hourly.time[i]
              let m_time_date = str_time_date.split("T")
              span.innerHTML = `${m_time_date[0]} ${m_time_date[1]}`
              li.appendChild(span)
              ztime.appendChild(li)
            }
            for (let i = 0; i < resp_meteo.hourly.pm10.length; i += 1) {
              const zpm_10 = document.getElementById("zpm_10")
              let li = document.createElement("li")
              let span = document.createElement("span")
              span.innerHTML = `${resp_meteo.hourly.pm10[i]}`
              li.appendChild(span)
              zpm_10.appendChild(li)
            }
            for (let i = 0; i < resp_meteo.hourly.pm2_5.length; i += 1) {
              const zpm_2_5 = document.getElementById("zpm_2_5")
              let li = document.createElement("li")
              let span = document.createElement("span")
              span.innerHTML = `${resp_meteo.hourly.pm10[i]}`
              li.appendChild(span)
              zpm_2_5.appendChild(li)
            }
          })
        return resp_city
      })
  })
