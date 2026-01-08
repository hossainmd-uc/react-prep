import React from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useNavigate, Link } from "react-router-dom"
import { supabase } from "../../config" // adjust if needed

const HubHome = () => {
  const navigate = useNavigate()

  function newPost() {
    navigate("/new")
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log(error.message)
      return
    }
    navigate("/login")
  }

  return (
    <div className="flex w-full items-center gap-2 p-4 border-b">
      <Link to="/view" className="cursor-pointer">
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          ReactHub Blog
        </h1>
      </Link>

      <Input type="text" placeholder="Search for a post" className="max-w-xs" />
      <Button className="cursor-pointer">Search</Button>

      <Button onClick={newPost} className="cursor-pointer">
        New Post
      </Button>

      {/* Right side */}
      <div className="ml-auto flex items-center">
        <Button variant="outline" onClick={signOut} className="cursor-pointer">
          Sign out
        </Button>
      </div>
    </div>
  )
}

export default HubHome
