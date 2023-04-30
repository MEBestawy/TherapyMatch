import React, { useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper
} from '@mui/material';
import Recorder from './Recorder';
import axios from 'axios';

const UserForm = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [situation, setSituation] = useState('');
  const [audioText, setAudioText] = useState('');
  const [inputType, setInputType] = useState('text');
  const [therapists, setTherapists] = useState([]);

  const [waiting, setWaiting] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleAudioChange = (lst) => {
    let text = '';
    lst.forEach((s) => {
      text += `${s}. `
    })
    setAudioText(text);
  }
  const submitForm = async () => {
    let notes = '';
    if(inputType==='text'){
      notes = situation;
    } else{
      notes = audioText;
    }
    try{
      const response = await axios.post(
        `http://127.0.0.1:5000/submit`,
        {
          address,
          notes
        }
      );
      
      setTherapists(response.data.therapists);
      console.log("submit-response:", therapists);
      setWaiting(false);
    }
    catch(error){
      console.log("SubmitErr", error)
    }
    
  };
  const handleSubmit = (event) => {
    setSubmitted(true);
    setWaiting(true);
    console.log("audio:", audioText)
    event.preventDefault();
    
    submitForm();
    

    // Handle form submission and call backend API
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" sx={{padding: "5%"}}>
        Psychotherapist Finder
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contact"
              fullWidth
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              fullWidth
              value={address}
              onChange={(e) => {
                console.log(e.target.value);
                setAddress(e.target.value)}}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Input Type</FormLabel>
              <RadioGroup
                row
                value={inputType}
                onChange={(e) => setInputType(e.target.value)}
              >
                <FormControlLabel
                  value="text"
                  control={<Radio />}
                  label="Text"
                />
                <FormControlLabel
                  value="voicemail"
                  control={<Radio />}
                  label="Voicemail"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {inputType === 'text' ? (
              <TextField
                label="Situation"
                multiline
                fullWidth
                rows={4}
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
              />
            ) : (
              <Recorder updateAudioText = {handleAudioChange }></Recorder>
            )}
          </Grid>
          <Grid item xs={12}>
            {
              waiting && submitted 
              ? 
              <Button loading variant="outlined" sx={{marginBottom:'10%'}} fullWidth>
                {`Finding Therapists `}<CircularProgress size='1rem'></CircularProgress>
              </Button>
              :
              <Button variant="contained" color="primary" type="submit" sx={{marginBottom:'10%'}} fullWidth>
                Find Psychotherapist
              </Button>
            }
          </Grid>
        </Grid>
      </form>
      {submitted && 
      <>
        <Typography variant='h6'>Therapists</Typography>
        <Paper elevation={3} sx={{margin: '5%'}}>
          <List>
              {therapists.map((therapist, index) =>{
                return (<>
                  <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={therapist[1]}
                      secondary={`Contact: ${therapist[2]} - Address: ${therapist[4]}`}
                    />
                  </ListItem>
                  {index<therapists.length-1 && <Divider />}
                </React.Fragment>
                </>)
              })}
          </List>
        </Paper>



      </>}
        
    </Container>
  );
};

export default UserForm;
