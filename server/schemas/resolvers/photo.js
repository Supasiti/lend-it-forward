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
    const updated = await updaterMap[model](dataToUpdate);
    console.log(updated);
    return {
      success: true,
      imageUrl,
    };
  }
  throw new AuthenticationError('you must be logged in');
};

module.exports = {
  processPhoto,
};

// const { createReadStream, filename } = await args.photo;

//   try {
//     const stream = createReadStream();
//     const out = require('fs').createWriteStream(`${filename}`);
//     out.on('finish', () => {
//       console.log('All writes are now complete.');

//     });
//     stream.pipe(out);
//     return { message: 'upload completed' };
//   } catch (e) {
//     console.error(e.message);
//     return { message: 'failed to upload the file' };
//   }
