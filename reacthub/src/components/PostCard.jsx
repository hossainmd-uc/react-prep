import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'

import { Button } from './ui/button'

const PostCard = ({ post }) => {
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

                <CardFooter className="justify-end gap-2">
                    <Button variant="outline">View</Button>
                    <Button>Edit</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default PostCard