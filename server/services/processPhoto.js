const cloudinary = require('../config/cloudinary');

const uploader = cloudinary.v2.uploader;

const options = {
  folder: 'lend_it_forward',
  allowed_formats: ['jpg', 'png'],
};

// argument : readStream
// return Promise<Object>
// where object has { url, secure_url}
const cloudUploadStream = (stream) => {
  try {
    return new Promise((resolve, reject) => {
      const streamUpload = uploader.upload_stream(options, (error, result) => {
        if (result) {
          console.log(result);
          return resolve(result);
        }
        console.log(error);
        return reject(error);
      });
      stream.pipe(streamUpload);
    });
  } catch (e) {
    throw new Error(`Failed to upload photo! Error:${e.message}`);
  }
};

const validateMimetype = (mimetype) => {
  const acceptedMimetype = ['image/jpeg', 'image/png'];
  const result = acceptedMimetype.includes(mimetype);
  console.log(mimetype);
  return result;
};

// process image coming from the readStream
const processPhoto = async (photo) => {
  const { createReadStream, mimetype } = await photo;

  console.log(photo);
  if (!validateMimetype(mimetype)) return null;

  try {
    const stream = createReadStream();
    const result = await cloudUploadStream(stream);
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
};

module.exports = processPhoto;
