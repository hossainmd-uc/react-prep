import React from 'react'
import './CardCrewmate.css'
import { Button } from '@mui/material'

import { supabase } from '../data/config'

const CardCrewmate = ({ crewmateData }) => {

    async function removeCrewmate(id) {
        if (id == null) {
            throw new Error("removeCrewmate called without a valid id");
        }

        const response = await supabase
            .from('Players')
            .delete()
            .eq('id', id)

        if (response.error) {
            throw error;
        }


    }

    return crewmateData?.length > 0 ? (
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
            </div>
        </div>
    ) : <h1> Add crewmates !</h1>;

}

export default CardCrewmate