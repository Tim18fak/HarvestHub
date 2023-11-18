const axios = require('axios')

test('Should be a Truthy ', async() => {
    const response = await axios.get('http://localhost/auth/code')
    expect(response.data).toBeTruth()
})
