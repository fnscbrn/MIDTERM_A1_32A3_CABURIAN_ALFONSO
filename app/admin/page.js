'use client'
import { useEffect, useState } from 'react'

export default function AdminPage() {
  const [users, setUsers] = useState([])
  const [games, setGames] = useState([])
  const [studentNumber, setStudentNumber] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const fetchUsers = async () => {
    const res = await fetch('/api/users')
    const data = await res.json()
    setUsers(data)
  }

  const fetchGames = async () => {
    const res = await fetch(`/api/games?startDate=${startDate}&endDate=${endDate}`)
    const data = await res.json()
    setGames(data)
  }

  const handleRegister = async () => {
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentNumber, firstName, lastName }),
    })
    fetchUsers()
  }

  useEffect(() => {
    fetchUsers()
    fetchGames()
  }, [startDate, endDate])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="mb-6">
        <h2 className="text-xl mb-2">Register User</h2>
        <input placeholder="Student Number" value={studentNumber} onChange={e => setStudentNumber(e.target.value)} className="border p-2 mr-2" />
        <input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} className="border p-2 mr-2" />
        <input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} className="border p-2 mr-2" />
        <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2">Register</button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl mb-2">Filter Game Results</h2>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="border p-2 mr-2" />
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="border p-2 mr-2" />
      </div>

      <div className="mb-6">
        <h2 className="text-xl mb-2">Registered Users</h2>
        <ul>
          {users.map(user => (
            <li key={user.studentNumber}>{user.studentNumber} - {user.firstName} {user.lastName}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl mb-2">Game Results</h2>
        <ul>
          {games.map((game, i) => (
            <li key={i}>{game.studentNumber} - {game.result} ({game.datePlayed})</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
