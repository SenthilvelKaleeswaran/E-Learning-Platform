# Temporal Dead Zone (TDZ)

The Temporal Dead Zone (TDZ) is a concept in JavaScript related to how let and const declarations are handled during the creation phase of an execution context.

***

#### **1. What is the Temporal Dead Zone?**

Definition :

* The **TDZ** is the time between the variable's **hoisting** during the **Creation Phase** and its **declaration** during the **Execution Phase**.

Key Points

* Variables declared using `let` and `const` are placed in the TDZ until their declaration line is reached.
* Accessing them before their declaration throws a **`ReferenceError`**.

***

Why Does TDZ Exist?

* Preventing Variable Hoisting Issues:&#x20;
  * To avoid some of the pitfalls of var's hoisting where variables could be accessed before being assigned, which can lead to unexpected behavior and bugs.
* Encouraging Better Practices:&#x20;
  * By enforcing the TDZ, JavaScript ensures that variables are used only after they have been declared, making the code more predictable and easier to debug
* Strict Mode:&#x20;
  * TDZ behavior aligns with strict mode's aim to catch more errors and make JavaScript behave in a more logical way.

***

How Does TDZ Work?

Creation Phase:

* Hoisting: Just like var and function declarations, let and const are hoisted to the top of their containing scope during the creation phase.&#x20;
* let/const: When hoisted, they are not initialized. Instead, they are in an "uninitialized" state, which is the essence of the TDZ.

\
Execution Phase:

* Initialization: When the actual let or const declaration is encountered in the code, the variable is initialized, and the TDZ for that variable ends.
* Accessing Before Initialization: If you try to use the variable before this point, JavaScript throws a ReferenceError because the variable is still in the TDZ.

***

Characteristics of TDZ:

* Temporal: It's temporary; it ends when the variable declaration is reached in the code execution.
* Dead Zone: No access to the variable is allowed; it's effectively "dead" to any code trying to use it.
* Scope-Specific: Each let or const variable has its own TDZ within its scope.

***

#### **2. Points to Remember about  TDZ**

1. **Applies to `let` and `const`**:
   * `let` and `const` are hoisted but not initialized during the Creation Phase.
   * Accessing them before their declaration throws a **`ReferenceError`**.
2. **Variables Are Uninitialized**:
   * They remain uninitialized and cannot be referenced or assigned until their declaration line.
3. **Does Not Apply to `var`**:
   * Variables declared with `var` are hoisted and initialized to `undefined`, so they are not affected by the TDZ.
4. **Function Declarations Are Not in TDZ**:
   * Functions are fully hoisted, so they can be accessed before their declaration.

***

#### 3. TDZ with `let`

Variables declared with `let` are

* &#x20;`hoisted` to the top of their scope&#x20;
* &#x20;but are `not initialized.`&#x20;
* They remain in the `TDZ until the declaration` is encountered.

**Example:**

```javascript
console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 10;
console.log(a); // Output: 10
```

**Behind the Scenes:**

1. **Hoisting Phase**:
   * `let a;` is hoisted, but `a` is in the TDZ.
2. **Execution Phase**:
   * `console.log(a);` tries to access `a`, which is in the TDZ, resulting in a `ReferenceError`.
   * `a = 10;` initializes `a` with the value `10`.
   * `console.log(a);` outputs `10`.

***



#### 4. TDZ with `const`

Variables declared with `const` behave similarly to `let` in terms of the TDZ. They are&#x20;

* `hoisted` to the top of their scope&#x20;
* &#x20;but are `not initialized.`&#x20;
* They remain in the `TDZ until the declaration` is encountered.

**Example:**

```javascript
console.log(b); // ReferenceError: Cannot access 'b' before initialization
const b = 20;
console.log(b); // Output: 20
```

**Behind the Scenes:**

1. **Hoisting Phase**:
   * `const b;` is hoisted, but `b` is in the TDZ.
2. **Execution Phase**:
   * `console.log(b);` tries to access `b`, which is in the TDZ, resulting in a `ReferenceError`.
   * `b = 20;` initializes `b` with the value `20`.
   * `console.log(b);` outputs `20`.

***

#### 5. TDZ with Function Declarations / Assignment

Function declarations are :

* `hoisted completely` including the function body.&#x20;
* They are `not affected by the TDZ`.

```javascript
console.log(greet()); // Output: Hello, World!

function greet() {
    return 'Hello, World!';
}
```

**Behind the Scenes:**

1. **Hoisting Phase**:
   * `function greet() { return 'Hello, World!'; }` is hoisted completely.
2. **Execution Phase**:
   * `console.log(greet());` outputs `Hello, World!`.

***

#### &#x20;6. TDZ with Function Expressions

Function expressions are&#x20;

* `not hoisted.`&#x20;
* `Only the variable declaration is hoisted`, `not the function declaration / assignment.`&#x20;
* They are `affected by the TDZ`.

#### Example with `var`

