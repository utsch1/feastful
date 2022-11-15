import { css } from '@emotion/react';
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
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { User } from '../database/users';

type Props = {
  user?: User;
};

const navigationStyles = css`
  width: 100%;
  height: 5rem;
  background-color: #e7dcda;
  color: #000000;
  position: fixed;
  z-index: 1;
  padding: 0 3rem;
  margin-bottom: 0 0 1.5rem 0;
  display: flex;
  justify-content: space-between;

  > div {
    align-self: center;
    flex: 1;
  }

  > div > a {
    text-decoration: none;
    color: #000000;
  }
`;

const logo = css`
  text-align: center;
`;

const dropdown = css`
  position: relative;
  display: block;
  cursor: pointer;
  text-align: end;

  :hover > div {
    display: block;
  }
`;

const dropdownContent = css`
  display: none;
  position: absolute;
  background-color: #e7dcda;
  min-width: 12rem;
  padding: 1rem;
  z-index: 1;
  right: 0.1rem;
  border: 1px solid #000;
  text-align: center;

  > hr {
    border: 0.5px solid #000;
  }

  > div > a {
    text-decoration: none;
    color: #000;
  }
`;

export default function Header(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

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
                      <Link href="/logout">
                        <MenuItem onClick={handleClose}>LOGOUT</MenuItem>
                      </Link>
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

    // <header>
    //   <nav css={navigationStyles}>
    //     <div>
    //       <Link href="/experiences">
    //         <a data-test-id="experiences">EXPERIENCES</a>
    //       </Link>
    //     </div>
    //     <div css={logo}>
    //       <Image src="/logo.png" alt="Feastful" width="150" height="21" />
    //     </div>
    //     <div css={dropdown}>
    //       <Image
    //         src="/login.png"
    //         alt="Icon for login and registration"
    //         width="21"
    //         height="21"
    //       />
    // <div css={dropdownContent}>
    // {props.user ? (
    //   <>
    //     <div>
    //       <Link href="/account">
    //         <a>ACCOUNT</a>
    //       </Link>
    //     </div>
    //     <hr />
    //     <div>
    //       <Link href="/logout">LOGOUT</Link>
    //     </div>
    //   </>
    // ) : (
    //   <div>
    //     <Link href="/login">
    //       <a>LOGIN / REGISTER</a>
    //     </Link>
    //   </div>
    // )}
    // </div>
    //     </div>
    //   </nav>
    // </header>
  );
}
