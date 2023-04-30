import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function FrequentlyAsked() {
    return (
    <Container sx={{display: 'flex', justifyContent: 'center'}}>
        <Stack>
            <Typography variant="h4" sx={{padding: "10%"}}>Frequently Asked Questions</Typography>

            
            <Box sx={{maxWidth: "550px", margin: '5%'}}>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>What is Therapy Match?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Therapy Match is a website that gives the user the freedom
                        to describe what they are going through either by text or speech.

                        This diagnosis can then be used to generate an accurate report about 
                        the patient allowing for the patient to be matched to the right
                        therapist for them.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography>Who can use Therapy Match?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Anyone can use the app.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                    >
                    <Typography>Why a therapist?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        If you are facing any mental, emotional, or behavioral issues, a therapist
                        can help you. A therapist can offer you a safe and confidential space where
                        you can talk, cope, change, learn, and grow.
                    </Typography>
                    </AccordionDetails>
                </Accordion>

            </Box>
        </Stack>
    </Container>
     );
}

export default FrequentlyAsked;