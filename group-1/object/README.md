# Object

#### **Object Types in TypeScript: From Scratch to Core Concepts**

In TypeScript, **object types** are used to represent the structure and behavior of objects. Objects are collections of key-value pairs, where each key is a string (or symbol), and the values can be of any type. Object types allow developers to define the shape and behavior of objects in a type-safe way.

***

## **1. Basic Object Types**

In TypeScript, an object is a collection of properties, and each property consists of a key (name) and a value. When you define an object, TypeScript can infer its type or you can explicitly declare the type of each property.

**Example 1: Implicit Object Type Inference**

When you create an object, TypeScript will automatically infer the types of the properties.

```typescript
const person = {
  name: "Alice",
  age: 25,
  isStudent: false
};
```

Here, TypeScript infers the type of `person` as:

```typescript
{
  name: string;
  age: number;
  isStudent: boolean;
}
```

**Example 2: Explicit Object Type Annotation**

You can also explicitly declare the type of an object for more clarity.

<pre class="language-typescript"><code class="lang-typescript">let person : { name: string; age: number; isStudent: boolean } 
<strong>
</strong><strong>person = {
</strong>  name: "Alice",
  age: 25,
  isStudent: false
};
</code></pre>

```typescript
const person: { name: string; age: number; isStudent: boolean } = {
  name: "Alice",
  age: 25,
  isStudent: false
};
```

***

#### **2. Defining Custom Types Using `interface` and `type`**

As object structures become more complex, repeatedly typing out the same structure can be cumbersome. TypeScript offers a way to define reusable types for objects using either `interface` or `type`.

**Using `interface`**

An `interface` is a blueprint for an object, defining its structure.

```typescript
interface Person {
  name: string;
  age: number;
  isStudent: boolean;
}

const person: Person = {
  name: "Alice",
  age: 25,
  isStudent: false
};
```

**Using `type`**

Similarly, you can use the `type` keyword to define the structure of an object.

```typescript
type Person = {
  name: string;
  age: number;
  isStudent: boolean;
};

const person: Person = {
  name: "Alice",
  age: 25,
  isStudent: false
};
```

**Difference Between `interface` and `type`**

* **`interface`** can be extended (inherited) and merged, making it more flexible for extending object types.
* **`type`** can define more than just objects (e.g., unions, intersections, tuples), making it more versatile in terms of defining complex types.

***

#### **3. Optional Properties**

Objects may have properties that are not always required. In TypeScript, you can mark properties as optional by using a question mark (`?`).

```typescript
interface Person {
  name: string;
  age?: number;  // `age` is optional
}

const person1: Person = { name: "Alice" };  // valid
const person2: Person = { name: "Bob", age: 30 };  // also valid
```

In this example:

* `name` is required (`string`).
* `age` is optional (`number | undefined`).

You can omit `age` when creating an object of this type.

#### **4. Read-Only Properties**

Sometimes, you want to create an object with properties that cannot be modified after being set. You can achieve this by marking a property as `readonly`.

```typescript
interface Person {
  readonly id: number;
  name: string;
}

const person: Person = { id: 1, name: "Alice" };
person.name = "Bob";  // allowed
person.id = 2;  // Error: Cannot assign to 'id' because it is a read-only property.

```

***

TypeScript performs **excess property checks** to ensure that an object being assigned to a variable doesn't have any unexpected properties.

```typescript
typescriptCopy codelet person: { name: string; age: number };
person = { name: "Alice", age: 30, height: 170 }; // Error: Object literal may only specify known properties.
```

This is a safety feature that helps prevent mistakes like assigning extra properties

***

#### **5. Index Signatures**

Index signatures allow you to define dynamic property keys. This is useful when you don’t know the exact property names but know the type of the values.

```typescript
interface StringArray {
  [index: number]: string;  // Index signature: keys are numbers, values are strings
}

const myArray: StringArray = ["Alice", "Bob", "Charlie"];
console.log(myArray[0]);  // Output: "Alice"
```

