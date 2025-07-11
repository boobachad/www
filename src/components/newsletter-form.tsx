"use client"

import type React from "react"
import { useState } from "react"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Subscribing email:", email)
    setEmail("")
    alert("Thanks for subscribing!")
  }

  return (
    <div>
      <p className="text-muted-foreground mb-4">
        Stay ahead of the curve with my monthly newsletter called Luminary.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <label htmlFor="email" className="sr-only">Email address</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 bg-background text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-muted-foreground"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}