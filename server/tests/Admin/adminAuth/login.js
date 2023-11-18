const url = 'http://localhost/admin/adminLogin'

fetch(url,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({
        'email':'timothy.avell.olatunde@gmail.com',
    'password': 'IwnwsJyfFYmITujthrYD',
    'username': 'timothy'
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