```javascript
console.log(sayHello); // undefined
console.log(sayHello()); // TypeError: sayHello is not a function
var sayHello = function() {
    return 'Hello!';
};
```

**Behind the Scenes:**

```javascript
// Hoisting Phase:
var sayHello; // sayHello is hoisted and initialized to undefined

// Execution Phase:
console.log(sayHello); // Output: undefined (sayHello is undefined at this point)
console.log(sayHello()); // TypeError: sayHello is not a function (sayHello is still undefined)
sayHello = function() {
    return 'Hello!';
}; // sayHello is now assigned a function
```

**Hoisting Phase:**

* `let sayHello;` is hoisted to the top of the scope, but `sayHello` is in the TDZ.

**Execution Phase:**

1. `console.log(sayHello);` is executed. Since `sayHello` is in the TDZ, accessing it results in a `ReferenceError`.
2. `console.log(sayHello());` is executed. Similarly, accessing `sayHello` results in a `TypeError`.
3. `let sayHello = function() { return 'Hello!'; };` is executed, initializing `sayHello` with the function.

#### Example with  `let`

```javascript
console.log(sayHello); // ReferenceError: Cannot access 'sayHello' before initialization
console.log(sayHello()); // ReferenceError: Cannot access 'sayHello' before initialization
let sayHello = function() {
    return 'Hello!';
};
```

**Behind the Scenes:**

```javascript
// Hoisting Phase:
let sayHello; // sayHello is hoisted but is in the TDZ

// Execution Phase:
console.log(sayHello); // ReferenceError: Cannot access 'sayHello' before initialization (sayHello is in the TDZ)
console.log(sayHello()); // ReferenceError: Cannot access 'sayHello' before initialization (sayHello is in the TDZ)
sayHello = function() {
    return 'Hello!';
}; // sayHello is now initialized with a function
```

**Hoisting Phase:**

* `let sayHello;` is hoisted to the top of the scope, but `sayHello` is in the TDZ.

**Execution Phase:**

1. `console.log(sayHello);` is executed. Since `sayHello` is in the TDZ, accessing it results in a `ReferenceError`.
2. `console.log(sayHello());` is executed. Similarly, accessing `sayHello` results in a `ReferenceError`.
3. `let sayHello = function() { return 'Hello!'; };` is executed, initializing `sayHello` with the function.

**Second Example**

```javascript
let sayHello;
console.log(sayHello); // undefined
console.log(sayHello()); // TypeError: sayHello is not a function
sayHello = function() {
    return 'Hello!';
};
```

**Behind the Scenes:**

```javascript
// Hoisting Phase:
let sayHello; // sayHello is hoisted but is in the TDZ

// Execution Phase:
sayHello; // sayHello is now declared but still undefined
console.log(sayHello); // Output: undefined (sayHello is undefined at this point)
console.log(sayHello()); // TypeError: sayHello is not a function (sayHello is still undefined)
sayHello = function() {
    return 'Hello!';
}; // sayHello is now assigned a function
```

**1. Hoisting Phase:**

* `let sayHello;` is hoisted to the top of the scope, but `sayHello` is in the Temporal Dead Zone (TDZ). This means that `sayHello` is declared but not yet initialized.

**2. Execution Phase:**

1. `let sayHello;` is executed, declaring `sayHello` but leaving it `undefined`.
2. `console.log(sayHello);` is executed. At this point, `sayHello` is `undefined`, so it outputs `undefined`.
3. `console.log(sayHello());` is executed. Since `sayHello` is still `undefined`, attempting to call it as a function results in a `TypeError`.
4. `sayHello = function() { return 'Hello!'; };` is executed, assigning the function to `sayHello`. Now, `sayHello` is a function that returns `'Hello!'`.

#### Example with `const`

```javascript
console.log(sayHello); // ReferenceError: Cannot access 'sayHello' before initialization
console.log(sayHello()); // ReferenceError: Cannot access 'sayHello' before initialization
const sayHello = function() {
    return 'Hello!';
};
```

**Behind the Scenes:**

```javascript
// Hoisting Phase:
const sayHello; // sayHello is hoisted but is in the TDZ

// Execution Phase:
console.log(sayHello); // ReferenceError: Cannot access 'sayHello' before initialization (sayHello is in the TDZ)
console.log(sayHello()); // ReferenceError: Cannot access 'sayHello' before initialization (sayHello is in the TDZ)
sayHello = function() {
    return 'Hello!';
}; // sayHello is now initialized with a function
```

**Hoisting Phase:**

* `const sayHello;` is hoisted to the top of the scope, but `sayHello` is in the TDZ.

**Execution Phase:**

1. `console.log(sayHello);` is executed. Since `sayHello` is in the TDZ, accessing it results in a `ReferenceError`.
2. `console.log(sayHello());` is executed. Similarly, accessing `sayHello` results in a `ReferenceError`.
3. `const sayHello = function() { return 'Hello!'; };` is executed, initializing `sayHello` with the function.



