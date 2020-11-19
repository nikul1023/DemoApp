import { GeneralApiProblem } from "./api-problem"
import { CountrySnapshot, WeatherSnapshot } from "../../models"

export interface User {
  id: number
  name: string
}
export interface Weather{
  temperature : number,
  windspeed : number,
  icon : Array<string>
  precip : number
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem
export type GetCountryResults = { kind:"ok"; countrys: CountrySnapshot[]} | GeneralApiProblem
export type GetWeatherResults = { kind:"ok"; weatherinfo: WeatherSnapshot[]} | GeneralApiProblem