You can also use index signatures with string keys:

```typescript
interface Dictionary {
  [key: string]: string;
}

const myDict: Dictionary = {
  firstName: "Alice",
  lastName: "Doe"
};
```

***

#### **6. Extending Object Types (`extends`)**

You can extend one object type from another, inheriting properties. This is useful for creating hierarchical relationships between types.

```typescript
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
}

const myDog: Dog = {
  name: "Buddy",
  age: 5,
  breed: "Golden Retriever"
};
```

Here, `Dog` inherits `name` and `age` from `Animal` and adds its own property `breed`.

***

#### **7. Intersection Types**

Intersection types allow you to combine multiple object types into one. This can be done using the `&` operator.

```typescript
type Person = { name: string; age: number };
type Employee = { employeeId: number; role: string };

type EmployeePerson = Person & Employee;

const employee: EmployeePerson = {
  name: "Alice",
  age: 30,
  employeeId: 123,
  role: "Developer"
};
```

The type `EmployeePerson` now includes all properties from both `Person` and `Employee`.

***

#### **8. Type Narrowing with Objects**

TypeScript allows you to narrow down types using control flow, particularly when using union types or optional properties.

```typescript
interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Fish {
  type: "fish";
  swimmingSpeed: number;
}

type Animal = Bird | Fish;

function moveAnimal(animal: Animal) {
  if (animal.type === "bird") {
    console.log("Flying at speed:", animal.flyingSpeed);
  } else if (animal.type === "fish") {
    console.log("Swimming at speed:", animal.swimmingSpeed);
  }
}
```

Here, based on the `type` property, TypeScript narrows down whether `animal` is a `Bird` or a `Fish`, enabling proper property access.

***

#### **9. Advanced: Mapped Types**

Mapped types allow you to create new types by transforming existing ones. They are used to apply transformations across all properties of an object type.

**Example: Making all properties optional**

```typescript
type Optional<T> = {
  [P in keyof T]?: T[P];
};

interface Person {
  name: string;
  age: number;
}

type PartialPerson = Optional<Person>;

const person: PartialPerson = { name: "Alice" };  // `age` is optional now
```

**Example: Making all properties read-only**

```typescript
type ReadOnly<T> = {
  readonly [P in keyof T]: T[P];
};

const readonlyPerson: ReadOnly<Person> = { name: "Alice", age: 25 };
// readonlyPerson.name = "Bob";  // Error: Cannot assign to 'name' because it is a read-only property.
```

***

#### **10. Utility Types with Objects**

TypeScript provides a set of utility types that make working with object types easier. Some common ones include:

* **`Partial<T>`**: Makes all properties in `T` optional.
* **`Required<T>`**: Makes all properties in `T` required.
* **`Readonly<T>`**: Makes all properties in `T` read-only.
* **`Pick<T, K>`**: Picks a set of properties `K` from `T`.
* **`Omit<T, K>`**: Omits a set of properties `K` from `T`.

```typescript
interface Person {
  name: string;
  age: number;
  isStudent: boolean;
}

type PartialPerson = Partial<Person>;  // All properties are optional
type ReadOnlyPerson = Readonly<Person>;  // All properties are read-only
type PickedPerson = Pick<Person, "name" | "age">;  // Only `name` and `age` properties are included
type OmittedPerson = Omit<Person, "isStudent">;  // Excludes the `isStudent` property
```

***

#### **Summary**

* **Object types** in TypeScript represent collections of key-value pairs, where each key has a specific type.
* You can define custom types using `interface` or `type` for reusability.
* Advanced features like optional properties, read-only properties, index signatures, type extensions, intersection types, and mapped types help you model more complex data structures.
* TypeScript’s utility types allow you to easily manipulate and modify object types as needed.

With these tools, TypeScript offers strong, flexible support for working with objects in a type-safe manner, making it ideal for developing large and maintainable applications.
