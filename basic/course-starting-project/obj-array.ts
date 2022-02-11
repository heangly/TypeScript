// const person: {
//   name: string
//   age: number
//   hobbies: string[]
//   role: [number, string]
// } = {
//   name: 'Heang',
//   age: 30,
//   hobbies: ['ok', 'hi'],
//   role: [2, 'author']
// }

enum Role {
  ADMIN = 'a',
  READ_ONLY = 12
}

const person = {
  name: 'Heang',
  age: 30,
  hobbies: ['ok', 'hi'],
  role: [2, 'author']
}

console.log(Role.READ_ONLY)
