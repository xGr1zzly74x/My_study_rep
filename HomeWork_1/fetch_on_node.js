//Для вызова fetch через node.js
//- фигурные скобки нужны для явного импорта библиотеки
//Для подключения библиотеки через import в файл package.json добавлен параметр  "type": "module"
//Библиотеки node-fetch и https-proxy-agent нужно установить через команду npm i

import fetch from "node-fetch"
import {HttpsProxyAgent} from "https-proxy-agent" 

const proxyAgent = new HttpsProxyAgent('http://login:password@proxy.chmk.mechelgroup.ru:8080')

const place_name = 'Челябинск'
const API_KEY_YANDEX = '85eaff1b-ef9e-4c11-89bc-ca01d1ae43de'
const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${place_name}&format=json`

fetch(API_URL_GEO_DATA, { agent: proxyAgent})
.then(my_resp => my_resp.json())
.then(my_resp => console.log(my_resp.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos))

