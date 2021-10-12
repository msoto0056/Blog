import Box from '@mui/material/Box';

export const Container = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        py:"5",
        justifyContent:"center",
        // maxWidth: 1024,
        mx: "auto",
      }}
    >
      {children}
    </Box>
  );
};