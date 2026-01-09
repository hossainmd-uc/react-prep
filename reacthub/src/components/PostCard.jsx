import React, { useState } from 'react'
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'

import { Button } from './ui/button'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger, AlertDialogCancel, AlertDialogAction, AlertDialogTitle } from './ui/alert-dialog'

import { supabase } from '../../config'
import { useAuth } from './AuthProvider'
import { useNavigate } from 'react-router-dom'

const PostCard = ({ post, deletePost }) => {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')

    const { user } = useAuth()


    async function getUsername() {
        const { data, error } = await supabase.from("profiles").select('username').eq('id', post.user_id).single()

        if (error) {
            console.error("Error retrieving username!", error)
        }

        setUsername(data?.username ?? '')

    }

    useState(() => {
        getUsername()
    }, [user?.id])

    function goToEdit(){
        navigate(`/edit/${post.id}`)
    }


    return (
        <div className=''>
            <Card>
                <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>

                    <p className="whitespace-pre-wrap leading-relaxed line-clamp-6">
                        {post.body}
                    </p>
                    {/* <img className='max-w-sm' src={post.image} /> */}
                </CardContent>

                <CardFooter className="justify-between">
                    <CardTitle>from {username}</CardTitle>
                    <div className="flex justify-end gap-1">
                        <Button variant="outline">View</Button>

                        {post.user_id == user.id && (<><Button onClick={goToEdit}>Edit</Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant='destructive'>Delete</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>

                                    </AlertDialogHeader>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will delete your comment.
                                    </AlertDialogDescription>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction asChild>
                                            <Button
                                                variant="destructive"
                                                onClick={() => deletePost(post.id)}
                                            >
                                                Continue
                                            </Button>
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </>)}
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default PostCard