{% hint style="info" %}
`TypeError` happens only after accessing the function which is `declared but not initialized`.
{% endhint %}

***



#### **6. TDZ and Function Parameters**

The TDZ also applies to block-scoped variables declared within a function's body.

**Example:**

```javascript
function demo(param) {
    console.log(x); // ReferenceError
    let x = param;
}
demo(42);
```

***

#### **4. TDZ Scope**

The TDZ applies to the **block** where the `let` or `const` is declared.

**Example:**

```javascript
{
    console.log(y); // ReferenceError: Cannot access 'y' before initialization
    let y = 20;
    console.log(y); // 20
}
console.log(y); // ReferenceError: y is not defined
```

**Example:**

```javascript
function example() {
    console.log(x); // ReferenceError: Cannot access 'x' before initialization
    let x = 10;
    console.log(x); // Output: 10
}

example();
console.log(x); // ReferenceError: x is not defined
```

**Behind the Scenes:**

1. **Hoisting Phase**:
   * `let x;` is hoisted within the block scope, but `x` is in the TDZ.
2. **Execution Phase**:
   * `console.log(x);` tries to access `x`, which is in the TDZ, resulting in a `ReferenceError`.
   * `x = 10;` initializes `x` with the value `10`.
   * `console.log(x);` outputs `10`.

***

#### 8. TDZ with Class Declarations

Class declarations are&#x20;

* &#x20;`affected` by the TDZ.
* &#x20;They `are hoisted` but `remain in the TDZ until the declaration` is encountered.

**Example:**

```javascript
console.log(MyClass); // ReferenceError: Cannot access 'MyClass' before initialization

class MyClass {
    constructor() {
        console.log('MyClass instance');
    }
}

console.log(MyClass); // Output: [class MyClass]
```

**Behind the Scenes:**

1. **Hoisting Phase**:
   * `class MyClass { ... }` is hoisted, but `MyClass` is in the TDZ.
2. **Execution Phase**:
   * `console.log(MyClass);` tries to access `MyClass`, which is in the TDZ, resulting in a `ReferenceError`.
   * `class MyClass { ... }` initializes `MyClass`.
   * `console.log(MyClass);` outputs the class definition.

***



#### **5. Why Does the TDZ Exist?**

The TDZ enforces better coding practices by preventing the following:

1.  **Accidental Usage of Uninitialized Variables**:

    ```javascript
    console.log(a); // undefined
    var a = 5; // With var, this can lead to bugs.

    console.log(b); // ReferenceError
    let b = 10; // TDZ ensures you cannot use `b` before it's declared.
    ```
2.  **Avoiding Confusion in Block Scope**:

    * Ensures block-scoped variables (`let`/`const`) are not accessed before their declaration.

    ```javascript
    if (true) {
        console.log(c); // ReferenceError
        const c = 30;
    }
    ```

***

#### **7. Practical Examples of TDZ**

**Example 1: Using `let` and `const` in TDZ**

```javascript
{
    console.log(a); // ReferenceError
    let a = 5;
    console.log(a); // 5
}

{
    console.log(b); // ReferenceError
    const b = 10;
    console.log(b); // 10
}
```

**Example 2: TDZ in Loops**

Each iteration of a loop creates a new block scope for `let` or `const` variables.

```javascript
for (let i = 0; i < 3; i++) {
    console.log(i); // 0, 1, 2
}
console.log(i); // ReferenceError (i is block-scoped and in TDZ)
```

***

***

#### **9. Common TDZ Mistakes**

1.  **Accessing Variables Before Declaration**:

    ```javascript
    javascriptCopy codeconsole.log(score); // ReferenceError
    let score = 50;
    ```
2.  **Misunderstanding Block Scope**:

    ```javascript
    vascriptCopy codeif (true) {
        console.log(num); // ReferenceError
        let num = 5;
    }
    ```
3.  **Combining `var` with `let` or `const`**:

    ```javascript
    javascriptCopy codevar x = 10;
    {
        console.log(x); // ReferenceError
        let x = 20;
    }
    ```

***

#### **10. Key Differences: `var` vs `let`/`const` and TDZ**

| Feature                    | `var`                      | `let` and `const`            |
| -------------------------- | -------------------------- | ---------------------------- |
| **Hoisted?**               | Yes                        | Yes                          |
| **Initialized?**           | Initialized to `undefined` | Not initialized              |
| **TDZ Exists?**            | No                         | Yes                          |
| **Error on Early Access?** | No, returns `undefined`    | Yes, throws `ReferenceError` |

***

#### **12. Key Takeaways**

1. **What TDZ Does**:
   * Prevents access to `let` and `const` variables before their declaration.
   * Throws a ReferenceError for early access.
2. **Why It’s Useful**:
   * Encourages better coding practices.
   * Avoids confusion from accessing variables prematurely.
3. **How to Avoid Issues**:
   * Always declare variables at the top of their scope.
   * Understand the difference between `var`, `let`, and `const`.

***



\


O
