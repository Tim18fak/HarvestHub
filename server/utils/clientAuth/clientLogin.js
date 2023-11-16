const url = 'http://localhost/auth/login'

fetch(url,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({
        'password': 'N9zf*^a0u5MGA:Nr47!u',
        'email':'harvestHub4@gmail.com'})
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