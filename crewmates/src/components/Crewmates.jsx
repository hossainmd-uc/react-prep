import { FormGroup, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import './Crewmates.css'

import { supabase } from '../data/config'


const Crewmates = () => {

    const [name, setName] = useState('')
    const [speed, setSpeed] = useState('')
    const [color, setColor] = useState('')

    async function createPlayer(e) {
        e.preventDefault();
        // console.log(name.length < 10, [10, 15, 20, 25].includes(parseInt(speed)), ['Red', 'Green', 'Orange', 'Yellow'].includes(color))

        if (!(name.length < 10 && [10, 15, 20, 25].includes(parseInt(speed)) &&
            ['Green', 'Orange', 'Yellow', 'Red'].includes(color))) {
            alert('Invalid entries or options submitted!')
            return
        }

        const response = await supabase
            .from('Players')
            .insert({ name: name, color: color, speed: speed })
            .select();

        if (response.error)
            alert(`${response.error.message}`)
        // console.log(response.error)


    }


    return (
        <div className='main-div'>
            <h1>Crewmates</h1>

            <form className='form-inputs' onSubmit={createPlayer}>
                <TextField label='Name' variant='standard' onChange={e => setName(e.target.value)}></TextField>
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
                        <FormControlLabel value='Red' control={<Radio />} label='Red'></FormControlLabel>
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