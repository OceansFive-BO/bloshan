// src/components/TOS.jsx
import { Container, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import './tos.css';

const TOS = () => {
    const theme = useTheme();

    return (
        <Container
            maxWidth="md"
            className="terms-container"
            sx={{ bgcolor: 'background.default', borderRadius: 1}}
        >
            <Typography
                variant="h4"
                color="primary"
                align="center"
                gutterBottom
                sx={{ textShadow: theme.customShadows.primaryText }}
            >
                Terms of Service and User Agreement
            </Typography>

            <Box className="terms-section">
                <Typography
                    variant="h5"
                    color="secondary"
                    align="left"
                    gutterBottom
                    sx={{ textShadow: theme.customShadows.secondaryText }}
                >
                    1. Introduction
                </Typography>
                <Typography variant="body1" color="text.primary" align="left">
                    Welcome to our book-sharing library! By using this platform, you agree to the following terms and conditions. Please read these carefully.
                </Typography>
            </Box>

            <Box className="terms-section">
                <Typography
                    variant="h5"
                    color="secondary"
                    align="left"
                    gutterBottom
                    sx={{ textShadow: theme.customShadows.secondaryText }}
                >
                    2. Eligibility
                </Typography>
                <Typography variant="body1" color="text.primary" align="left">
                    To use this platform, you must be at least 18 years old. By signing up, you confirm that you meet this age requirement.
                </Typography>
            </Box>

            <Box className="terms-section">
                <Typography
                    variant="h5"
                    color="secondary"
                    align="left"
                    gutterBottom
                    sx={{ textShadow: theme.customShadows.secondaryText }}
                >
                    3. User Responsibilities
                </Typography>
                <Typography variant="body1" color="text.primary" align="left">
                    You are responsible for the books you lend or borrow. Please treat all borrowed materials with care, and return them as agreed with the owner.
                </Typography>
            </Box>

            <Box className="terms-section">
                <Typography
                    variant="h5"
                    color="secondary"
                    align="left"
                    gutterBottom
                    sx={{ textShadow: theme.customShadows.secondaryText }}
                >
                    4. Liability and Disputes
                </Typography>
                <Typography variant="body1" color="text.primary" align="left">
                    Our platform is not liable for damages, losses, or disputes arising from book exchanges. Users are encouraged to resolve issues directly.
                </Typography>
            </Box>

            <Box className="terms-section">
                <Typography
                    variant="h5"
                    color="secondary"
                    align="left"
                    gutterBottom
                    sx={{ textShadow: theme.customShadows.secondaryText }}
                >
                    5. Amendments
                </Typography>
                <Typography variant="body1" color="text.primary" align="left">
                    We may update these terms from time to time. Notice of changes will be posted on our site, and continued use of the platform indicates acceptance of updates.
                </Typography>
            </Box>

            <Typography
                variant="body2"
                color="info.main"
                align="center"
                className="terms-date"
                gutterBottom
                sx={{ marginBottom: theme.spacing(2) }}
            >
                Last Updated: November 14, 2024
            </Typography>

            <Typography
                variant="body1"
                color="accent.main"
                align="center"
                className="terms-footer"
                gutterBottom
            >
                Thank you for joining our community! We hope you enjoy connecting with other book lovers and finding new reads.
            </Typography>
        </Container>
    );
};

export default TOS;
