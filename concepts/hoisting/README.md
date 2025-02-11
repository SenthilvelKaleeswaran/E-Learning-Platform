# Hoisting

**What is Hoisting?**

**Hoisting** is JavaScript's `default behavior` of `moving declarations (not initializations)` to the top of their respective scope during the `compilation phase`.

* This means that you can use variables and functions before they are declared in your code
* It essentially means that declarations are processed before any code is executed.

Another Defintion :&#x20;

* The process of storing variables and function declaration in memory prior to the execution of the code is known as **Hoisting**

Points to Remember :&#x20;

* Hoisting happens in **`Creation Phase`  or before `Execution`**
* Only the declarations are hoisted, not intializations.

***

#### **Types of Hoisting**

1. **Variable Hoisting**
2. **Function Hoisting**&#x20;
3. **Class Hoisting** (ES6 feature)

***

#### **How Hoisting Works?**

**1. Function Hoisting**

Function declarations are fully hoisted, meaning you can call a function before it is defined in the code.

**Example:**

```javascript
greet(); // Output: "Hello!"

function greet() {
    console.log("Hello!");
}
```

**Why does this work?** The function declaration `function greet() {}` is hoisted to the top, so it's as if the code looks like this:

```javascript
function greet() {
    console.log("Hello!");
}

greet();
```

***

**1. Variable Hoisting**

**Using `var`:**

Variables declared with `var` are hoisted, but their initialization is not. Until the code reaches the line where the variable is initialized, its value is `undefined`.

**Example:**

```javascript
console.log(a); // Output: undefined
var a = 10;
console.log(a); // Output: 10
```

**How it works:** The declaration `var a` is hoisted to the top, but the assignment `a = 10` is not. Internally, the code looks like this:

```javascript
var a;
console.log(a); // undefined
a = 10;
console.log(a); // 10
```

**Using `let` and `const`:**

Variables declared with `let` and `const` are hoisted but remain in a "temporal dead zone" (TDZ) until they are initialized.

**Example:**

```javascript
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;
```

**Why?** Unlike `var`, `let` and `const` do not allow access to the variable before the declaration line. This is a safeguard to avoid errors.

***

**3. Class Hoisting**

Classes in ES6 are hoisted similarly to `let` and `const`. They are hoisted but remain in the TDZ.

**Example:**

```javascript
const obj = new MyClass(); // ReferenceError: Cannot access 'MyClass' before initialization
class MyClass {
    constructor() {
        this.name = "Example";
    }
}
```

***

#### **Key Differences Between `var`, `let`, and `const` Hoisting**

| Feature                          | `var`          | `let` / `const`       |
| -------------------------------- | -------------- | --------------------- |
| Hoisted?                         | Yes            | Yes                   |
| Initial Value Before Declaration | `undefined`    | TDZ (Error on access) |
| Scope                            | Function scope | Block scope           |

***

#### **Practical Scenarios of Hoisting**

1. **Function Declaration vs Function Expression:**

Function expressions are not hoisted like declarations. Only the variable (e.g., `greet`) is hoisted, but the function itself is not.

**Example:**

```javascript
greet(); // Error: greet is not a function

var greet = function () {
    console.log("Hello!");
};
```

**Internally:**

```javascript
var greet; // Declaration hoisted
greet(); // Error: greet is not a function
greet = function () {
    console.log("Hello!");
};
```

***

2. **Avoiding Hoisting Pitfalls with `let` and `const`:**

Using `let` and `const` ensures safer code by avoiding unintentional access before initialization.

**Bad (Using `var`):**

```javascript
console.log(name); // undefined
var name = "Alice";
```

**Good (Using `let` or `const`):**

```javascript
console.log(name); // ReferenceError
let name = "Alice";
```

***

#### **Key Takeaways**

1. **Hoisting occurs during the compile phase** of JavaScript execution.
2. Function declarations are fully hoisted, but function expressions are not.
3. `var` is hoisted and initialized to `undefined`; `let` and `const` are hoisted but remain in the temporal dead zone.
4. Always declare variables before using them to avoid hoisting-related confusion.

***
