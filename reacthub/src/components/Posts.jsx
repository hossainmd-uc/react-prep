import { supabase } from '../../config'
import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'

const Posts = () => {

    const [data, setData] = useState([])

    async function retrivePosts() {

        const { data, error } = await supabase.from('posts').select('*')

        if (error) {
            console.error("Retrieval failed:", error.message, error)
        }

        console.log("Retrieval Succeeded: ", data)
        setData(data)

    }

    useEffect(() => {
        retrivePosts()
    }, [])

    return (
        <div className='flex flex-col gap-2 text-left m-5'>
            <h1>Posts</h1>
            {data && data.map(post => {
                return <PostCard key={post.id} post={post} />
            })}
        </div>
    )
}

export default Posts