import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function FloatingAddButton() {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 }, position: 'absolute', bottom: 50, right: 50 }}>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Box>
  );
}