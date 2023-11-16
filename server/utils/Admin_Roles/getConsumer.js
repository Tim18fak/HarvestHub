const url = `http://localhost/admin/getconsumer`

fetch(url)
.then((data) => {
    data.json()
    .then((res) => {
        console.log(res)
    })
})

const farmerurl = 'http://localhost/admin/getfarmer';

fetch(farmerurl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json(); // This also returns a Promise
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
