const { axios } = require("../../config/axios.config")

test('Should be a Truthy ', async() => {
    const response = await axios.get('http://localhost/auth/code')
    expect(response.data).toBeTruthy()
})
