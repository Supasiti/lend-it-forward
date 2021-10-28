const services = require('../../services');

const updaterMap = {
  loan: services.loan.updateLoan,
};

//  expect { photo, _id, model}
const processPhoto = async (parent, { upload }, context) => {
  if (context.user) {
    const { photo, _id, model } = upload;
    const cloudRes = await services.processPhoto(photo);
    const imageUrl = cloudRes.url;

    const dataToUpdate = {
      user: context.user._id,
      _id,
      imageUrl,
    };
    await updaterMap[model](dataToUpdate);
    return {
      success: true,
      imageUrl,
      _id,
    };
  }
  throw new AuthenticationError('you must be logged in');
};

module.exports = {
  processPhoto,
};
