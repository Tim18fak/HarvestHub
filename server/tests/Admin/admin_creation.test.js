const axios = require('axios')
test('Admin exist', async() => {
  const response = await axios.post('http://localhost/admin/admincreation',{
    'username':'timothy',
        'password': 'timothy',
        'email':'timothy.avell.olatunde@gmail.com'
  })
  expect(response.data.message).toBe("Admin Account Already Exist")
})
