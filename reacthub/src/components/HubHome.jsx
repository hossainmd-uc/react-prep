import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const HubHome = () => {

    const navigate = useNavigate();

    function newPost() {
        navigate('/new')
    }

    return (
        <div className='flex w-full  items-center gap-2'>
            <Link to="/view" className="cursor-pointer">
                <h1 className="text-2xl font-semibold leading-none tracking-tight">
                    ReactHub Blog
                </h1>
            </Link>
            <Input type='text' placeholder="Search for a post" />
            <Button className=' cursor-pointer'>Search</Button>

            <Button onClick={newPost} className='cursor-pointer'>New Post</Button>
        </div>
    )
}

export default HubHome