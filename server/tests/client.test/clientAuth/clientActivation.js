const url = 'http://localhost/auth//activation?clientId=655baa3bfa08dda125a78c18'

fetch(url,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({'code': 1670})
})
.then((response) => {
    if(!response){
        response.json()
        .then((data) => {
            console.log(data)
        })
        /* 7189 */
    }
    response.json()
        .then((data) => {
            console.log(data)
        })
})