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
                    <Typography>Accordion 1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography>Accordion 2</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                    >
                    <Typography>Accordion 3</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                    </AccordionDetails>
                </Accordion>

            </Box>
        </Stack>
    </Container>
     );
}

export default FrequentlyAsked;