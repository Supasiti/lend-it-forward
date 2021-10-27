import { useUploadPhoto } from '../hooks/useUploadPhoto';

// render
const UploadImage = () => {
  const { uploadPhoto } = useUploadPhoto();

  const onInput = ({ target }) => {
    const {
      validity,
      files: [photo],
    } = target;
    console.log(validity.valid);
    console.log(photo.name);
    if (validity.valid) uploadPhoto(photo);
  };

  return (
    <form>
      <label htmlFor="imagePicker">Choose a profile picture:</label>

      <input
        type="file"
        id="imagePicker"
        accept="image/*"
        onInput={onInput}
        required
      />
    </form>
  );
};

export default UploadImage;
