import { useBlogState} from '../../context/blogs/BlogStore';
//MaterialUI
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';


const theme = createTheme();

export default function Post() {
  const [{blog},] = useBlogState();

	return (
        <ThemeProvider theme={theme}>
		<Container component="main" maxWidth="md">
			<CssBaseline />
            <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
			<Container maxWidth="sm">
				<Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                >
                    {blog.title}
                </Typography>
                <Typography
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    paragraph
                >
                    {blog.excerpt}
                </Typography>
            </Container>
            <Button href="/" variant={"outlined"}  size="small" 
                startIcon={<UndoOutlinedIcon/>}>
                    {" "}
                    Return{" "}
            </Button>
        </Box>
		</Container>
    </ThemeProvider>
	);
}