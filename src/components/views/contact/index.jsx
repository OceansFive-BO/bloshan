import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import circles from './circles.jsx';
import './contactform.css';

const ContactForm = ({ isLoggedIn, userData }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    subject: '',
  });
  const [errors, setErrors] = useState({});
  const [charCount, setCharCount] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn && userData) {
      setFormData({
        firstname: userData.firstname || '',
        lastname: userData.lastname || '',
        email: userData.email || '',
        subject: '',
      });
    }
  }, [isLoggedIn, userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'subject') {
      setCharCount(value.length);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) {
      newErrors.firstname = 'First name is required.';
    } else if (formData.firstname.length > 60) {
      newErrors.firstname = 'First name cannot exceed 60 characters.';
    }

    if (!formData.lastname.trim()) {
      newErrors.lastname = 'Last name is required.';
    } else if (formData.lastname.length > 60) {
      newErrors.lastname = 'Last name cannot exceed 60 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    } else if (formData.email.length > 60) {
      newErrors.email = 'Email cannot exceed 60 characters.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Message body is required.';
    } else if (formData.subject.length < 50) {
      newErrors.subject = 'Message must be at least 50 characters long.';
    } else if (formData.subject.length > 1000) {
      newErrors.subject = 'Message cannot exceed 1000 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    axios
      .post('/api/contact', formData)
      .then(() => {
        setPopupOpen(true);
        setTimeout(() => setPopupOpen(false), 10000);

        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          subject: '',
        });
        setCharCount(0);
      })
      .catch((error) => {
        console.error('Failed to submit form:', error);
      });
  };

  return (
    <div className="form-background">
      <div className="circles">
        {circles.map((style, index) => (
          <div key={index} className="circle" style={style}></div>
        ))}
      </div>
      <Box
        className="form-overlay"
        sx={{
          zIndex: 0,
          margin: '0 auto',
        }}
      >
        <Box className="form-header" sx={{ textAlign: 'center' }}>
          <Typography
            variant="h4"
            sx={{ color: 'text.primary', marginBottom: 1, fontWeight: '700' }}
            gutterBottom
          >
            Contact Us
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.primary' }}>
            Fill out the form below to get in touch with our library team!
          </Typography>
        </Box>

        <Box className="form-container">
          <Box className="form-group" sx={{ margin: '20px 0' }}>
            <Box
              className="form"
              sx={{
                width: '40%',
                padding: '30px',
                borderRadius: theme.shape.borderRadius,
                backgroundColor: 'background.paper',
              }}
            >
              <form onSubmit={handleSubmit}>
                <Box
                  className="row"
                  sx={{
                    marginBottom: 2,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    className="col-25"
                    sx={{ width: '25%', paddingRight: 2 }}
                  >
                    <Typography
                      htmlFor="firstname"
                      component="label"
                      sx={{ color: 'text.primary', fontWeight: 'bold' }}
                    >
                      First Name
                    </Typography>
                  </Box>
                  <Box className="col-75" sx={{ width: '75%' }}>
                    <TextField
                      id="firstname"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      placeholder="First name.."
                      variant="outlined"
                      fullWidth
                      error={!!errors.firstname}
                      helperText={errors.firstname}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          cursor: 'text',
                        },
                      }}
                    />
                  </Box>
                </Box>

                <Box
                  className="row"
                  sx={{
                    marginBottom: 2,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    className="col-25"
                    sx={{ width: '25%', paddingRight: 2 }}
                  >
                    <Typography
                      htmlFor="lastname"
                      component="label"
                      sx={{ color: 'text.primary', fontWeight: 'bold' }}
                    >
                      Last Name
                    </Typography>
                  </Box>
                  <Box className="col-75" sx={{ width: '75%' }}>
                    <TextField
                      id="lastname"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      placeholder="Last name.."
                      variant="outlined"
                      fullWidth
                      error={!!errors.lastname}
                      helperText={errors.lastname}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          cursor: 'text',
                        },
                      }}
                    />
                  </Box>
                </Box>

                <Box
                  className="row"
                  sx={{
                    marginBottom: 2,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    className="col-25"
                    sx={{ width: '25%', paddingRight: 2 }}
                  >
                    <Typography
                      htmlFor="email"
                      component="label"
                      sx={{ color: 'text.primary', fontWeight: 'bold' }}
                    >
                      Email
                    </Typography>
                  </Box>
                  <Box className="col-75" sx={{ width: '75%' }}>
                    <TextField
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email.."
                      variant="outlined"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          cursor: 'text',
                        },
                      }}
                    />
                  </Box>
                </Box>

                <Box
                  className="row"
                  sx={{
                    marginBottom: 2,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    className="col-25"
                    sx={{ width: '25%', paddingRight: 2 }}
                  >
                    <Typography
                      htmlFor="subject"
                      component="label"
                      sx={{ color: 'text.primary', fontWeight: 'bold' }}
                    >
                      Message
                    </Typography>
                  </Box>
                  <Box className="col-75" sx={{ width: '75%' }}>
                    <TextField
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Tell us more about your needs.."
                      variant="outlined"
                      multiline
                      rows={6}
                      fullWidth
                      error={!!errors.subject}
                      helperText={
                        errors.subject ||
                        (charCount < 50
                          ? `Minimum required characters left: ${50 - charCount}`
                          : 'Minimum reached')
                      }
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          cursor: 'text',
                        },
                      }}
                    />
                  </Box>
                </Box>
                <Box className="row" sx={{ textAlign: 'right', marginTop: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    className="form-submit"
                    sx={{
                      backgroundColor: '#04AA6D',
                      color: 'white',
                      padding: '12px 20px',
                      borderRadius: '4px',
                      '&:hover': {
                        backgroundColor: '#45a049',
                        cursor: 'pointer',
                      },
                    }}
                  >
                    Contact
                  </Button>
                </Box>
              </form>
            </Box>
            <Box className="form-text" sx={{ marginTop: 3 }}>
              <Typography variant="body1">Test</Typography>
              <Typography variant="body1">Another test</Typography>
              <Typography variant="body2">More test content</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Snackbar open={popupOpen} autoHideDuration={10000}>
        <Alert severity="success">
          Thank you for submitting your message! We will respond to you as soon
          as we can.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ContactForm;
