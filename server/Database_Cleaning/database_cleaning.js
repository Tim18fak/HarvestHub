async function deleteUnverifiedAdminActivationcode(collection) {
    try {
      const result = await collection.deleteMany({ activationCodeStatus: 'Pending' });
      console.log(`Deleted ${result.deletedCount} admin with a status 'Pending'.`);
    } catch (error) {
      console.error('Error deleting documents:', error);
    }
  }
  async function deleteUnverifiedUserActivationcode(collection){
    try {
      const result = await collection.deleteMany({ activationCodeStatus: 'Pending' });
      console.log(`Deleted ${result.deletedCount} user account  with a status 'Pending'.`);
    } catch (error) {
      console.error('Error deleting documents:', error);
    }
  }
  async function deleteUnverifiedFarmerActivationcode(collection){
    try {
      const result = await collection.deleteMany({ activationCodeStatus: 'Pending' });
      console.log(`Deleted ${result.deletedCount} farmer with a status 'Pending'.`);
    } catch (error) {
      console.error('Error deleting documents:', error);
    }
  }

  module.exports = {deleteUnverifiedAdminActivationcode,deleteUnverifiedFarmerActivationcode,deleteUnverifiedUserActivationcode}
  