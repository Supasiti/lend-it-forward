import { Box } from '@chakra-ui/react';

const Wave = () => (
  <Box pos="absolute" zIndex={0} top="0" left="0" right="0">
    <svg
      width="100%"
      height="100%"
      id="svg"
      viewBox="0 0 1440 480"
      xmlns="http://www.w3.org/2000/svg"
      className="transition duration-300 ease-in-out delay-150"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="5%" stopColor="#005f73ff"></stop>
          <stop offset="95%" stopColor="#001219ff"></stop>
        </linearGradient>
      </defs>
      <path
        d="
    M -5.0349762e-4,0 
    V 188.31154 
    C 169.5404,320.63963 436.44623,398.59034 720.00002,398.59 1003.5544,398.58989 1270.4603,320.63842 1440.0005,188.30959 
    V 0 Z"
        stroke="none"
        strokeWidth="0"
        fill="url(#gradient)"
        className="transition-all duration-300 ease-in-out delay-150 path-0"
      ></path>
    </svg>
  </Box>
);

export default Wave;
