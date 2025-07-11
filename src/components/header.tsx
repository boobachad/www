"use client"

import { ScrambleText } from "@/components/scramble-text"
import { MapPin, Building2 } from "lucide-react"
import { calculateAge } from "@/lib/utils"
import { useState } from "react"
import LiveAgeCalculator from "./random/LiveAgeCalculator"
import { getCurrentWork } from "@/data/work"

export function Header() {
  const birthDate = new Date(2004, 3, 20);
  const age = calculateAge(birthDate, false);
  const [showAgeModal, setShowAgeModal] = useState(false);
  const currentWork = getCurrentWork();

  return (
    <header className="mb-16 space-y-4">
      <h1 className="text-4xl font-bold mb-4 text-foreground">
        <span className="inline-block">
          <ScrambleText text="boobachad" />
        </span>
      </h1>
      <div className="flex flex-col gap-2 text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          UNIT, india
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          {currentWork ? `${currentWork.role} @ ${currentWork.title}` : "booba & brooda @ nowhere"}
        </div>
      </div>
      <p className="leading-relaxed">
        i&apos;m a{" "}
        <button
          onClick={() => setShowAgeModal(true)}
          className="inline-block hover:underline hover:text-blue-500 transition-all duration-200 cursor-pointer font-semibold"
          title="Click to see my live age"
        >
          {age}
        </button>{" "}
        cs undergrad student. i like diving deep into other people's code and finding a use case of mine. i enjoy terminal tooling.
      </p>

      {showAgeModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative">
            <button
              onClick={() => setShowAgeModal(false)}
              className="absolute -top-4 -right-4 w-8 h-8 bg-background border border-border text-foreground rounded-full flex items-center justify-center hover:bg-muted transition-colors z-10"
            >
              ×
            </button>
            <LiveAgeCalculator defaultBirthDate={birthDate} />
          </div>
        </div>
      )}
    </header>
  )
}
