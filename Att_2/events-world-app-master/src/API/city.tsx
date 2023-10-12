import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const CityApi = createApi({
    reducerPath: 'CityApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://geocode-maps.yandex.ru/'}),
    endpoints: (build) => ({
        getCityCoord: build.query<string, string>({
            query: (arg) => {
                const api_key_yandex = "85eaff1b-ef9e-4c11-89bc-ca01d1ae43de"
                console.log(arg)
                console.log('был запрос')
                return {
                url: `1.x/?apikey=${api_key_yandex}&geocode=${arg}&format=json`}}
            })
        })
    })