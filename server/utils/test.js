const url = 'http://localhost/admin/admincreation'

fetch(url,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({'username':'timothy',
        'password': 'timothy',
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