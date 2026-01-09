import React from "react"
import { Routes, Route, Navigate, Outlet, BrowserRouter } from "react-router-dom"

import Login from "./components/Login"
import HubHome from "./components/HubHome"
import NewPost from "./components/NewPost"
import Posts from "./components/Posts"
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./components/AuthProvider"

import './App.css'
import CreateUsername from "./components/CreateUsername"

function AppLayout() {
  return (
    <div>
      <HubHome />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* public */}
          <Route path="/login" element={<Login />} />

          {/* protected */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/editUsername" replace />} />
            <Route path="/editUsername" element={<CreateUsername />} />
            <Route path="/view" element={<Posts />} />
            <Route path="/new" element={<NewPost />} />
            <Route path="/edit/:id" element={<NewPost />} />
          </Route>

          <Route path="*" element={<Navigate to="/view" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
