# Function Hoisiting

***

#### 1. What is Function Hoisting?

* Functions declared using **function declarations** are **hoisted** entirely, meaning both their name and their body (implementation) are moved to the top of their scope during the Creation Phase.
* This allows you to call these functions **before** they are physically written in the code.

***

#### 2. Types of Function Declarations

There are two main types of function declarations in JavaScript:

1. **Function Declarations**
2. **Function Expressions**
   1. Anonymous function
   2. Named Function
   3. Arrow Function

***

How Function Hoisting Works&#x20;

Creation Phase:

* For Function Declarations:
  * The function name and a reference to the function object are added to the Variable Environment or Lexical Environment of the current execution context. The function is fully defined and can be called.
* For Function Expressions:
  * Only the variable part (var bar) is hoisted, initialized with undefined. The actual function assignment happens during the execution phase.

\
Execution Phase:

* Code runs line by line, and when it reaches:
  * Function declarations, nothing special happens since they're already hoisted.
  * Function expressions, the assignment of the function to the variable occurs.

***

Key Points&#x20;

* **Function Declarations**:
  * Fully hoisted, including the body.
  * Accessible before their declaration.
* **Function Expressions and Arrow Functions**:
  * Hoisted as variables but not initialized.
  * Not callable before their definition.
* **TDZ Applies to Block-Scoped Variables**:
  * If a function is assigned to `let` or `const`, it is subject to the Temporal Dead Zone (TDZ).
* **Hoisting is Implicit:**
  * &#x20;It's not that the code physically moves; the JavaScript engine prepares the scope during the creation phase, making function declarations accessible from anywhere within that scope.

***

#### 3. Function Declarations

Function declarations are

* &#x20;`hoisted completely, including the function body`.&#x20;
* This means you can call a function before it is declared in your code.

**Example:**

```javascript
console.log(greet) // [Function: greet]
console.log(greet()); // Output: Hello, World!

function greet() {
    return 'Hello, World!';
}
```

**Behind the Scenes:**

1. **Hoisting Phase**:
   * The function declaration `function greet() { return 'Hello, World!'; }` is hoisted to the top of the scope.
2. **Execution Phase**:
   * `console.log(greet());` outputs `Hello, World!`.

***

#### 4. Function Expressions

Function expressions are&#x20;

* `Only the variable declaration is hoisted`, not the function assignment / body.
* This means you `cannot call a function expression before it is assigned`.
* It `behaves` like `as same as a declared variable`.

**Example:**

```javascript
console.log(sayHello); // undefined
console.log(sayHello()); // TypeError: sayHello is not a function

var sayHello = function() {
    return 'Hello!';
};
```

**Behind the Scenes:**

1. **Hoisting Phase**:
   * The variable declaration `var sayHello;` is hoisted to the top of the scope, but `sayHello` is `undefined`.
2. **Execution Phase**:
   * `console.log(sayHello());` tries to access `sayHello`, which is `undefined`, resulting in a `TypeError`.
   * `sayHello = function() { return 'Hello!'; };` assigns the function to `sayHello`.

**Example:**

```javascript
let namedFunc = function () {
    console.log(namedFunc); // Output: [Function: namedFunc] 
};

namedFunc(); 
console.log(namedFunc) // Output: [Function: namedFunc]

console.log(named); // ReferenceError: named is not defined
```

***



#### 5. Named Function Expressions

Named function expressions are

* &#x20;`similar` to `function expressions` but `have a name`.&#x20;
* The `name is only accessible within the function itself`.

**Example:**

<pre class="language-javascript"><code class="lang-javascript">let namedFunc = function named() {
    console.log(named); // Output: [Function: named]
    console.log(namedFunc); // Output: [Function: named] 🔴 here not namedFunc but named
};

<strong>namedFunc(); 
</strong>console.log(namedFunc) // Output: [Function: named]

console.log(named); // ReferenceError: named is not defined
</code></pre>

**Behind the Scenes:**

1. **Hoisting Phase**:
   * The variable declaration `var namedFunc;` is hoisted to the top of the scope, but `namedFunc` is `undefined`.
2. **Execution Phase**:
   * `namedFunc = function named() { console.log(named); };` assigns the function to `namedFunc`.
   * `namedFunc();` outputs `[Function: named]`.
   * `console.log(named);` results in a `ReferenceError` because `named` is not defined in the outer scope.

***



#### 6. Arrow Functions

Arrow functions are behave similarly to function expressions.

* `Only the variable declaration is hoisted`, not the function assignment / body.
* This means you `cannot call a function expression before it is assigned`.
* It `behaves` like `as same as a declared variable`.

**Example:**

```javascript
console.log(arrowFunc()); // TypeError: arrowFunc is not a function

var arrowFunc = () => {
    return 'Arrow Function!';
};
```

**Behind the Scenes:**

1. **Hoisting Phase**:
   * The variable declaration `var arrowFunc;` is hoisted to the top of the scope, but `arrowFunc` is `undefined`.
2. **Execution Phase**:
   * `console.log(arrowFunc());` tries to access `arrowFunc`, which is `undefined`, resulting in a `TypeError`.
   * `arrowFunc = () => { return 'Arrow Function!'; };` assigns the arrow function to `arrowFunc`.

**Example:**

```javascript
let namedFunc = ()  => {
    console.log(namedFunc); // Output: [Function: namedFunc] 
};

namedFunc(); 
console.log(namedFunc) // Output: [Function: namedFunc]

console.log(named); // ReferenceError: named is not defined
```

***

#### **Key Differences Between `var`, `let`, `const` in Function Expressions**

| Feature                          | `var`            | `let`/`const`       |
| -------------------------------- | ---------------- | ------------------- |
| **Hoisted?**                     | Yes              | Yes                 |
| **Initialized during Hoisting?** | `undefined`      | Not initialized     |
| **Callable Before Declaration?** | No (`undefined`) | No (ReferenceError) |

***



7\. Function Hoisting in Different Scopes

Function hoisting behaves differently in global scope and function scope. Let's explore these differences.

**7.1. Global Scope**

In the global scope, function declarations are hoisted to the top of the script.

```javascript
console.log(globalFunc()); // Output: Global Function

function globalFunc() {
    return 'Global Function';
}
```

**7.2. Function Scope**

In function scope, function declarations are hoisted to the top of the function.

```javascript
function outerFunc() {
    console.log(innerFunc()); // Output: Inner Function

    function innerFunc() {
        return 'Inner Function';
    }
}

outerFunc();
```

***

#### **Practical Scenarios of Function Hoisting**

**Example 1: Calling Functions Before Declaration**

```javascript
console.log(add(5, 10)); // Output: 15

function add(a, b) {
    return a + b;
}
```

**Example 2: Function Expression Hoisting**

```javascript
console.log(subtract(10, 5)); // TypeError: subtract is not a function

var subtract = function (a, b) {
    return a - b;
};
```

***

#### **Common Pitfalls with Function Hoisting**

1.  **Confusing Function Declarations with Expressions**:

    ```javascript
    javascriptCopy codefoo(); // TypeError: foo is not a function

    var foo = function () {
        console.log("Hello!");
    };
    ```
2. **Redeclaring Functions**:
   * Be cautious when declaring multiple functions with the same name in the same scope, as the latest declaration overwrites the previous ones.

***



#### 8. Best Practices

To avoid confusion and potential bugs, it's a good practice to declare functions before invoking them. This makes the code more readable and easier to understand.

```javascript
function example() {
    return 'Example Function';
}

console.log(example()); // Output: Example Function
```

***

