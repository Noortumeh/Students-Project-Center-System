import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import { Box, useMediaQuery } from '@mui/material';
import ButtonLink from './ButtonLink';
// Icons
import TuneIcon from '@mui/icons-material/Tune';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';


let drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    top: '64px',
    [theme.breakpoints.up('sm')]: {
      width: open ? drawerWidth : `calc(${theme.spacing(8)} + 1px)`,
    },
  },
}));

export default function Sidebar({ checkIsOpen, open, children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  if(isMobile){
    drawerWidth = 50;
  }else{
    drawerWidth = 240;
  }
  const handleDrawer = () => {
    checkIsOpen();
  };
  return (
    <Box>
      <Drawer variant="permanent" open={isMobile ? false : open} sx={{
        '& .MuiDrawer-paper': {
          top: '64px',
        },
      }}>
        {!isMobile && ( // إظهار زر الفتح/الإغلاق فقط في الشاشات الكبيرة
          <DrawerHeader>
            <IconButton onClick={checkIsOpen}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
        )}
        {!isMobile && <Divider />}
        {children}
        <Divider />
        <List>
          <ButtonLink name="Settings" link="settings" icon={<TuneIcon />} open={isMobile ? false : open} />
          <ButtonLink name="Help" link="help" icon={<HelpCenterIcon />} open={isMobile ? false : open} />
        </List>
      </Drawer>
    </Box>
  );
}
