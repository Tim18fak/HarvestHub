const url = 'http://localhost/admin/admincreation'

fetch(url,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({'username':'timothy',
        'password': 'timothy',
        'email':'timothy.avell.olatunde@gmail.com',
        'activationCode': 2022,
        'secondActivationCode': 2022})
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