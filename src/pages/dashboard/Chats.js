import { Box, IconButton, Stack, Typography, InputBase, Button, Divider, Avatar, Badge } from '@mui/material';
import { ArchiveBox, CircleDashed, MagnifyingGlass } from 'phosphor-react';
import { styled, alpha,useTheme } from '@mui/material/styles';
import React from 'react';
import { faker } from '@faker-js/faker';
import { ChatList } from '../../data';
import { SimpleBarStyle } from '../../components/Scrollbar';
// import SimpleBarReact from 'simplebar-react';



// StyledBadge Component
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));


// ChatElement Component
const ChatElement = ({ id, name, img, msg, time, unread, online }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.mode==="light" ? "#fff" : theme.palette.background.default,
        padding: 1.5,
        boxSizing: 'border-box', // Ensure padding and borders are included in total width/height
        overflow: 'hidden', // Handle overflow
      }}
    >
      <Stack 
        direction="row"
        alignItems='center' 
        justifyContent='space-between'
        spacing={2}
      >
        <Stack direction="row" spacing={2}>
          {online ? (
            <StyledBadge 
              overlap='circular'
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar src={img || faker.image.avatar()} />
            </StyledBadge>
          ) : (
            <Avatar src={img || faker.image.avatar()} />
          )}

          <Stack spacing={0.5}>
            <Typography 
              variant='subtitle2'
              sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} // Handle overflow
            >
              {name}
            </Typography>
            <Typography 
              variant='caption'
              sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} // Handle overflow
            >
              {msg}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={1} alignItems="center">
          <Typography 
            sx={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} // Handle overflow
            variant='caption'
          >
            {time}
          </Typography>
          {unread > 0 && (
            <Badge color='primary' badgeContent={unread} />
          )}
        </Stack>
      </Stack>
    </Box> 
  );
}

// Search Component
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.background.default, 1),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

// SearchIconWrapper Component
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

// StyledInputBase Component
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

// Chats Component
const Chats = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "relative",
        width: 320,
        backgroundColor:theme.palette.mode ==="light" ? "#F8FAFF": theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
      }}
    >
      <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
        <Stack
          direction="row"
          alignItems={'center'}
          justifyContent="space-between"
        >
          <Typography variant='h5'>
            Chats
          </Typography>
          <IconButton>
            <CircleDashed />
          </IconButton>
        </Stack>
        <Stack sx={{ width: "100%" }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color='#709CE6' />
            </SearchIconWrapper>
            <StyledInputBase placeholder='Search...' />
          </Search>
        </Stack>
        <Stack spacing={1}>
          <Stack direction="row" alignItems={"center"} spacing={1.5}>
            <ArchiveBox size={24} />
            <Button>Archive</Button>
          </Stack>
          <Divider />
        </Stack>


        <Stack 
          spacing={2}
          direction="column" 
          sx={{ flexGrow: 1, overflow: "scroll", height: "100%" }}
        >
          <SimpleBarStyle timeout={500} clickOnTrack={false}>
            <Stack spacing={2.4}>
              <Typography variant='subtitle2' sx={{ color: "#676767" }}>
                Pinned
              </Typography>
              {ChatList.filter((el) => el.pinned).map((el) => (
                <ChatElement {...el} />
              ))}
            </Stack>
            <Stack spacing={2.4}>
              <Typography variant='subtitle2' sx={{ color: "#676767" }}>
                All Chats
              </Typography>
              {ChatList.filter((el) => !el.pinned).map((el) => (
                <ChatElement {...el} />
              ))}
            </Stack>
          </SimpleBarStyle>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Chats;




