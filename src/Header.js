import React from 'react';
import { AppBar, Toolbar, Button, IconButton, Badge, Avatar } from '@mui/material';
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
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <StyledButtonContainer>
          <StyledButton disabled>Overview</StyledButton>
          <StyledActiveButton>Expenses</StyledActiveButton>
        </StyledButtonContainer>
        <IconButton>
          <Badge badgeContent={0} color="secondary">
            <StyledAvatar>
              <AccountCircleIcon />
            </StyledAvatar>
          </Badge>
        </IconButton>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
    