import { useUploadPhoto } from '../hooks/useUploadPhoto';

// render
const UploadImage = ({ id, model }) => {
  const { uploadPhoto } = useUploadPhoto();

  const onInput = ({ target }) => {
    const {
      validity,
      files: [photo],
    } = target;

    const photoData = {
      photo,
      model,
      _id: id,
    };
    if (validity.valid) uploadPhoto(photoData);
  };

  return (
    <form>
      <label htmlFor="imagePicker">Choose a profile picture:</label>

      <input
        type="file"
        id="imagePicker"
        accept="image/jpeg, image/png"
        onInput={onInput}
        required
      />
    </form>
  );
};

export default UploadImage;
