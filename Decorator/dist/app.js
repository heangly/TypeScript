"use strict";
// function Loggger(logString: string) {
//   return function (constructor: Function) {
//     console.log('rendering logger.....')
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const Log = (target, propertyName) => {
    console.log(target);
    console.log(propertyName);
};
function Log2(target, name, position) {
    console.log('Accessor decorator');
    console.log(target);
    console.log(name);
    console.log(position);
}
function Log3(target, name, descriptor) { }
class Product {
    constructor(title, price) {
        this._price = price;
        this.title = title;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error('Invalid price - should be positive!');
        }
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    __param(0, Log2)
], Product.prototype, "getPriceWithTax", null);
function AuotoBind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
class Printer {
    constructor() {
        this.message = 'This works!';
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    AuotoBind
], Printer.prototype, "showMessage", null);
const printer = new Printer();
const button = document.querySelector('button');
button.addEventListener('click', printer.showMessage);
