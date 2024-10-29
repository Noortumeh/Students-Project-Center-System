import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import { Box } from '@mui/material';
import ButtonLink from './ButtonLink';
// Icons
import TuneIcon from '@mui/icons-material/Tune';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  // @ts-ignore
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
    top: '64px !important',
  }),
);

export default function Sidebar({ checkIsOpen, open, children }) {
  const handleDrawer = () => {
    checkIsOpen();
  };
  const theme = useTheme();

  return (
    <Box>
      <Drawer variant="permanent" open={open} sx={{
        '& .MuiDrawer-paper': {
          top: '64px',
          // zIndex: 0,
        },
      }}>
        <DrawerHeader>
          <IconButton onClick={handleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {children}
        <Divider />
        <List>
          <ButtonLink name="Settings" link="settings" icon={<TuneIcon />} open={open} />
          <ButtonLink name="Help" link="help" icon={<HelpCenterIcon />} open={open} />
        </List>
      </Drawer>
    </Box>
  );
}
