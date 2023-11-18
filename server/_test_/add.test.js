const { functions } = require("./add")


test('add 2 + 2 to equal 4 ', () => {
  expect(functions.add(2,2)).toEqual(4)
})

