import React, { useState, useEffect } from 'react'
import { Box, Button, Container, Paper, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

function Recorder({updateAudioText}) {
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    updateAudioText([...savedNotes, note])
    setNote('')
  }
  const handleClear = (note) => {
    if (note === 'curr'){
        let el = document.getElementById("CurrentNotes");
        if (el.innerHTML){
            el.innerHTML = "";
        }
    } else{
        let el = document.getElementById("FinalNotes");
        if (el && el.innerHTML){
            // el.innerHTML = "";
            setSavedNotes([]);
            updateAudioText([]);
        }
        
        
    }
  }
  

  return (
    <>
        <Typography variant='h4' sx={{padding: '3%'}}>Voice Notes</Typography>
        <Grid2 container spacing={2} sx={{display: "flex", justifyContent: "center"}}>
            <Grid2 xs='12' md = '8'>
                
                <Paper elevation={3} sx={{width: '330px', minHeight:'300px'}}>
                    <Typography variant='h6'>Current Note</Typography>
                    {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
                    <Button onClick={handleSaveNote} disabled={!note}>Save Note </Button>
                    <Button onClick={() => setIsListening(prevState => !prevState)}> Start/Stop</Button>
                    <Button onClick={() => handleClear("curr")}>Clear</Button>
                    <div>
                        <Typography id='CurrentNotes' variant='body1'>{note}</Typography>
                    </div>
                    
                </Paper>
                
            </Grid2>
            <Grid2 xs='12' md ='4'>
                <Paper elevation={3} sx={{minWidth: '200px', maxWidth: '200px', minHeight:'300px'}}>
                    <Typography variant='h6'>Notes</Typography>
                    <Button onClick={() => handleClear("final")}>Clear</Button>
                    <div >
                        {/* {savedNotes.map(n => (
                        <Typography  key={n} variant='body1'>{n}</Typography>
                        ))} */}
                        <Typography id='FinalNotes' variant='body1'>
                            {savedNotes.map(n => `${n}. `)}
                            
                        </Typography>
                    </div>
                </Paper>
            </Grid2>
            
        </Grid2>
    </>
  )
}

export default Recorder;