import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { useSelector } from "react-redux"
import { city_selector}  from "../store/slice_login"

let endpoint:string

const Create_SubQuery = () => {
    const api_key_yandex = "85eaff1b-ef9e-4c11-89bc-ca01d1ae43de"
    const redux_city = useSelector(city_selector.get_city)

  return `1.x/?apikey=${api_key_yandex}&geocode=${redux_city}&format=json`
}

endpoint = Create_SubQuery()
export const CityApi = createApi({
    reducerPath: 'CityApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://geocode-maps.yandex.ru/'}),
    endpoints: (build) => ({
        getCityCoord: build.query<any, string>({
            query: () => ({
                url: '1.x/?apikey=85eaff1b-ef9e-4c11-89bc-ca01d1ae43de&geocode=Москва&format=json'})
            })
        })
    })