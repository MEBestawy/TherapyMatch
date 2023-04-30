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
        `http://localhost:5000/submit`,
        {
          name,
          contact,
          address,
          notes
        }
      );
      console.log("submit-response:", response);
    }
    catch(error){
      console.log("SubmitErr", error)
    }
    
  };
  const handleSubmit = (event) => {
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
              onChange={(e) => setAddress(e.target.value)}
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
            <Button variant="contained" color="primary" type="submit" sx={{marginBottom:'10%'}} fullWidth>
              Find Psychotherapist
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UserForm;
