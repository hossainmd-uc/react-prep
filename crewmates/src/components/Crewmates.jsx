import { FormGroup, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import './Crewmates.css'


const Crewmates = () => {
    const [name, setName] = useState('')
    const [speed, setSpeed] = useState('')
    const [color, setColor] = useState('')

    function submit(e) {
        e.preventDefault()
        console.log(name)
        console.log(speed)
        console.log(color)
    }

    return (
        <div className='main-div'>
            <h1>Crewmates</h1>

            <form className='form-inputs' onSubmit={submit}>
                <TextField label='Name' variant='standard' onChange={e=> setName(e.target.value)}></TextField>
                <FormControl>
                    <RadioGroup onChange={e => setSpeed(e.target.value)}>
                        <FormLabel id='radio-buttons-speed'>Speed</FormLabel>
                        <FormControlLabel value='10' control={<Radio />} label='10'></FormControlLabel>
                        <FormControlLabel value='15' control={<Radio />} label='15'></FormControlLabel>
                        <FormControlLabel value='20' control={<Radio />} label='20'></FormControlLabel>
                        <FormControlLabel value='25' control={<Radio />} label='25'></FormControlLabel>
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <RadioGroup onChange={e => setColor(e.target.value)}>
                        <FormLabel id='radio-buttons-color'>Color</FormLabel>
                        <FormControlLabel value='Red' control={<Radio />} label='Green'></FormControlLabel>
                        <FormControlLabel value='Orange' control={<Radio />} label='Orange'></FormControlLabel>
                        <FormControlLabel value='Yellow' control={<Radio />} label='Yellow'></FormControlLabel>
                        <FormControlLabel value='Green' control={<Radio />} label='Green'></FormControlLabel>
                    </RadioGroup>
                </FormControl>

                <Button type='submit' color='secondary'>Create Crewmate</Button>
            </form>
        </div >

    )
}

export default Crewmates