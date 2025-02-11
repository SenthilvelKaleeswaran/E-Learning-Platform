# Execution Context

#### **JavaScript Execution Context: From Scratch to Core Understanding**

An **Execution Context** (EC) is a fundamental concept in JavaScript that defines the environment in which your code is executed. It determines how functions, variables, and objects are created and accessed during the code execution.

***

#### **1. What is an Execution Context?**

**Defintion :**&#x20;

* An execution context is an abstract concept in JavaScript that contains all the necessary information about the current state of the code being executed.
* An **Execution Context** is the environment where JavaScript code is evaluated and executed.

Each execution context has :

* Variable Environment: Stores variables and function arguments.
* Lexical Environment: Defines the scope and includes references to outer environments.
* This Binding: The value of this within the context.

It consists of:

* **Memory/Variable Environment**: Where variables and functions are stored in memory.
* **Thread of Execution**: The process of executing the code line by line.

***

#### **2. Types of Execution Context**

There are three main types of Execution Contexts in JavaScript:

1. **Global Execution Context (GEC)**:
   * Created when your JavaScript file starts executing.
   * Handles global variables, functions, and objects.
   * There's only one global context per program (unless you're in a module environment where each module might have its own).
   * Creates the `window` object (in browsers) or the `global` object (in Node.js).
   *   Example:

       ```javascript
       var x = 10; // Stored in the global context
       function greet() {
           console.log('Hello');
       }
       ```
2. **Function Execution Context (FEC)**:
   * Created whenever a function is invoked.
   * Each function call creates a new context, even if it's the same function being called multiple times.
   *   Each function call gets its own context, which includes:

       * **Arguments object**: Holds the function’s arguments.
       * **Local variables**: Variables declared within the function.

       Example:

       ```javascript
       function add(a, b) {
           let sum = a + b; // sum is stored in the local context
           return sum;
       }
       add(5, 3); // Creates a new Function Execution Context
       ```
3. **Eval Execution Context**:
   * Rarely used and created when `eval()` is executed.
   * Avoid using `eval()` due to security and performance issues.

***

#### **3.** Phases of Execution Context

Every Execution Context has the following phases:

1. **Creation Phase**:

During the creation phase, the JavaScript engine performs the following steps:

1. **Create the Variable Object (VO)**: This object contains function arguments, inner variable and function declarations.
2. **Create the Scope Chain**: This chain is used to resolve variables.
3. **Determine the Value of `this`**: The value of `this` depends on how the function is called.



1. **Create the Variable Object (VO)**:&#x20;
   1. Memory is allocated for variables and functions.
   2. Variables
      1. All variables declared with var are hoisted to the top of their scope and initialized with undefined.
      2. let and const are also hoisted but remain in a "temporal dead zone" until their declaration, meaning you can't use them before they're declared.
   3. Functions&#x20;
      1. Functions declared with function keyword are hoisted to the top of their scope, fully defined.
2. **Create the Scope Chain**: Links the current context with outer contexts to find variables.
3. **Determine the Value of `this`**: The value of `this` depends on how the function is called.

Example:

```javascript
console.log(x); // undefined (hoisting)
var x = 5;

function greet() {
    console.log('Hi');
}
```

**Memory Allocation**:

* `x` is set to `undefined`.
* `greet` is stored as a function.



2. **Execution Phase**:

* JavaScript executes the code line by line by again going through the code.
* Variables are assigned their values.
* Functions are invoked.

**Execution**:

* `x` is assigned the value `5`.
* `greet()` is invoked.

***

#### **4. Components of an Execution Context**

An Execution Context has three components:

1. **Variable Environment**:
   * Stores variables, functions, and their values.
   * Includes:
     * **Global variables** (in GEC).
     * **Local variables** (in FEC).
2.  **Lexical Environment**:

    * Similar to the Variable Environment but also includes the reference to its **outer environment** (scope chain).

    Example:

    ```javascript
    function outer() {
        let x = 10;
        function inner() {
            console.log(x); // Accesses x from outer's Lexical Environment
        }
        inner();
    }
    outer();
    ```
3. **This Binding**:
   * Refers to the object that the current execution context is associated with.
   * In the Global Execution Context, `this` refers to the global object (`window` in browsers).
   * In a function, `this` depends on how the function is called.

***

#### **5. Execution Context and the Call Stack**

* The **Call Stack** manages multiple Execution Contexts.
* **Global Execution Context** is pushed first.
* **Function Execution Contexts** are pushed and popped as functions are called and returned.

Example:

```javascript
function first() {
    second();
}
function second() {
    console.log('Inside second');
}
first();
```

**Call Stack Operations**:

1. GEC is created.
2. `first()` is pushed onto the stack.
3. `second()` is pushed.
4. `second()` finishes, and its context is popped.
5. `first()` finishes, and its context is popped.

***

#### **6. Scope Chain and Lexical Scoping**

* Each Execution Context has access to its **own scope** and the **outer (parent) scopes**.
* The scope chain is determined by **where the function is defined**, not where it’s called.
*   When a variable or function is referenced, JavaScript looks in the current execution context's lexical environment, then in the outer environments if not found, following the scope chain until it reaches the global scope or throws a ReferenceError



Example:

```javascript
let a = 10;
function outer() {
    let b = 20;
    function inner() {
        let c = 30;
        console.log(a, b, c); // Accesses all variables in the scope chain
    }
    inner();
}
outer();
```

***

#### **7. Hoisting and Execution Context**

* During the Creation Phase, JavaScript **hoists**:
  * Variables are declared and initialized with `undefined`.
  * Function declarations are fully hoisted.

Example:

```javascript
console.log(myVar); // undefined (hoisting)
var myVar = 5;

console.log(myFunc()); // Works because functions are hoisted
function myFunc() {
    return 'Hello';
}
```

***

#### **8. Strict Mode and Execution Context**

* In **strict mode**, JavaScript enforces stricter parsing and error handling.
* Enabled by adding `"use strict";` at the top of the file or function.

Effects:

* Prevents the use of undeclared variables.
* `this` in functions defaults to `undefined` (not the global object).

Example:

```javascript
"use strict";
function demo() {
    console.log(this); // undefined
}
demo();
```

***

#### **9. Key Takeaways**

* The **Execution Context** is the environment where JavaScript code runs.
* Types:
  * **Global Execution Context** for global code.
  * **Function Execution Context** for each function call.
* Components:
  * **Variable Environment** for variables and functions.
  * **Lexical Environment** for scope and outer references.
  * **This Binding** for object context.
* **Call Stack** manages multiple contexts, ensuring proper execution flow.

***

Would you like to explore **hoisting**, **scope chains**, or another specific detail of the Execution Context? 😊



{% embed url="https://dev.to/jahid6597/javascript-execution-context-a-deep-dive-4kno" %}
