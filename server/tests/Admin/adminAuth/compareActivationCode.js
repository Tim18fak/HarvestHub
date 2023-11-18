const url = 'http://localhost/admin/compare?adminId=65549b4d0b69b4d2448592a6'

fetch(url,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({"code": 8966})
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