import { Box, Input, Center } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef } from 'react';

// style
const containerProps = (highlight, disabled) => ({
  w: '100%',
  h: '100%',
  bg: highlight ? 'lagoon' : 'gunmetal',
  color: 'sidecar',
  fontSize: '3xl',
  opacity: '0.4',
  p: '3',
  cursor: disabled ? 'default' : 'pointer',
  _hover: {
    bg: 'lagoon',
  },
});

const contentProps = {
  w: '100%',
  h: '100%',
  rounded: 'xl',
  border: '2px',
  borderStyle: 'dashed',
};

// convert file list to array
const fileListToArray = (files) => {
  const array = [];
  for (let i = 0; i < files.length; i++) {
    array.push(files.item(i));
  }
  return array;
};

//render
const Dropzone = ({ onFilesAdded, accept, disabled = false }) => {
  const [highlight] = useState(false);
  const fileInputRef = useRef(null);

  // when clicked it should open a filt dialog
  const openFileDialog = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  // handle when files are added
  const handleFilesAdded = (e) => {
    if (disabled) return;
    const files = e.target.files;
    if (onFilesAdded) {
      const array = fileListToArray(files);
      onFilesAdded(array);
    }
  };

  return (
    <Box w="100%" h="100%">
      <Center {...containerProps(highlight, disabled)} onClick={openFileDialog}>
        <Center {...contentProps}>
          <FontAwesomeIcon icon="camera" size="3x" />
        </Center>
      </Center>

      <Input
        ref={fileInputRef}
        display="none"
        type="file"
        accept={accept}
        onChange={handleFilesAdded}
        required
      />
    </Box>
  );
};

export default Dropzone;
