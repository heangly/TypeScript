interface CourseGoal {
  title: string
  description: string
  completeUntil: Date
}

const createCourseGoal = (
  title: string,
  description: string,
  date: Date
): CourseGoal => {
  return { title: 'cs', description: 'des', completeUntil: new Date() }
}

const name1 = ['Max', 'Sports']
name1.push('Manu')

console.log(name1)
console.log('hi')
