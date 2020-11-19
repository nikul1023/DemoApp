import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const WeatherModel = types
  .model("Weather")
  .props({
    temperature : types.maybe(types.number),
    windspeed : types.maybe(types.number),
    icon : types.array(types.string),
    precip : types.maybe(types.number),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type WeatherType = Instance<typeof WeatherModel>
export interface Weather extends WeatherType {}
type WeatherSnapshotType = SnapshotOut<typeof WeatherModel>
export interface WeatherSnapshot extends WeatherSnapshotType {}
