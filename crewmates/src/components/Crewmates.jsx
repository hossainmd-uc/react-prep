import { FormGroup, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Button, InputLabel, Select, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import './Crewmates.css'

import { supabase } from '../data/config'


const Crewmates = () => {

    const [name, setName] = useState('')
    const [speed, setSpeed] = useState('')
    const [color, setColor] = useState('')
    const [open, setOpen] = useState(false);


    const colors = ["Black",
        "White",
        "Gray",
        "Silver",
        "Charcoal",
        "Navy",
        "Blue",
        "Sky blue",
        "Teal",
        "Turquoise",
        "Green",
        "Lime",
        "Olive",
        "Yellow",
        "Gold",
        "Orange",
        "Coral",
        "Red",
        "Maroon",
        "Pink",
        "Magenta",
        "Purple",
        "Violet",
        "Lavender",
        "Brown",
        "Tan",
        "Beige",
        "Cream"]


    const handleChange = (event) => {
        setColor(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    async function createPlayer(e) {
        e.preventDefault();

        console.log()

        if (!(name.length < 15 && [10, 15, 20, 25].includes(parseInt(speed)) &&
            colors.includes(color))) {
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
                    <InputLabel id='select-label'></InputLabel>
                    <Select className='color-selection' labelId="select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={color}
                        label="Age"
                        onChange={handleChange}>
                        {colors.map((color, i) => {
                            return (
                                <MenuItem value={color}>{color}</MenuItem>
                            )
                        })}

                    </Select>

                </FormControl>

                <Button type='submit' color='secondary'>Create Crewmate</Button>
            </form>
        </div >

    )
}

export default Crewmates