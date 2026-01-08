import React from 'react'
import { useState } from 'react'

import { Input } from './ui/input'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { supabase } from "../../config"
import { useAuth } from './AuthProvider'

const NewPost = () => {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [image, setImage] = useState('')

    const { user } = useAuth()

    async function createPost(e) {
        e.preventDefault();

        const post = { title, body, image, user_id: user.id }

        const { data, error, status } = await supabase
            .from('posts')
            .insert(post)
            .select('*');

        if (error) {
            console.error("Insert failed:", error.message, error)
        }

        console.log("Status:", status)
        console.log("Insert succeeded:", data)
    }

    return (
        <div>
            <form className='flex flex-col gap-2 max-w-xl m-auto p-4'>
                <Label htmlFor="title">Title</Label>
                <Input onChange={(e) => setTitle(e.target.value)} id='title' type='text' placeholder='What do you want to title?' />
                <Label htmlFor="message">Message</Label>
                <Textarea onChange={(e) => setBody(e.target.value)} htmlFor='message' rows={6} className="resize-none max-h-[12rem] overflow-y-auto" placeholder='What do you want to say?' />
                <Label htmlFor="image">Graphic</Label>
                <Input onChange={(e) => setImage(e.target.value)} id='image' type='text' placeholder='Any External Images?' />
                <Button className='cursor-pointer' onClick={e => createPost(e)}>Create Post</Button>
            </form>
        </div>
    )
}

export default NewPost