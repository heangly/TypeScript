enum ProjectStatus {
  Active,
  Finished
}

// Project Type
class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

// Project State Management
type Listener = (items: Project[]) => void

class ProjectState {
  private listeners: Listener[] = []
  private projects: Project[] = []
  private static instance: ProjectState

  private constructor() {}

  static getInstance() {
    if (this.instance) return this.instance
    this.instance = new ProjectState()
    return this.instance
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn)
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    )

    this.projects.push(newProject)
    for (const listenerFn of this.listeners) {
      listenerFn([...this.projects])
    }
  }
}

const projectState = ProjectState.getInstance()

//Validation
interface Validtable {
  value: string | number
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
}

function validate(validateableInput: Validtable) {
  let isValid = true
  if (validateableInput.required) {
    isValid = isValid && validateableInput.value.toString().trim().length !== 0
  }

  if (
    validateableInput.minLength !== undefined &&
    typeof validateableInput.value === 'string'
  ) {
    isValid =
      isValid && validateableInput.value.length >= validateableInput.minLength
  }

  if (
    validateableInput.maxLength !== undefined &&
    typeof validateableInput.value === 'string'
  ) {
    isValid =
      isValid && validateableInput.value.length <= validateableInput.maxLength
  }

  if (
    validateableInput.min !== undefined &&
    typeof validateableInput.value === 'number'
  ) {
    isValid = isValid && validateableInput.value >= validateableInput.min
  }

  if (
    validateableInput.max !== undefined &&
    typeof validateableInput.value === 'number'
  ) {
    isValid = isValid && validateableInput.value <= validateableInput.max
  }

  return isValid
}

//autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFunction = originalMethod.bind(this)
      return boundFunction
    }
  }
  return adjDescriptor
}

//ProjectList Class
class ProjectList {
  templateElement: HTMLTemplateElement
  hostElement: HTMLDivElement
  element: HTMLElement
  assignedProjects: Project[]

  constructor(private type: 'active' | 'finished') {
    this.templateElement = document.querySelector('#project-list')!
    this.hostElement = document.querySelector('#app') as HTMLDivElement
    this.assignedProjects = []

    const importedNode = document.importNode(this.templateElement.content, true)
    this.element = importedNode.firstElementChild as HTMLElement
    this.element.id = `${this.type}-projects`

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Active
        } else {
          return prj.status === ProjectStatus.Finished
        }
      })

      console.log(relevantProjects)
      this.assignedProjects = relevantProjects
      this.renderProjects()
    })

    this.attach()
    this.renderContent()
  }

  private renderProjects() {
    const listEl = document.querySelector(
      `#${this.type}-projects-list`
    ) as HTMLUListElement
    listEl.innerHTML = ''
    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement('li')
      listItem.textContent = prjItem.title
      listEl.appendChild(listItem)
    }
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element)
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`
    this.element.querySelector('ul')!.id = listId
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' PROJECTS'
  }
}

// ProjectInput Class
class ProjectInput {
  templateElement: HTMLTemplateElement
  hostElement: HTMLDivElement
  element: HTMLFormElement
  titleInputElement: HTMLInputElement
  descriptionInputElement: HTMLInputElement
  peopleInputElement: HTMLInputElement

  constructor() {
    this.templateElement = document.querySelector('#project-input')!
    this.hostElement = document.querySelector('#app')!

    const importedNode = document.importNode(this.templateElement.content, true)
    this.element = importedNode.firstElementChild as HTMLFormElement
    this.element.id = 'user-input'

    this.titleInputElement = this.element.querySelector('#title')!
    this.descriptionInputElement = this.element.querySelector('#description')!
    this.peopleInputElement = this.element.querySelector('#people')!

    this.configure()
    this.attach()
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value
    const enteredDescription = this.descriptionInputElement.value
    const enteredPeople = this.peopleInputElement.value

    const titleValidatable: Validtable = {
      value: enteredTitle,
      required: true
    }

    const descriptionValidatable: Validtable = {
      value: enteredDescription,
      required: true
    }

    const peopleValidatable: Validtable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5
    }

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('Invalid input, please try again')
      return
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople]
    }
  }

  private clearInputs() {
    this.titleInputElement.value = ''
    this.descriptionInputElement.value = ''
    this.peopleInputElement.value = ''
  }

  @autobind
  private submithandler(event: Event) {
    event.preventDefault()
    const userInput = this.gatherUserInput()
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput
      projectState.addProject(title, desc, people)
      this.clearInputs()
      console.log(title, desc, people)
    }
  }

  private configure() {
    this.element.addEventListener('submit', this.submithandler)
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element)
  }
}

const projectInput = new ProjectInput()
const activeProjectLit = new ProjectList('active')
const finishProjectList = new ProjectList('finished')
