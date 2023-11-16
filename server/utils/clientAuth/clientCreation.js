const url = 'http://localhost/auth/signup'

fetch(url,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({'username':'timothy',
        'password': 'timothy',
        'email':'harvestHub4@gmail.com',
        'isFarmer': false,
        'fullname': 'tim'})
})
.then((response) => {
    if(!response){
        response.json()
        .then((data) => {
            console.log(data)
        })
        
    }
    response.json()
        .then((data) => {
            console.log(data)
        })
})