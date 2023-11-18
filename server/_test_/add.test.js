const { functions } = require("./add")
const axios =  require('axios')

test('add 2 + 2 to equal 4 ', () => {
  expect(functions.add(2,2)).toEqual(4)
})

/* test('Http server working', () => {
    const data = axios.get('http://localhost')
    expect(functions.add(2,2)).toEqual(4)
  })
 */