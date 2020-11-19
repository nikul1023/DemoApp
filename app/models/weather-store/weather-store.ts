import { Instance, SnapshotOut, types ,flow} from "mobx-state-tree"
import { Api } from '../../services/api'
import { WeatherModel , Weather,WeatherSnapshot } from "../weather/weather";
import { any } from "ramda";

/**
 * Model description here for TypeScript hints.
 */
const api = new Api();
api.setup();

export const WeatherStoreModel = types
  .model("WeatherStore")
  .props({
    weatherinfo : types.optional(types.frozen(), null)
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  // .actions(self => ({
  //   saveWeather: (weatherSnapshots: WeatherSnapshot[]) => {
  //     const weathermodels: Weather[] = weatherSnapshots.map(c => WeatherModel.create(c)) // create model instances from the plain objects
  //     self.weatherinfo.replace(weathermodels) // Replace the existing data with the new data
  //   },
  // }))
  .actions(self => ({

    getWeatherDetails: flow(function* (name:string) {
      
      const result =yield api.getWeatherDetails(name);
      if(result.kind === "ok") {
         self.weatherinfo =result.weatherinfo;
      } else {
       __DEV__ && console.tron.log(result.kind)
      }
     
  })
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type WeatherStoreType = Instance<typeof WeatherStoreModel>
export interface WeatherStore extends WeatherStoreType {}
type WeatherStoreSnapshotType = SnapshotOut<typeof WeatherStoreModel>
export interface WeatherStoreSnapshot extends WeatherStoreSnapshotType {}
