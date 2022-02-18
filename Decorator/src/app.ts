// function Loggger(logString: string) {
//   return function (constructor: Function) {
//     console.log('rendering logger.....')

//     console.log(logString)
//     console.log(constructor)
//   }
// }

// function WithTemplate(template: string, hookId: string) {
//   return function (constructor: any) {
//     console.log('rendering template.....')
//     const hookEl = document.querySelector(`#${hookId}`)
//     const p = new constructor()
//     if (!hookEl) return
//     hookEl.innerHTML = template
//     hookEl.querySelector('h1')!.textContent += p.name
//   }
// }

// @Loggger('')
// @WithTemplate('<h1> My person object </h1>', 'app')
// class Person {
//   name = 'Max'

//   constructor() {
//     console.log('Creating person object...')
//   }
// }

// const pers = new Person()
// console.log(pers)

const Log = (target: any, propertyName: string) => {
  console.log(target)
  console.log(propertyName)
}

function Log2(target: any, name: string, position: number) {
  console.log('Accessor decorator')
  console.log(target)
  console.log(name)
  console.log(position)
}

function Log3(target: any, name: string, descriptor: PropertyDecorator) {}

class Product {
  private _price: number
  title: string

  set price(val: number) {
    if (val > 0) {
      this._price = val
    } else {
      throw new Error('Invalid price - should be positive!')
    }
  }

  constructor(title: string, price: number) {
    this._price = price
    this.title = title
  }

  getPriceWithTax(@Log2 tax: number) {
    return this._price * (1 + tax)
  }
}

function AuotoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  const adjDescriptor: PropertyDescriptor = {
    get() {
      const boundFn = originalMethod.bind(this)
      return boundFn
    }
  }
  return adjDescriptor
}

class Printer {
  message = 'This works!'

  @AuotoBind
  showMessage() {
    console.log(this.message)
  }
}

const printer = new Printer()
const button = document.querySelector('button')!

button.addEventListener('click', printer.showMessage)
