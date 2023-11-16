const url = 'http://localhost/auth//activation?clientId=6555dd152d7e2cd8d0296f28'

fetch(url,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({'code': 7189})
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