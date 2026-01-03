import React, { useEffect, useState } from 'react'
import { supabase } from '../data/config'
import CardCrewmate from './CardCrewmate';

import './ViewCrewmates.css'

const ViewCrewmates = () => {

    const [data, setData] = useState(null)

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

        setData(prev => prev.filter(c => c.id !== id))
    }


    async function getCrewmates() {
        const result = await supabase
            .from('Players')
            .select();

        if (result.error) {
            console.log(result.error.message)
            throw new Error("Unable to fetch data!");

        } else {
            console.log('Sucessfully retrieved data!')
            // console.log(result.data)
            setData(result.data)
        }


    }

    useEffect(() => {

        getCrewmates();

    }, [])

    // useEffect(() => {
    //     if (!data) return;
    //     console.log(Object.fromEntries(Object.entries(data).filter(([_, value]) => value.id !== id)))
    // }, [data])



    return (
        <div className='cards-container'>
            {
                data && data.map((crewmate, i) => {
                    // console.log(crewmate)
                    return <CardCrewmate key={'crewmate ' + i} removeCrewmate={removeCrewmate} crewmateData={crewmate} />
                })
            }
        </div>
    )
}

export default ViewCrewmates