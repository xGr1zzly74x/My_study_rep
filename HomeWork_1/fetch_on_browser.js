const API_KEY_YANDEX = "85eaff1b-ef9e-4c11-89bc-ca01d1ae43de"

document.getElementById("city_select").addEventListener("submit", function (event) {
  event.preventDefault() // Отменяем отправку формы
  const place_name = document.getElementById("city").value
  const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${place_name}&format=json`

  fetch(API_URL_GEO_DATA)
    .then((resp_city) => resp_city.json())
    //.then(my_resp => console.log(my_resp.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos))

    .then(function (resp_city) {
      let str = resp_city.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
      let coordinates = str.split(" ")

      //console.log(coordinates)
      const API_OPEN_METEO = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coordinates[1]}&longitude=${coordinates[0]}&hourly=pm10,pm2_5`

      fetch(API_OPEN_METEO)
        .then((resp_meteo) => resp_meteo.json())

        // .then(resp_meteo => console.log(resp_meteo.hourly.time))
        // .then(resp_meteo => console.log(resp_meteo.hourly.pm10))
        // .then(resp_meteo => console.log(resp_meteo.hourly.pm2_5))

        .then((resp_meteo) => {
          document.querySelector(".div_table_pol").innerHTML = `<table class ="table_pol"></table>`
          let head = document.createElement("thead")
          head.innerHTML = `<th>Дата</th>
                            <th>Время</th>
                            <th>PM10</th>
                            <th>PM2_5</th>`
          document.querySelector(".table_pol").appendChild(head)
          let length = resp_meteo.hourly.time.length //Считаем, что массивы одинаковой длины

          for (let i = 0; i < length; i += 1) {
            let row = document.createElement("tr")
            let str_time_date = resp_meteo.hourly.time[i]
            let m_time_date = str_time_date.split("T")

            row.innerHTML = `<td>${m_time_date[0]}</td> 
                             <td>${m_time_date[1]}</td> 
                             <td>${resp_meteo.hourly.pm10[i]}</td> 
                             <td>${resp_meteo.hourly.pm2_5[i]}</td>`
            document.querySelector(".table_pol").appendChild(row)
          }
        })
      return resp_city
    })
})
