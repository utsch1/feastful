import { AccountCircle } from '@mui/icons-material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { User } from '../database/users';

type Props = {
  user?: User;
};

function Anchor({ children, ...restProps }) {
  // using a instead of Link since we want to force a full refresh
  return <a {...restProps}>{children}</a>;
}

export default function Header(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ height: '5rem', pl: '3rem', pr: '3rem', boxShadow: 0 }}
    >
      <Toolbar disableGutters={true}>
        <Grid container xs={12} alignItems="center" height="5rem">
          <Grid
            container
            item
            xs={4}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link href="/experiences" underline="none" color="inherit">
              <Typography variant="body">EXPERIENCES</Typography>
            </Link>
          </Grid>
          <Grid
            container
            item
            xs={4}
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            <Link href="/experiences" underline="none" color="inherit">
              <RestaurantMenuIcon />
            </Link>
          </Grid>
          <Grid container item xs={4} justifyContent="center">
            <Box
              component="img"
              sx={{
                width: 150,
                height: 21,
              }}
              src="/logo.png"
              alt="Feastful"
            />
          </Grid>
          <Grid container item xs={4} justifyContent="flex-end">
            <div>
              <IconButton
                size="large"
                aria-label="login and registration"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <div>
                  {props.user ? (
                    <>
                      <Link href="/account">
                        <MenuItem onClick={handleClose}>ACCOUNT</MenuItem>
                      </Link>
                      <Anchor href="/logout">
                        <MenuItem onClick={handleClose}>LOGOUT</MenuItem>
                      </Anchor>
                    </>
                  ) : (
                    <Link href="/login">
                      <MenuItem onClick={handleClose}>LOGIN</MenuItem>
                    </Link>
                  )}
                </div>
              </Menu>
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
