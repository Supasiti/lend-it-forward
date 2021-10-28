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
  const [highlight, setHighlight] = useState(false);
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

  // handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    if (disabled) return;
    setHighlight(true);
  };

  // handle drag leave
  const handleDragLeave = () => {
    setHighlight(false);
  };

  // handle when drop file
  const handleDrop = (e) => {
    e.preventDefault();
    if (disabled) return;

    const files = e.dataTransfer.files;
    if (onFilesAdded) {
      const array = fileListToArray(files);
      onFilesAdded(array);
    }
    setHighlight(false);
  };

  return (
    <Box w="100%" h="100%">
      <Center
        {...containerProps(highlight, disabled)}
        onClick={openFileDialog}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
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
