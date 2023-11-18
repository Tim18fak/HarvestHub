const url = 'http://localhost/auth/reset'

fetch(url,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({
        'email':'harvestHub4@gmail.com',
        'isFarmer': false,
})
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