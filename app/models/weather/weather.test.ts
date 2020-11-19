import { WeatherModel, Weather } from "./weather"

test("can be created", () => {
  const instance: Weather = WeatherModel.create({})

  expect(instance).toBeTruthy()
})