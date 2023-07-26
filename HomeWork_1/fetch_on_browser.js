const arr_pok10  = new Array()
const arr_pok2_5 = new Array()
let uniqDate     = new Array()

let place_name
let length
let count_pm10
let count_pm2_5
let chart

document.getElementById("button_select").addEventListener("click", function (event) {
  place_name = document.getElementById("city").value
  const API_KEY_YANDEX = "85eaff1b-ef9e-4c11-89bc-ca01d1ae43de"
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
          document.querySelector(".div_table_pol").style.display = "block"
          document.querySelector(".div_table_pol").innerHTML = `<table class ="table_pol"></table>`

          let head = document.createElement("thead")
          head.innerHTML = `<th>Дата</th>
                            <th>Время</th>
                            <th>PM10</th>
                            <th>PM2_5</th>`

          document.querySelector(".table_pol").appendChild(head)
          length = resp_meteo.hourly.time.length //Считаем, что массивы одинаковой длины
          let date_arr = resp_meteo.hourly.time.map((item) => {
            return item.slice(0, 10)
          })

          uniqDate = new Set(date_arr)

          let now_dat
          let prev_dat
          let sum_pm10
          let sum_pm2_5

          count_pm10 = 0
          count_pm2_5 = 0

          for (let i = 0; i < length; i += 1) {
            let row = document.createElement("tr")
            let str_time_date = resp_meteo.hourly.time[i]
            let m_time_date = str_time_date.split("T")

            row.innerHTML = `<td>${m_time_date[0]}</td> 
                             <td>${m_time_date[1]}</td> 
                             <td>${resp_meteo.hourly.pm10[i]}</td> 
                             <td>${resp_meteo.hourly.pm2_5[i]}</td>`

            document.querySelector(".table_pol").appendChild(row)

            now_dat = m_time_date[0]

            if (resp_meteo.hourly.pm10[i] !=null) {
              count_pm10 += 1
            }

            if (resp_meteo.hourly.pm2_5[i] !=null) {
              count_pm2_5 += 1
            }

            if (prev_dat == null) {
              sum_pm10 = resp_meteo.hourly.pm10[i]
              sum_pm2_5 = resp_meteo.hourly.pm2_5[i]}

            else {
              if (now_dat == prev_dat) {
                sum_pm10 += resp_meteo.hourly.pm10[i]
                sum_pm2_5 += resp_meteo.hourly.pm2_5[i]}

              else {
                if (count_pm10 > 0){
                  arr_pok10.push(sum_pm10 / count_pm10)
                }
                else{
                  arr_pok10.push(0)
                }

                if (count_pm2_5 > 0){
                  arr_pok2_5.push(sum_pm2_5 / count_pm2_5)
                }
                else{
                  arr_pok2_5.push(0)
                }
  
                sum_pm10 = resp_meteo.hourly.pm10[i]
                sum_pm2_5 = resp_meteo.hourly.pm2_5[i]

                count_pm10 = 0
                count_pm2_5 = 0
              }
            }

            if (i == length - 1) {
              if (count_pm10 > 0){
                arr_pok10.push(sum_pm10 / count_pm10)
              }
              else{
                arr_pok10.push(0)
              }

              if (count_pm2_5 > 0){
                arr_pok2_5.push(sum_pm2_5 / count_pm2_5)
              }
              else{
                arr_pok2_5.push(0)
              }
            }
            prev_dat = m_time_date[0]
          }
        })
        .catch(error => console.log(error))
      return resp_city
    })
    .catch(error => console.log(error))
})

document.getElementById("button_chart").addEventListener("click", function (event) {
  //Получение ссылки на элемент canvas в DOM
  if (arr_pok2_5.length > 0 && arr_pok10.length > 0) {
    let graphics = document.getElementById("Graphics").style.display = "block"
    place_name = document.getElementById("city").value

    //Возможность обновлять график
    if (chart != null ){
      chart.destroy()
    }

    //console.log(uniqDate)//массив значений x (даты)
    //console.log(arr_pok10)//массив значений y (показатели загрязнения)
    //console.log(arr_pok2_5)//массив значений y (показатели загрязнения)

    const PM2_5 = {
      label: "PM2_5",
      data: arr_pok2_5,
      backgroundColor: "rgba(54, 162, 235, 0.2)", // Цвет фона
      borderColor: "rgba(54, 162, 235, 1)", // Цвет границы
      borderWidth: 3, // Толщина границ
      label: "PM 2_5",
    }

    const PM10 = {
      label: "PM10",
      data: arr_pok10,
      backgroundColor: "rgba(255, 159, 64, 0.2)", // Цвет фона
      borderColor: "rgba(255, 159, 64, 1)", // Цвет границы
      borderWidth: 3, // Толщина границ
      label: "PM 10",
    }

    chart = new Chart(Graphics, {
      type: "bar",
      data: {
        labels: Array.from(uniqDate),
        datasets: [PM2_5, PM10],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: `Среднесуточное загрязнение воздуха в городе ${place_name}`,
          },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    })
  }
})
