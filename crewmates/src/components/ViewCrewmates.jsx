import React, { useEffect, useState } from 'react'
import { supabase } from '../data/config'
import CardCrewmate from './CardCrewmate';

const ViewCrewmates = () => {

    const [data, setData] = useState(null)



    useEffect(() => {

        async function getCrewmates() {
            const result = await supabase
                .from('Players')
                .select();

            if (result.error) {
                console.log(result.error.message)
                throw new Error("Unable to fetch data!");
                
            } else {
                console.log('Sucessfully retrieved data!')
                console.log(result.data)
                setData(result.data)
            }

        }

        getCrewmates();
    }, [])

    return (
        <div className='cards-container'>
            {
                data && data.map((crewmate, i) => {
                   return <CardCrewmate key={'crewmate' + i} crewmateData={crewmate} />
                })
            }
        </div>
    )
}

export default ViewCrewmates