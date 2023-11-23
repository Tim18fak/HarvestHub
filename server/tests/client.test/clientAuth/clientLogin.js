const url = 'http://localhost/auth/login/'

fetch(url,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({
        'password': 'E0INi+t2&~8$ijB4Y09v',
        'email':'timothy.avell.olatunde@gmail.com'})
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