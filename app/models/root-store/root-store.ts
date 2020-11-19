import { WeatherStoreModel } from "../weather-store/weather-store"
import { CountryStoreModel } from "../country-store/country-store"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CountryModel } from '../../models/country/country';
/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  weatherStore: types.optional(WeatherStoreModel, {}),
  countryStore: types.optional(CountryStoreModel, {}),
    countryDetails: types.optional(CountryModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
