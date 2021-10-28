import { Image, Circle, Box, HStack } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { primaryBtnColorProps } from '../staticProps/button';
import Dropzone from './Dropzone';
import { squareProps, Square } from './Square';
import { useEffect } from 'react';
import { useUploadPhoto } from '../hooks/useUploadPhoto';

// style
const btnProps = {
  ...primaryBtnColorProps,
  size: '12',
};

const btnContainerProps = {
  pos: 'absolute',
  bottom: '2',
  right: '2',
  fontSize: '2xl',
  spacing: '3',
};

const acceptedMimetypes = ['image/jpeg', 'image/png'];

const initialPhotoState = {
  photo: null,
  model: '',
  _id: '',
};

// render
const UploadImage = ({ id, model, imageUrl }) => {
  const [photoState, setPhotoState] = useState(initialPhotoState);
  const [imgSrc, setImgSrc] = useState('');
  const { uploadPhoto, res } = useUploadPhoto();

  console.log(photoState);
  // set image source
  useEffect(() => {
    if (imageUrl) {
      setImgSrc(imageUrl);
    }
  }, [imageUrl]);

  // set photo data to send
  useEffect(() => {
    const newState = {
      ...photoState,
      _id: id ? id : photoState._id,
      model: model ? model : photoState.model,
    };
    setPhotoState(newState);
  }, [id, model]);

  // handle when the photo is uploaded successfully
  useEffect(() => {
    if (res?.success) {
      setImgSrc(res.imageUrl);
      setPhotoState({ ...photoState, photo: null });
    }
  }, [res]);

  // handle when files have been added
  const handleFilesAdded = (files) => {
    if (files.length) {
      const objectUrl = URL.createObjectURL(files[0]);
      setImgSrc(objectUrl);
      setPhotoState({ ...photoState, photo: files[0] });
    }
  };

  // handle remove from staging
  const handleRemoveFilesFromStaging = () => {
    if (photoState.photo) {
      setImgSrc('');
      setPhotoState({ ...photoState, photo: null });
    }
  };

  // handle when user saves the photo
  const handleUpload = () => {
    if (!photoState.photo) return;

    if (!acceptedMimetypes.includes(photoState.photo.type)) {
      return; // will need to handle this later
    }

    uploadPhoto(photoState);
  };

  return (
    <Box {...squareProps}>
      {/* image or dropzone */}
      <Square>
        {imgSrc ? (
          <Image h="100%" objectFit="cover" src={imgSrc} />
        ) : (
          <Dropzone
            accept="image/jpeg image/png"
            onFilesAdded={handleFilesAdded}
          />
        )}
      </Square>

      {/* save button */}
      {photoState.photo && (
        <HStack {...btnContainerProps}>
          <Circle {...btnProps} onClick={handleUpload}>
            <FontAwesomeIcon icon="save" size="1x" />
          </Circle>

          <Circle {...btnProps} onClick={handleRemoveFilesFromStaging}>
            <DeleteIcon w="6" h="6" />
          </Circle>
        </HStack>
      )}
    </Box>
  );
};

export default UploadImage;
