import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const CityApi = createApi({
    reducerPath: 'CityApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https:'}),
    endpoints: (build) => ({
        GetCityData: build.query({
            queryFn: async (arg, api, extraOptions, fetchWithBQ) => {

                const api_key_yandex = "85eaff1b-ef9e-4c11-89bc-ca01d1ae43de"
                let result_pol:any = {}
                let result_coord:any = {}

                result_coord = await fetchWithBQ(`//geocode-maps.yandex.ru/1.x/?apikey=${api_key_yandex}&geocode=${arg.city}&format=json`)

                if (result_coord.error){
                    console.log(result_coord.error)

                } else{
                    let str = result_coord?.data.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.Point.pos
                    if (str){
                        let coordinates = (str.split(" "))

                        result_pol = await fetchWithBQ(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coordinates[1]}&longitude=${coordinates[0]}&hourly=pm10,pm2_5`)
                        if (result_pol.error){
                            console.log(result_pol.error)
                            
                        } else{
                            //console.log(result_pol?.data?.hourly)
                        }
                    }  
                }
                return result_pol}
            }),
            SaveQueryCity: build.mutation({
                query: (body) => ({
                    url: 'http://localhost:4040/History_Query_City',
                    method: 'POST',
                    body
                })
            })
        })
        
    })