import React, { useState } from 'react'
import './CardCrewmate.css'
import { Button } from '@mui/material'
import UpdateDialog from './UpdateDialog'

import { supabase } from '../data/config'

const CardCrewmate = ({ crewmateData, removeCrewmate}) => {

    const [dialogOpen, setDialogOpen] = useState(false)


    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return crewmateData && (
        <div className="card">
            <img className="avatar" src="amongus.png" alt="Crewmate" />
            <div className="info">
                <h3>Crewmate</h3>

                <div className="row"><h4>Name:</h4><span>{crewmateData.name}</span></div>
                <div className="row"><h4>Color:</h4><span>{crewmateData.color}</span></div>
                <div className="row"><h4>Speed:</h4><span>{crewmateData.speed}</span></div>

                <Button
                    onClick={() => removeCrewmate(crewmateData.id)}
                    variant="contained"
                    color="error"
                >
                    Remove
                </Button>
                <Button
                    onClick={() => handleDialogOpen()}
                    variant="contained"
                // color="error"
                >
                    Edit
                </Button>

            </div>
            <UpdateDialog data={crewmateData} dialogOpen={dialogOpen} handleDialogOpen={handleDialogOpen} handleDialogClose={handleDialogClose}/>
        </div>
    )

}

export default CardCrewmate