// In-memory user storage (in a real app, this would be a database)
export interface User {
  id: string
  name: string
  email: string
  password: string
}

// Store users in memory (this will reset when the server restarts)
let users: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", password: "password123" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", password: "password123" },
]

export function addUser(user: Omit<User, 'id'>) {
  const newUser: User = {
    ...user,
    id: Date.now().toString(),
  }
  users.push(newUser)
  return newUser
}

export function findUserByEmail(email: string): User | undefined {
  return users.find(user => user.email === email)
}

export function findUserByEmailAndPassword(email: string, password: string): User | undefined {
  return users.find(user => user.email === email && user.password === password)
} 