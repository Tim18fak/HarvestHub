const { axios } = require("../../config/axios.config")

test('Http server working', async() => {
    const response = await axios.get('http://localhost')
        expect(response.data).toBe('Hello, HTTP World!')
  })
