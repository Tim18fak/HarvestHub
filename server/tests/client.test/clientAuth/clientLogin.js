const url = 'http://localhost/client/searchproduct'

fetch(url,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({
        'password': 'F=:9eQwPr&<*F5v&O5h8',
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