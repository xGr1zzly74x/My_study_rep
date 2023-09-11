import React, { useState, useEffect } from 'react'
import { InputText } from '../../components'
import Chart from 'chart.js/auto'
import './style.css'

const CatalogPlaces = () => {

  //Подключаем хук состояния
  const [City, setCity] = useState<string>('')    //Для сохранения поля город
  const [uniqDate, setUniqDate] = useState<any>([])       //Для сохранения массива дат
  const [pok10, setPok10] = useState<number[]>([])  //Для сохранения массива 2_5
  const [pok2_5, setPok2_5] = useState<number[]>([])  //Для сохранения массива 10
  const [isCityError, setIsCity] = useState<boolean>(false)//Для валидации города

  const regex_city = new RegExp('^[a-z A-Zа-яА-яЁё-]+$')    //Для валидации города

  let arr_pok10: number[] = []
  let arr_pok2_5: number[] = []

  let length: any
  let count_pm10: any
  let count_pm2_5: any
  let mychart: any

  useEffect(() => {
    document.body.classList.remove('body_login')
    document.body.classList.remove('body_about')
    document.body.classList.add('body_catalog_places')

  })

  //При изменении города записать значение в переменную city
  const handleChangeCity = (event: any) => {
    setCity(event.target.value)

    if (!event.target.value) {
      setIsCity(false)
    }
    else {
      if (regex_city.test(event.target.value)) {
        setIsCity(false)
      }
      else {
        setIsCity(true)
      }
    }
  }

  //Событие нажатия кнопки получить данные
  const handleButtonFetch = (event: any) => {

    const API_KEY_YANDEX = "85eaff1b-ef9e-4c11-89bc-ca01d1ae43de"
    const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${City}&format=json`

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
            const div_table_pol = document.querySelector(".div_table_pol") as HTMLDivElement

            if (div_table_pol != null) {
              div_table_pol.style.setProperty('display', 'block')
              div_table_pol.innerHTML = `<table class ="table_pol"></table>`
            }

            let head = document.createElement("thead")
            head.innerHTML = `<th>Дата</th>
                              <th>Время</th>
                              <th>PM10</th>
                              <th>PM2_5</th>`

            const table_pol = document.querySelector(".table_pol") as HTMLElement
            table_pol.appendChild(head)

            length = resp_meteo.hourly.time.length //Считаем, что массивы одинаковой длины
            let date_arr = resp_meteo.hourly.time.map((item: any) => {
              return item.slice(0, 10)
            })

            const uniqDate = new Set<any>(date_arr)
            setUniqDate(uniqDate)

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

              table_pol.appendChild(row)
              now_dat = m_time_date[0]

              if (resp_meteo.hourly.pm10[i] != null) {
                count_pm10 += 1
              }

              if (resp_meteo.hourly.pm2_5[i] != null) {
                count_pm2_5 += 1
              }

              if (prev_dat == null) {
                sum_pm10 = resp_meteo.hourly.pm10[i]
                sum_pm2_5 = resp_meteo.hourly.pm2_5[i]
              }

              else {
                if (now_dat == prev_dat) {
                  sum_pm10 += resp_meteo.hourly.pm10[i]
                  sum_pm2_5 += resp_meteo.hourly.pm2_5[i]
                }

                else {
                  if (count_pm10 > 0) {
                    arr_pok10.push(sum_pm10 / count_pm10)
                  }
                  else {
                    arr_pok10.push(0)
                  }

                  if (count_pm2_5 > 0) {
                    arr_pok2_5.push(sum_pm2_5 / count_pm2_5)
                  }
                  else {
                    arr_pok2_5.push(0)
                  }

                  sum_pm10 = resp_meteo.hourly.pm10[i]
                  sum_pm2_5 = resp_meteo.hourly.pm2_5[i]

                  count_pm10 = 0
                  count_pm2_5 = 0
                }
              }

              if (i == length - 1) {
                if (count_pm10 > 0) {
                  arr_pok10.push(sum_pm10 / count_pm10)
                }
                else {
                  arr_pok10.push(0)
                }

                if (count_pm2_5 > 0) {
                  arr_pok2_5.push(sum_pm2_5 / count_pm2_5)
                }
                else {
                  arr_pok2_5.push(0)
                }
              }
              prev_dat = m_time_date[0]
            }

            //Сохраним наши массивы
            setPok10(arr_pok10)
            setPok2_5(arr_pok2_5)
          })
          .catch(error => console.log(`Ошибка fetch=== ${error}`))
        return resp_city
      })
      .catch(error => console.log(`Ошибка fetch=== ${error}`))
  }

  const handleButtonGraph = (event: any) => {
    if (pok10.length > 0 && pok10.length > 0) {

      const Graphics = document.querySelector("#Graphics") as HTMLElement
      Graphics.style.setProperty('display', 'block')

      let chartStatus: (any) = Chart.getChart("Graphics")
      //Возможность обновлять график
      if (chartStatus !== undefined) {
        chartStatus.destroy()
      }

      const PM2_5 = {
        data: (pok2_5),
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Цвет фона
        borderColor: "rgba(54, 162, 235, 1)", // Цвет границы
        borderWidth: 3, // Толщина границ
        label: "PM 2_5",
      }

      const PM10 = {
        label: "PM10",
        data: (pok10),
        backgroundColor: "rgba(255, 159, 64, 0.2)", // Цвет фона
        borderColor: "rgba(255, 159, 64, 1)", // Цвет границы
        borderWidth: 3, // Толщина границ
      }

      const Graphics_can = document.querySelector("#Graphics") as HTMLCanvasElement

      mychart = new Chart(Graphics_can, {
        type: "bar",
        data: {
          labels: (Array.from(uniqDate)),
          datasets: [PM2_5, PM10],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: `Среднесуточное загрязнение воздуха в городе ${City}`,
            },
          },
          scales: {
            y: { beginAtZero: true },
          },
        },
      })
    }
  }

  return (
    <>
      <form id="city_select">
        <InputText type="text"
          className="InputCity"
          placeholder="Введите&nbsp;название&nbsp;города"
          onChange={(event: any) => handleChangeCity(event)} />

        {isCityError && <div style={{ color: 'red' }}>Недопустимые символы в строке!</div>}

        <button type="button" className="button" id="button_select" onClick={handleButtonFetch}>Получить&nbsp;данные</button>
        <button type="button" className="button" id="button_chart" onClick={handleButtonGraph}>Построить&nbsp;график</button>
      </form>

      <div className="div_table_pol zscroll-scrollbar"></div>

      <div className="Chart">
        <canvas id="Graphics"></canvas>
      </div>
    </>
  )
}

export default CatalogPlaces