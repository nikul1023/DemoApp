import { WeatherStoreModel, WeatherStore } from "./weather-store"

test("can be created", () => {
  const instance: WeatherStore = WeatherStoreModel.create({})

  expect(instance).toBeTruthy()
})