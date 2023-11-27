/* const url = 'http://localhost/admin/allFarmer'

fetch(url)
.then((response) => {
    if(!response.ok){
        console.log(response + 'error')
    }
    response.json()
    .then((data) => {
        console.log(data)
    })
}) */

const bannedFarmerUrl =  'http://localhost/admin/banConsumer/6554d3d1080625fc1b4eaac6'

fetch(bannedFarmerUrl)
.then((response) => {
    if(!response){

    }
    response.json()
    .then((data) => {
        console.log(data)
    })
})