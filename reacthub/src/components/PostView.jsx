import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { supabase } from "../../config"
import { useAuth } from "./AuthProvider"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import { Heart } from "lucide-react"

function formatDate(isoString) {
  if (!isoString) return ""
  const d = new Date(isoString)
  if (Number.isNaN(d.getTime())) return isoString
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d)
}

export default function PostView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const postId = useMemo(() => Number(id), [id])

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Like UI state
  const [likeCount, setLikeCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [likeLoading, setLikeLoading] = useState(false)

  // COMMENTS state
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [commentsError, setCommentsError] = useState("")
  const [comments, setComments] = useState([]) // flat list from DB
  const [newCommentBody, setNewCommentBody] = useState("")
  const [postingComment, setPostingComment] = useState(false)

  const [replyToId, setReplyToId] = useState(null) // comment id you are replying to
  const [replyBody, setReplyBody] = useState("")
  const [postingReply, setPostingReply] = useState(false)

  const { user } = useAuth()
  const isOwner = user?.id && post?.user_id && user.id === post.user_id

  // Fetch post (includes like_count)
  useEffect(() => {
    if (!Number.isFinite(postId)) {
      setError("Invalid post id.")
      setLoading(false)
      return
    }

    let cancelled = false

    async function fetchPost() {
      setLoading(true)
      setError("")

      const { data, error } = await supabase
        .from("posts")
        .select("id, created_at, title, body, image, user_id, like_count")
        .eq("id", postId)
        .single()

      if (cancelled) return

      if (error) {
        setError(error.message || "Failed to load post.")
        setPost(null)
        setLikeCount(0)
      } else {
        setPost(data)
        setLikeCount(Number(data.like_count ?? 0))
      }

      setLoading(false)
    }

    fetchPost()
    return () => {
      cancelled = true
    }
  }, [postId])

  // Fetch whether THIS user liked THIS post
  useEffect(() => {
    if (!Number.isFinite(postId)) return
    if (!user?.id) {
      setLiked(false)
      return
    }

    let cancelled = false

    async function fetchLiked() {
      const { data, error } = await supabase
        .from("post_likes")
        .select("post_id")
        .eq("post_id", postId)
        .eq("user_id", user.id)
        .maybeSingle()

      if (cancelled) return
      if (error) {
        console.error("Like status fetch failed:", error.message, error)
        setLiked(false)
        return
      }

      setLiked(Boolean(data))
    }

    fetchLiked()
    return () => {
      cancelled = true
    }
  }, [postId, user?.id])

  async function toggleLike() {
    if (!user?.id) {
      navigate("/login")
      return
    }
    if (!Number.isFinite(postId)) return
    if (likeLoading) return

    setLikeLoading(true)

    const nextLiked = !liked
    setLiked(nextLiked)
    setLikeCount((c) => Math.max(0, c + (nextLiked ? 1 : -1)))

    try {
      if (nextLiked) {
        const { error } = await supabase.from("post_likes").insert({
          post_id: postId,
          user_id: user.id,
        })
        if (error) throw error
      } else {
        const { error } = await supabase
          .from("post_likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id)
        if (error) throw error
      }

      const { data, error } = await supabase
        .from("posts")
        .select("like_count")
        .eq("id", postId)
        .single()

      if (!error && data) setLikeCount(Number(data.like_count ?? 0))
    } catch (e) {
      console.error("Toggle like failed:", e?.message ?? e, e)
      setLiked(liked)
      setLikeCount((c) => Math.max(0, c + (liked ? 1 : -1)))
    } finally {
      setLikeLoading(false)
    }
  }

  // --- COMMENTS: fetch all comments for this post (flat list) ---
  async function fetchComments() {
    if (!Number.isFinite(postId)) return
    setCommentsLoading(true)
    setCommentsError("")

    const { data, error } = await supabase
      .from("comments")
      .select("id, created_at, post_id, user_id, parent_id, body")
      .eq("post_id", postId)
      .order("created_at", { ascending: true })

    if (error) {
      setCommentsError(error.message || "Failed to load comments.")
      setComments([])
    } else {
      setComments(data ?? [])
    }

    setCommentsLoading(false)
  }

  useEffect(() => {
    fetchComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId])

  // Build a simple 2-level nested structure
  const topLevelComments = comments.filter((c) => c.parent_id === null)
  const repliesByParent = comments.reduce((acc, c) => {
    if (c.parent_id != null) {
      acc[c.parent_id] = acc[c.parent_id] ? [...acc[c.parent_id], c] : [c]
    }
    return acc
  }, {})

  async function submitComment(e) {
    e.preventDefault()
    if (!user?.id) {
      navigate("/login")
      return
    }
    const body = newCommentBody.trim()
    if (!body) return

    setPostingComment(true)

    const { error } = await supabase.from("comments").insert({
      post_id: postId,
      user_id: user.id,
      parent_id: null,
      body,
    })

    if (error) {
      console.error("Comment insert failed:", error.message, error)
    } else {
      setNewCommentBody("")
      await fetchComments()
    }

    setPostingComment(false)
  }

  async function submitReply(e, parentId) {
    e.preventDefault()
    if (!user?.id) {
      navigate("/login")
      return
    }
    const body = replyBody.trim()
    if (!body) return

    setPostingReply(true)

    const { error } = await supabase.from("comments").insert({
      post_id: postId,
      user_id: user.id,
      parent_id: parentId,
      body,
    })

    if (error) {
      console.error("Reply insert failed:", error.message, error)
    } else {
      setReplyBody("")
      setReplyToId(null)
      await fetchComments()
    }

    setPostingReply(false)
  }

  const hasImage = Boolean(post?.image && post.image.trim().length > 0)

  return (
    <div className="mx-auto w-full max-w-3xl p-4">
      <div className="mb-4 flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate("/view")}>
          Back
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant={liked ? "default" : "outline"}
            onClick={toggleLike}
            disabled={loading || !!error || likeLoading}
            className="gap-2"
          >
            <Heart className={liked ? "fill-current" : ""} />
            <span>{liked ? "Liked" : "Like"}</span>
            <Badge variant="secondary" className="ml-1">
              {loading ? "…" : likeCount}
            </Badge>
          </Button>

          {isOwner && (
            <Button
              variant="outline"
              onClick={() => navigate(`/edit/${postId}`)}
              disabled={!Number.isFinite(postId)}
            >
              Edit
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          {loading ? (
            <>
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="mt-2 h-4 w-1/2" />
            </>
          ) : error ? (
            <>
              <CardTitle className="text-2xl">Couldn’t load post</CardTitle>
              <CardDescription className="text-destructive">
                {error}
              </CardDescription>
            </>
          ) : (
            <>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <CardTitle className="text-left text-2xl break-words">
                    {post.title}
                  </CardTitle>

                  <CardDescription className="mt-2 flex flex-wrap items-center gap-2">
                    <span>{formatDate(post.created_at)}</span>
                    {/* <span className="text-muted-foreground/60">•</span> */}
                    {/* <span className="truncate">Post #{post.id}</span> */}
                  </CardDescription>
                </div>

                <Badge variant="secondary" className="max-w-[12rem] truncate">
                  {post.user_id}
                </Badge>
              </div>
            </>
          )}
        </CardHeader>

        <Separator />

        <CardContent className="py-6 space-y-6">
          {!loading && !error && hasImage && (
            <div className="overflow-hidden rounded-xl border">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </AspectRatio>
            </div>
          )}

          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
              <Skeleton className="h-4 w-9/12" />
            </div>
          ) : error ? null : (
            <div className="text-left whitespace-pre-wrap leading-relaxed">
              {post.body}
            </div>
          )}

          {/* COMMENTS SECTION */}
          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Comments</h2>
              <Badge variant="secondary">{comments.length}</Badge>
            </div>

            {/* Add a comment */}
            <form onSubmit={submitComment} className="space-y-2">
              <Label htmlFor="new-comment">Add a comment</Label>
              <Textarea
                id="new-comment"
                value={newCommentBody}
                onChange={(e) => setNewCommentBody(e.target.value)}
                placeholder={user?.id ? "Write something…" : "Sign in to comment…"}
                disabled={!user?.id || postingComment}
                className="resize-none"
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={!user?.id || postingComment || !newCommentBody.trim()}>
                  {postingComment ? "Posting…" : "Post comment"}
                </Button>
              </div>
            </form>

            {/* List comments */}
            {commentsLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : commentsError ? (
              <div className="text-sm text-destructive">{commentsError}</div>
            ) : topLevelComments.length === 0 ? (
              <div className="text-sm text-muted-foreground">No comments yet.</div>
            ) : (
              <div className="space-y-4">
                {topLevelComments.map((c) => (
                  <div key={c.id} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {c.user_id ? `User ${c.user_id.slice(0, 8)}…` : "Unknown"} • {formatDate(c.created_at)}
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          // toggle reply UI
                          setReplyToId((prev) => (prev === c.id ? null : c.id))
                          setReplyBody("")
                        }}
                      >
                        Reply
                      </Button>
                    </div>

                    <div className="text-left mt-2 whitespace-pre-wrap">{c.body}</div>

                    {/* Reply box */}
                    {replyToId === c.id && (
                      <form
                        onSubmit={(e) => submitReply(e, c.id)}
                        className="mt-3 space-y-2"
                      >
                        <Textarea
                          value={replyBody}
                          onChange={(e) => setReplyBody(e.target.value)}
                          placeholder={user?.id ? "Write a reply…" : "Sign in to reply…"}
                          disabled={!user?.id || postingReply}
                          className="resize-none"
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setReplyToId(null)
                              setReplyBody("")
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            disabled={!user?.id || postingReply || !replyBody.trim()}
                          >
                            {postingReply ? "Replying…" : "Post reply"}
                          </Button>
                        </div>
                      </form>
                    )}

                    {/* Replies */}
                    {repliesByParent[c.id]?.length > 0 && (
                      <div className="mt-4 space-y-2 border-l pl-4">
                        {repliesByParent[c.id].map((r) => (
                          <div key={r.id} className="rounded-md bg-muted/30 p-3">
                            <div className="text-left text-xs text-muted-foreground">
                              {r.user_id ? `User ${r.user_id.slice(0, 8)}…` : "Unknown"} • {formatDate(r.created_at)}
                            </div>
                            <div className="text-left mt-1 whitespace-pre-wrap text-sm">
                              {r.body}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="justify-end gap-2">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Close
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
