import Profile from '../../src/assets/Profile.jpeg'

export const defaultProfileImage =  async() => {
    fetch(Profile)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    response.blob();
  })
  .then(blob => {
   return blob
  })
  .catch(error => {
    console.error('Error fetching image:', error);
  });
}