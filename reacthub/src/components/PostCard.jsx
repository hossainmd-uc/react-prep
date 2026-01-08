import React, {useState} from 'react'
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'

import { Button } from './ui/button'
import { supabase } from '../../config'
import { useAuth } from './AuthProvider'

const PostCard = ({ post }) => {

    const [username, setUsername] = useState('')

    const { user } = useAuth()

    async function getUsername() {
        const { data, error } = await supabase.from("profiles").select('username').eq('id', user.id).single()

        if (error){
            console.error("Error retrieving username!", error)
        }

        setUsername(data?.username ?? '')

    }

    useState(() => {
        getUsername()
    }, [])

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
                    <img className='max-w-sm' src={post.image} />
                </CardContent>

                <CardFooter className="justify-between">
                    <CardTitle>from {username}</CardTitle>
                    <div className="justify-end gap-2">
                        <Button variant="outline">View</Button>
                        <Button>Edit</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default PostCard