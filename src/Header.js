import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Badge, Avatar, Popover, Typography } from '@mui/material';
import { styled } from '@mui/system';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'default',
  borderBottom: '1px solid',
  borderColor: (theme) => theme.palette.divider,
  boxShadow: 'none',
});

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'center',
});

const StyledButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  flexGrow: 1,
});

const StyledButton = styled(Button)({
  marginRight: (theme) => theme.spacing(2),
  color: 'black',
});

const StyledActiveButton = styled(Button)({
  textDecoration: 'underline',
  color: 'black',
});

const StyledAvatar = styled(Avatar)({
  backgroundColor: (theme) => theme.palette.primary.main,
});


const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'user-popover' : undefined;

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <StyledButtonContainer>
          <StyledButton disabled>Overview</StyledButton>
          <StyledActiveButton>Expenses</StyledActiveButton>
        </StyledButtonContainer>
        <IconButton onClick={handleClick}>
          <Badge badgeContent={0} color="secondary">
            <StyledAvatar>
              <AccountCircleIcon />
            </StyledAvatar>
          </Badge>
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Typography sx={{ p: 2 }}>Account</Typography>
          <Typography sx={{ p: 2 }}>Settings</Typography>
        </Popover>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
