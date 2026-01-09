import React, { useEffect } from 'react'
import { useState } from 'react'

import { CheckCircle2Icon } from 'lucide-react'
import { Alert, AlertTitle } from './ui/alert'

import { Input } from './ui/input'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { supabase } from "../../config"

import { useAuth } from './AuthProvider'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const NewPost = () => {

    const navigate = useNavigate()

    const [showSuccess, setShowSuccess] = useState(false)

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [image, setImage] = useState('')

    const { user } = useAuth()

    const params = useParams()
    const id = params?.id

    async function retrievePosts() {
        const postId = Number(id)
        if (!Number.isFinite(postId)) return

        // must be logged in to edit
        if (!user) {
            navigate("/login") // or wherever
            return
        }

        const { data, error } = await supabase
            .from("posts")
            .select("*")
            .eq("id", postId)
            .single()

        if (error) {
            console.error("Retrieval failed:", error.message, error)
            return
        }

        // owner check
        if (data.user_id !== user.id) {
            navigate(`/view/${postId}`) // bounce them out
            return
        }

        setTitle(data.title)
        setBody(data.body)
        setImage(data.image)


    }

    useEffect(() => {
        retrievePosts()
    }
        , [id])


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

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2500);
    }

    async function updatePost(e) {
        e.preventDefault();

        const post = { title, body, image, user_id: user.id }

        const { data, error, status } = await supabase
            .from('posts')
            .update(post)
            .eq("id", id)
            .eq("user_id", user.id) // extra safety even before RLS
            .select();

        if (error) {
            console.error("Update failed:", error.message, error)
        }

        console.log("Status:", status)
        console.log("Update succeeded:", data)

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2500);
    }

    return (
        <div>
            <form className='flex flex-col gap-2 max-w-xl m-auto p-4'>
                {showSuccess && (
                    <Alert>
                        <CheckCircle2Icon />
                        <AlertTitle>{id ? 'Success! Your changes have been saved' : 'Success! Post created!'}</AlertTitle>
                    </Alert>)}
                <Label htmlFor="title">Title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} id='title' type='text' placeholder='What do you want to title?' />
                <Label htmlFor="message">Message</Label>
                <Textarea value={body} onChange={(e) => setBody(e.target.value)} htmlFor='message' rows={6} className="resize-none max-h-[12rem] overflow-y-auto" placeholder='What do you want to say?' />
                <Label htmlFor="image">Graphic</Label>
                <Input value={image} onChange={(e) => setImage(e.target.value)} id='image' type='text' placeholder='Any External Images?' />
                <Button className='cursor-pointer' onClick={e => id ? updatePost(e) : createPost(e)}>{id ? 'Confirm Edits' : 'Create Post'}</Button>
            </form>
        </div>
    )
}

export default NewPost