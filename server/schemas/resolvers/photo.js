// const services = require('../../services');

const processPhoto = async (parent, { photo }) => {
  const { createReadStream, filename, encoding } = await photo;

  console.log(encoding);
  try {
    const stream = createReadStream();
    const out = require('fs').createWriteStream(`${filename}`);
    out.on('finish', () => {
      console.log('All writes are now complete.');
      return { message: 'upload completed' };
    });
    stream.pipe(out);
  } catch (e) {
    console.error(e.message);
    return { message: 'failed to upload the file' };
  }
};

module.exports = {
  processPhoto,
};
