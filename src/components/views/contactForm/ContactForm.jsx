
import { TextField, Button, Typography, Box } from '@mui/material';
import './contactform.css';

const ContactForm = () => {
    return (
        <Box
            component="form"
            sx={{
                maxWidth: 500,
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                padding: 3,
                borderRadius: 2,
                backgroundColor: 'background.paper',
            }}
        >
            <Typography variant="h4" color="primary" textAlign="center" gutterBottom>
                Contact Us
            </Typography>

            <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                color="primary"
            />

            <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                color="primary"
            />

            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                color="primary"
            />

            <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                type="tel"
                color="primary"
            />

            <TextField
                label="Message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                color="primary"
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                    mt: 2,
                }}
            >
                Submit
            </Button>
        </Box>
    );
};

export default ContactForm;
