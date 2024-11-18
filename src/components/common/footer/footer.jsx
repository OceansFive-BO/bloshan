import React from 'react';
import { Box, IconButton, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import RedditIcon from '@mui/icons-material/Reddit';

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        height: '150px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        top: '50px',
        backgroundColor: 'primary.main',
        color: 'text.primary',
        boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.4)',
      }}
    >
      <Box
        className="footer-content"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '80%',
          margin: '0 auto',
        }}
      >
        <Box
          className="footer-content-container"
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '60%',
            padding: '0 20px',
          }}
        >
          <Box className="footer-content-links">
            <Typography variant="h5" sx={{ margin: '10px 0 5px 0' }}>
              About
            </Typography>
            <Box>
              <Link href="/" color="text.primary" underline="hover">
                Home
              </Link>
            </Box>
          </Box>

          <Box className="footer-content-links">
            <Typography variant="h5" sx={{ margin: '10px 0 5px 0' }}>
              Services
            </Typography>
            <Box>
              <Link href="/profile" color="text.primary" underline="hover">
                Profile
              </Link>
            </Box>
          </Box>

          <Box className="footer-content-links">
            <Typography variant="h5" sx={{ margin: '10px 0 5px 0' }}>
              Support
            </Typography>
            <Box>
              <Link href="/contact" color="text.primary" underline="hover">
                Contact
              </Link>
            </Box>
            <Box>
              <Link href="/tos" color="text.primary" underline="hover">
                Terms of Service
              </Link>
            </Box>
          </Box>
        </Box>
        <Box SX={{ display: 'flex', justifyContent: 'center', width:'70%' }}>
          <Typography
            variant="h5"
            sx={{
              margin: '10px 0',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            Follow Us
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: theme.spacing(1),
            }}
          >
            <IconButton
              aria-label="Facebook"
              href="https://www.facebook.com"
              target="_blank"
              sx={{
                color: 'text.primary',
              }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              aria-label="Twitter"
              href="https://www.twitter.com"
              target="_blank"
              sx={{
                color: 'text.primary',
              }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              aria-label="Instagram"
              href="https://www.instagram.com"
              target="_blank"
              sx={{
                color: 'text.primary',
              }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              aria-label="Pinterest"
              href="https://www.pinterest.com"
              target="_blank"
              sx={{
                color: 'text.primary',
              }}
            >
              <PinterestIcon />
            </IconButton>
            <IconButton
              aria-label="Reddit"
              href="https://www.reddit.com"
              target="_blank"
              sx={{
                color: 'text.primary',
              }}
            >
              <RedditIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box
        className="footer-bottom"
        sx={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          margin: '30px 0 5px 0',
        }}
      >
        <Typography sx={{ bottom: 0 }} variant="body2">
          &copy; 2024 All rights reserved - BookSwap Library Exchange
        </Typography>
      </Box>
    </Box>
  );
}
