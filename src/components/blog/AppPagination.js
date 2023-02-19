import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';

const pageSize = 3;

export default function AppPagination() {
    
  const [pagination, setPagination] = useState({
        count:0,
        from:0,
        to: pageSize 
    });

  return (
    <Box justifyContent={"center"} alignItems = "center" display={"flex"}
      sx={{
        margin: " 20px 0 px"
      }}
    >
      <Pagination count={3} />
    </Box>
  )
}

