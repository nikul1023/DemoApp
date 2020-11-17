import { CountryModel, Country } from "./country"

test("can be created", () => {
  const instance: Country = CountryModel.create({})

  expect(instance).toBeTruthy()
})