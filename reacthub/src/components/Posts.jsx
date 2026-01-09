import { supabase } from '../../config'
import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'

import { Skeleton } from "./ui/skeleton"



const Posts = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  async function deletePost(id) {
    const { error } = await supabase.from('posts').delete().eq('id', id)

    if (error) {
      console.error("Error deleting.", error)
      return
    }

    retrivePosts()
  }

  async function retrivePosts() {
    setLoading(true)

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error("Retrieval failed:", error.message, error)
      setLoading(false)
      return
    }

    setData(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    retrivePosts()
  }, [])

  return (
    <div className='flex flex-col gap-2 text-left m-5'>
      <h1>Posts</h1>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-lg border p-4 space-y-3">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-20" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        data?.map((post) => (
          <PostCard deletePost={deletePost} key={post.id} post={post} />
        ))
      )}
    </div>
  )
}

export default Posts
