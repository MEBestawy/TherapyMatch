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

const UserForm = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [situation, setSituation] = useState('');
  const [inputType, setInputType] = useState('text');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission and call backend API
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center">
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
              <Button variant="contained" component="label">
                Upload Voicemail
                <input type="file" hidden accept="audio/*" />
              </Button>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Find Psychotherapist
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UserForm;
