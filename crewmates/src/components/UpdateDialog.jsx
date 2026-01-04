import React, { useState } from 'react'
import { RadioGroup, FormLabel, FormControlLabel, Radio, Dialog, DialogTitle, DialogContent, Button, DialogContentText, TextField, FormControl, Select, MenuItem, InputLabel } from '@mui/material'

import { colors, speeds } from './CrewmateConstraints'

import { supabase } from '../data/config'

const UpdateDialog = ({ setData, data, dialogOpen, handleDialogClose }) => {

    const [open, setOpen] = useState(dialogOpen)
    const [name, setName] = useState(data.name)
    const [speed, setSpeed] = useState(data.speed)
    const [color, setColor] = useState(data.color)

    const handleChange = (event) => {
        setColor(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    async function updateData(id) {

        console.log(data)

        if (!(data.speed === speed && data.color === color && data.name === name)) {
            const { resp, error } = await supabase
                .from('Players')
                .update({ name: name, speed: speed, color: color })
                .eq('id', id)
                .select()

            if (error) {
                throw new Error("Error while updating:\n" + error.message)
            } else {
                setData(prev =>
                    prev.map(c => (c.id === id ? { ...c, name, speed, color } : c))
                )
            }
        } else {
            console.log("Values must not be the same!")
        }

    }

    function onSubmit(e) {
        // console.log('submitting!')
        e.preventDefault();
        // console.log(data.id)
        updateData(data.id)

    }

    return (
        <div>
            {/* <Button> Update </Button> */}
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Update Crewmate</DialogTitle>
                <DialogContent>
                    <DialogContentText>Update name to: </DialogContentText>
                    <form onSubmit={onSubmit}>
                        <TextField
                            required
                            id='name'
                            name='name'
                            label="Crewmate Name"
                            type='text'
                            variant='standard'
                            value={name}
                            onChange={e => setName(e.target.value)}

                        />
                        <FormControl>
                            <RadioGroup value={speed} onChange={e => setSpeed(e.target.value)}>
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
                        <Button type='submit'>Submit</Button>
                    </form>
                </DialogContent>
                <Button onClick={handleDialogClose}>Cancel</Button>

            </Dialog>
        </div>
    )
}

export default UpdateDialog