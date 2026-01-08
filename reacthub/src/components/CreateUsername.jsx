import React, { useEffect, useState } from 'react'

import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'

import { supabase } from '../../config'
import { useAuth } from './AuthProvider'
import { useNavigate } from 'react-router-dom'

const CreateUsername = () => {

    const [username, setUsername] = useState('')

    const { user } = useAuth()


    useEffect(() => {
        async function getUsername() {
            const { data, error } = await supabase.from('profiles').select('username').eq('id', user.id)

            if (data[0].username) {
                console.log('There is a pre-existing username.')
            } else {
                console.log("No username set.")
            }
        }
        getUsername()


    }, [user?.id])

    async function changeUsername() {
        console.log(username, username.length)
        if (username.length > 0 && username.length <= 12) {
            const { error } = await supabase.from('profiles').update({ username }).eq('id', user.id)

            if (error) {
                console.error("Error updating username", error)
            }
            console.log("Successfully updated username!")
            // navigate('/createUsername')
        } else {
            alert("Username length must not exceed 12")
        }


    }

    return (
        <div className="max-w-sm mx-auto p-4 space-y-2 text-left">
            <Label htmlFor="username" className="block">
                Username
            </Label>

            <div className="flex gap-2">
                <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Set your username"
                />
                <Button onClick={changeUsername}>Set</Button>
            </div>
        </div>

    )
}

export default CreateUsername