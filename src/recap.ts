let myName: any = 'Carlos';
myName = 12;

console.log(myName);

export class Persona {
  age;
  name;

  constructor(age: number, name: string) {
    this.age = age;
    this.name = name;
  }

  getSummary() {
    return `My name is ${this.name}, and I'm ${this.age} yo.`;
  }
}

export class PersonaNew {
  constructor(private age: number, private name: string) {}

  getSummary() {
    return `My name is ${this.name}, and I'm ${this.age} yo.`;
  }
}

const me = new Persona(25, 'Carlos');
console.log(me);
