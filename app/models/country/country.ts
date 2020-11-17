import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { Api } from '../../services/api'
import { type,omit } from "ramda";


const api = new Api();
api.setup();
/**
 * Model description here for TypeScript hints.
 */
export const CountryModel = types
  .model("Country")
  .props({
    name : types.maybe(types.string),
    capital :types.maybe(types.string),
    population : types.maybe(types.number),
    latlng :types.array(types.number),
    flag : types.maybe(types.string),
  })
  //.views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
  //   getCountryDetails: flow(function* getCountryDetails(cname) {
  //     try {
          
  //          const data = yield api.getCountryDetails(cname);
  //         self.name = data.name;
  //         self.capital = data.capital;
  //         self.population = data.population;
  //         self.latlng =data.latlng;
  //         self.
          
  //     } catch (erro) {
  //       console.warn('ops');
  //     }
  // })
  }))
 //.postProcessSnapshot(omit([ "country"])) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type CountryType = Instance<typeof CountryModel>
export interface Country extends CountryType {}
type CountrySnapshotType = SnapshotOut<typeof CountryModel>
export interface CountrySnapshot extends CountrySnapshotType {}
