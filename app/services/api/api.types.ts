import { GeneralApiProblem } from "./api-problem"
import { CountrySnapshot } from "../../models"

export interface User {
  id: number
  name: string
}
export interface Country{
  name: string
  capital : string
  population :string
  latlng : string
  flag : string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem
export type GetCountryResults = { kind:"ok"; countrys: CountrySnapshot[]} | GeneralApiProblem