'use client'
import { useState } from 'react'

export default function SlotGamePage() {
  const [studentNumber, setStudentNumber] = useState('')
  const [status, setStatus] = useState('')
  const [canPlay, setCanPlay] = useState(false)
  const [result, setResult] = useState(null)

  async function validateAndPlay() {
    setStatus('Validating...')

    // Validation API
    const res = await fetch(`/api/validate-player?studentNumber=${studentNumber}`)
    const data = await res.json()

    if (!res.ok || !data.valid) {
      setStatus('❌ Invalid student number.')
      return
    }

    // Check play cooldown
    const cooldownRes = await fetch(`/api/recent-players`)
    const recent = await cooldownRes.json()
    const isRecent = recent.some(p => p.studentNumber === studentNumber)

    if (isRecent) {
      setStatus('🕒 You must wait 3 hours before playing again.')
      return
    }

    setStatus('🎰 Ready to play!')
    setCanPlay(true)
  }

  async function playGame() {
    setStatus('Spinning...')

    const retries = Math.floor(Math.random() * 4) // 0 to 3 retries
    const didWin = Math.random() < 0.6 // 60% chance to win

    const outcome = didWin ? (retries === 0 ? 'win' : `retried ${retries} times before win`) : 'loss'

    // Save game result
    await fetch('/api/save-game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentNumber,
        result: outcome
      })
    })

    setResult(outcome)
    setStatus(`✅ ${outcome}`)
    setCanPlay(false)
  }

  return (
    <div className="p-8 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">🎰 Slot Machine Game</h1>

      <input
        type="text"
        placeholder="Enter Student Number (e.g. C12345)"
        className="border p-2 rounded w-full mb-2"
        value={studentNumber}
        onChange={(e) => setStudentNumber(e.target.value)}
      />

      <button
        onClick={validateAndPlay}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
      >
        Validate
      </button>

      {canPlay && (
        <button
          onClick={playGame}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Play Slot Machine
        </button>
      )}

      {status && <p className="mt-4 font-semibold">{status}</p>}
      {result && <p className="mt-2 text-lg">🎉 Result: {result}</p>}
    </div>
  )
}
