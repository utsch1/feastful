import AccountCircle from '@mui/icons-material/AccountCircle';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { css } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { User } from '../database/users';

type Props = {
  user?: User;
};

const anchorStyles = css`
  text-decoration: none;
  color: #000;
`;

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
              <Typography>EXPERIENCES</Typography>
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
                      <Anchor href="/logout" css={anchorStyles}>
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
