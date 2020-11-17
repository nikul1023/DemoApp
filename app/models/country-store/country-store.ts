import { Instance, SnapshotOut, types ,flow} from "mobx-state-tree"
import { CountryModel, CountrySnapshot, Country } from "../country/country"
//import { Country } from "../../services/api"

import { withEnvironment } from "../extensions/with-environment"
import { Api } from '../../services/api'


const api = new Api();
api.setup();
/**
 * Model description here for TypeScript hints.
 */
export const CountryStoreModel = types
  .model("CountryStore")
  .props({
     country: types.optional(types.array(CountryModel), [])
    //country : types.optional(types.frozen(),null)
  })
  .extend(withEnvironment)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    saveCountry: (coutrySnapshots: CountrySnapshot[]) => {
      const countryModels: Country[] = coutrySnapshots.map(c => CountryModel.create(c)) // create model instances from the plain objects
      self.country.replace(countryModels) // Replace the existing data with the new data
    },
  }))
  .actions(self => ({

    getCountryDetails: flow(function* (name:string) {
      const result =yield self.environment.api.getCountryDetails(name);
      if(result.kind === "ok") {
         self.saveCountry(result.countrys);
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

type CountryStoreType = Instance<typeof CountryStoreModel>
export interface CountryStore extends CountryStoreType {}
type CountryStoreSnapshotType = SnapshotOut<typeof CountryStoreModel>
export interface CountryStoreSnapshot extends CountryStoreSnapshotType {}
