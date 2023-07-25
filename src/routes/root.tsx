import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button component={Link} to="" sx={{ color: '#fff' }}>
                Vaa Inspector
            </Button>
            <Button component={Link} to="parser-editor" sx={{ color: '#fff' }}>
                Parser Editor 
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" flexGrow={1} px={1}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}