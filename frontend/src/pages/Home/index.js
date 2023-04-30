import { Box, Container, Grid, Typography } from "@mui/material";
import UserForm from "../../components/UserForm";

function HomePage() {
    return (
        <Container sx={{marginTop:'4%'}}>
            <Grid container spacing={2} sx={{display: "flex", justifyContent: "center", alignItems:'center', marginBottom: '10%'}}>
                <Grid item xs='12' md='8'>
                    <Box>
                        <Typography variant="h4">Find Your Favorite Therapist in an Instant!</Typography>
                        <Typography sx={{paddingTop:'20px'}} variant="subtitle1">Dealing with a mental health challenge and not knowing where to start can be overwhelming.
                        TherapyMatch will ease that process by removing all unnecesary complications and user inputs. TherapyMatch requires a simple explanation of your situation and will automatically identify your needs and match you with qualified psychologists to help you</Typography>
                    </Box>
                </Grid>
                <Grid item xs='12' md='4'>
                    <img width={250} src="happy.png"/>
                </Grid>
            </Grid>
            <UserForm />
        </Container>
    );
}

export default HomePage;