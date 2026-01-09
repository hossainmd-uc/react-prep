import React, { useEffect, useRef, useState } from 'react'
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialogTitle
} from './ui/alert-dialog'

import { supabase } from '../../config'
import { useAuth } from './AuthProvider'
import { useNavigate } from 'react-router-dom'
import { Skeleton } from './ui/skeleton'

const PostCard = ({ post, deletePost }) => {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)

    const { user } = useAuth()

    // NEW: control dialog open + suppress click-through
    const [dialogOpen, setDialogOpen] = useState(false)
    const suppressNextCardClickRef = useRef(false)

    async function getUsername() {
        setLoading(true)
        const { data, error } = await supabase
            .from("profiles")
            .select('username')
            .eq('id', post.user_id)
            .single()

        if (error) console.error("Error retrieving username!", error)

        setUsername(data?.username ?? '')
        setLoading(false)
    }

    // FIX: this should be useEffect, and depend on post.user_id
    useEffect(() => {
        getUsername()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post.user_id])

    function goToEdit(e) {
        e.stopPropagation()
        navigate(`/edit/${post.id}`)
    }

    const handleCardClick = () => {
        if (dialogOpen) return
        if (suppressNextCardClickRef.current) {
            suppressNextCardClickRef.current = false
            return
        }
        navigate(`/view/${post.id}`)
    }

    const handleDialogOpenChange = (open) => {
        // If the dialog is closing (including overlay click), suppress the next card click
        if (!open) {
            suppressNextCardClickRef.current = true
            setTimeout(() => {
                suppressNextCardClickRef.current = false
            }, 0)
        }
        setDialogOpen(open)
    }

    return (
        <div className=''>
            <Card
                role="button"
                tabIndex={0}
                onClick={handleCardClick}
                onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
                className="cursor-pointer transition hover:shadow-md"
            >
                <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>

                <CardContent>
                    <p className="whitespace-pre-wrap leading-relaxed line-clamp-6">
                        {post.body}
                    </p>
                </CardContent>

                <CardFooter className="justify-between">
                    {loading ? (
                        <Skeleton className="h-4 w-24" />
                    ) : (
                        <CardTitle>from {username}</CardTitle>
                    )}

                    <div className="flex justify-end gap-1">
                        <Button
                            variant="outline"
                            onClick={(e) => {
                                e.stopPropagation()
                                navigate(`/view/${post.id}`)
                            }}
                        >
                            View
                        </Button>

                        {post.user_id == user?.id && (
                            <>
                                <Button onClick={goToEdit}>Edit</Button>

                                <AlertDialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            onClick={(e) => e.stopPropagation()}
                                            variant='destructive'
                                        >
                                            Delete
                                        </Button>
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
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        deletePost(post.id)
                                                    }}
                                                >
                                                    Continue
                                                </Button>
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default PostCard
