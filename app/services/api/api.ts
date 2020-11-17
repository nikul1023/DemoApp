import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { CountrySnapshot } from "../../models"

/**
 * Manages all requests to the API.
 */

export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

 
  /**
   * Gets a list of users.
   */
  async getCountryDetails(cname : string): Promise<Types.GetCountryResults> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`${cname}`,{amount :1})

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // const convertCountry = raw => {
    //   return {
    //     name: raw.name,
    //     capital: raw.capital,
    //     population : raw.population,
    //     lating : raw.lating,
    //     flag : raw.flag,
    //   }
    // }
    const convertCountry = (raw: any): CountrySnapshot => {
   
      return {
       name : raw.name,
       capital : raw.capital,
       population :raw.population,
       latlng : raw.latlng,
        flag : raw.flag,
      }
    }
    // transform the data into the format we are expecting
    try {
      // const rawUsers = response.data
      
      const rawCountry = response.data
      const convertedCountry: CountrySnapshot[] = rawCountry.map(convertCountry)
      // const resultCountries : Types.Country = {
      //   name : convertedCountry.name,
      //   capital :response.data.capital,

      // }
      return { kind: "ok", countrys : convertedCountry}
    } catch(e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a single user by ID
   */

  async getUser(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        name: response.data.name,
      }
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
