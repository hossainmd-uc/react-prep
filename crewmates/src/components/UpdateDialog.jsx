import React, {useState} from 'react'
import { RadioGroup, FormLabel, FormControlLabel, Radio, Dialog, DialogTitle, DialogContent, Button, DialogContentText, TextField, FormControl, Select, MenuItem, InputLabel } from '@mui/material'

import { colors, speeds } from './CrewmateConstraints'

const UpdateDialog = ({ data, dialogOpen, handleDialogClose }) => {

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

    function onSubmit(e) {
        e.preventDefault();
        // const {}
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
                            defaultValue={name}

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
                    </form>
                </DialogContent>
                <Button onClick={handleDialogClose}>Cancel</Button>
            </Dialog>
        </div>
    )
}

export default UpdateDialog