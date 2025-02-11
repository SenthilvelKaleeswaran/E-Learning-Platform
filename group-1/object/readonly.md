# readOnly

The **`readonly`** modifier in TypeScript is used to mark object properties that should not be reassigned after their initial value is set. This provides a way to make an object’s intent more explicit and helps prevent accidental modifications during development.

Let’s break down each concept and example provided in your explanation.

***

#### **1. `readonly` in Interfaces**

When you mark a property as `readonly` in an interface, it means that the property can be **read**, but it **cannot be reassigned** after the object is created.

**Example:**

```typescript
interface SomeType {
  readonly prop: string;
}

function doSomething(obj: SomeType) {
  console.log(`prop has the value '${obj.prop}'`); // ✅ Allowed: Reading the value

  obj.prop = "hello"; // ❌ Error: Cannot assign to 'prop' because it is a read-only property
}
```

**Key Points**:

* The `readonly` modifier ensures that **reassigning the property** triggers a type-checking error.
* It applies only during compile time. At runtime, TypeScript doesn’t enforce this behavior.

***

#### **2. `readonly` Doesn’t Imply Total Immutability**

The `readonly` modifier restricts **reassignment** of the property itself, but it doesn’t prevent **modifications to the contents** of an object or array that is referenced by that property.

**Example:**

```typescript
interface Home {
  readonly resident: { name: string; age: number };
}

function visitForBirthday(home: Home) {
  console.log(`Happy birthday ${home.resident.name}!`); // ✅ Reading allowed
  home.resident.age++; // ✅ Modifying internal property is allowed
}

function evict(home: Home) {
  home.resident = { // ❌ Error: Cannot assign to 'resident' because it is a read-only property
    name: "Victor the Evictor",
    age: 42,
  };
}
```

**Key Points**:

* The `resident` property itself cannot be reassigned because it is `readonly`.
* However, the properties of the object that `resident` references (`name` and `age`) can still be modified, as they are not explicitly marked `readonly`.

***

#### **3. Compatibility and Type Aliasing**

`readonly` properties are **not factored into type compatibility checks**. That means you can assign a writable object to a `readonly` type. However, if the writable object changes, the `readonly` reference will reflect those changes due to JavaScript's object reference model.

**Example:**

```typescript
interface Person {
  name: string;
  age: number;
}

interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

let writablePerson: Person = {
  name: "Person McPersonface",
  age: 42,
};

// Assigning a writable object to a readonly reference
let readonlyPerson: ReadonlyPerson = writablePerson; // ✅ Allowed

console.log(readonlyPerson.age); // Prints: 42

// Changing the writable object
writablePerson.age++; // Modifies `writablePerson` directly

console.log(readonlyPerson.age); // Prints: 43 (readonlyPerson reflects the change)
```

**Why does this happen?**

* `readonly` affects the **type-checking at compile time**, but it doesn’t enforce immutability at runtime.
* Both `writablePerson` and `readonlyPerson` reference the same underlying object in memory. Changes to one are reflected in the other.

***

#### **Practical Use Cases of `readonly`**

1. **Ensuring Intent**:
   * Use `readonly` to indicate properties that should not be reassigned during the lifecycle of an object.
   * This is useful for objects where certain values (like IDs or configuration constants) should remain constant.
2. **Preventing Reassignment Errors**:
   * It helps catch bugs where properties might be accidentally overwritten.
3. **Signaling Immutability**:
   * Although `readonly` doesn’t make an object deeply immutable, it signals to developers that the property isn’t meant to be reassigned.

***

#### **Readonly with Built-in Utility Types**

TypeScript provides the `Readonly<T>` utility type to make all properties of a type `readonly`.

**Example:**

```typescript
interface User {
  id: number;
  name: string;
}

type ReadonlyUser = Readonly<User>;

const user: ReadonlyUser = {
  id: 1,
  name: "Alice",
};

user.name = "Bob"; // ❌ Error: Cannot assign to 'name' because it is a read-only property
```

**Key Points**:

* `Readonly<T>` makes all properties of the type `T` read-only.
* It’s useful for scenarios where you want to enforce read-only behavior without modifying the original type.

***

#### **Summary**

* **`readonly`** prevents properties from being reassigned but doesn’t prevent changes to the internal structure of objects or arrays.
* `readonly` is a **development-time tool** and has no effect at runtime.
* Compatibility between writable and `readonly` types exists because TypeScript focuses on compile-time type-checking.
* Use `readonly` for:
  * Protecting critical properties from being reassigned.
  * Communicating intent to developers.
  * Avoiding unintended mutations in certain parts of your code.

Understanding `readonly` can help you write safer, more predictable TypeScript code.
