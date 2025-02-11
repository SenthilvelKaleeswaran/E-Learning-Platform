# Pitfalls  - Function Hoisting

#### **Pitfalls in Function Hoisting**

Function hoisting refers to how JavaScript allows functions declared using `function` declarations to be moved to the top of their containing scope during the creation phase of the execution context. While this feature enables calling functions before their declaration, it can lead to pitfalls if misunderstood.

***

#### **1. Confusion Between Function Declarations and Function Expressions**

Only **function declarations** are hoisted, not **function expressions**. Attempting to call a function expression before its initialization leads to a `TypeError` or `ReferenceError`.

**Example:**

```javascript
console.log(myFunc()); // Works, prints "Hello"
function myFunc() {
    return "Hello";
}

console.log(myFuncExpression()); // TypeError: myFuncExpression is not a function
var myFuncExpression = function () {
    return "Hi";
};
```

**Reason**:

* Function declarations are fully hoisted.
* For `var myFuncExpression`, only the variable declaration is hoisted (initialized with `undefined`), not the function itself.

***

#### **2. Shadowing Due to Duplicate Declarations**

When a function declaration and a variable share the same name, the function declaration may be shadowed by the variable, leading to unexpected behavior.

**Example:**

```javascript
console.log(foo()); // TypeError: foo is not a function
var foo = 10;
function foo() {
    return "I am a function";
}
```

**Reason**:

* Both the `var foo` and `function foo` declarations are hoisted.
* The `var foo` declaration overrides the `function foo` during the creation phase.

***

#### **3. Functions Overriding Variables in Global Scope**

Function declarations in the global scope can overwrite existing variables, causing unexpected behavior.

**Example:**

```javascript
var greeting = "Hi";
function greeting() {
    return "Hello";
}
console.log(greeting); // "Hello" (the function overwrites the variable)
```

**Reason**:

* The function declaration `greeting` hoists and overrides the `var greeting` variable.

***

#### Re-declaring Functions

Re-declaring a function with the same name in the same scope can lead to unexpected behavior.

**Example:**

```javascript
function example() {
    return 'First Function';
}

function example() {
    return 'Second Function';
}

console.log(example()); // Output: Second Function
```

**Solution**: Avoid re-declaring functions with the same name in the same scope. Use different function names if needed.

***



#### **4. Conditional Function Declarations**

Using function declarations inside blocks (e.g., `if` statements) can lead to inconsistent behavior across environments. In strict mode, block-scoped functions are hoisted only within the block, while in non-strict mode, they may hoist to the function or global scope.

**Example:**

```javascript
console.log(myFunc); // Undefined or ReferenceError in strict mode
if (true) {
    function myFunc() {
        return "Hi";
    }
}
console.log(myFunc()); // Works in non-strict mode
```

**Reason**:

* The behavior of block-scoped function declarations varies depending on the environment and strict mode.

**Pitfall**:

* Leads to non-portable code.

***

#### Hoisting with Methods in Objects

Methods in objects are not hoisted. They are assigned when the object is created.

**Example:**

```javascript
console.log(obj.method()); // Output: TypeError: Cannot read properties of undefined (reading 'method')

var obj = {
    method: function() {
        return 'Object Method';
    }
};

console.log(obj.method()); // Output: Object Method

```

**Solution**: Understand that methods in objects are not hoisted and are assigned when the object is created.

***

#### Hoisting with Immediately Invoked Function Expressions (IIFE)

Immediately Invoked Function Expressions (IIFE) are not hoisted. They are executed immediately when encountered.

**Example:**

```javascript
(function() {
    console.log('IIFE');
})(); // Output: IIFE
```

**Solution**: Understand that IIFEs are not hoisted and are executed immediately when encountered.

***

#### Hoisting with Default Parameters

Default parameters in functions are also affected by hoisting. Accessing a default parameter before its declaration results in a `ReferenceError`.

**Example:**

```javascript
function greet(name = getName()) {
    console.log(`Hello, ${name}!`);
}

function getName() {
    return 'World';
}

greet(); // Output: Hello, World!
```

**Solution**: Ensure that default parameters are declared and initialized before using them.

***

#### Function Hoisting in Loops

Function declarations inside loops can lead to unexpected behavior because they are hoisted to the top of the loop's scope.

**Example:**

```javascript
for (var i = 0; i < 3; i++) {
    function loopFunc() {
        return i;
    }
    console.log(loopFunc()); // Output: 0, 1, 2
}

console.log(loopFunc()); // Output: 3 (due to the last value of i)

----------------------------------------------------------------------------

for (let i = 0; i < 3; i++) {
    function loopFunc() {
        return i;
    }
    console.log(loopFunc()); // Output: 0, 1, 2
}

console.log(loopFunc()); // Output: 2 
```

**Solution**: Avoid declaring functions inside loops. Use function expressions or arrow functions instead

***



#### **5. Misunderstanding Default Hoisting Behavior**

Function declarations are fully hoisted, including their body. However, their order in the code can still matter if later functions depend on earlier ones.

**Example:**

```javascript
function one() {
    return two(); // Works only if `two` is declared above
}
function two() {
    return "Function Two";
}
console.log(one()); // "Function Two"
```

**Reason**:

* Although functions are hoisted, they must be declared in the correct logical order to ensure proper dependency resolution.

***

#### **6. Overriding Functions in Local Scope**

If a variable in the local scope has the same name as a function declaration in the outer scope, it overrides the outer function, potentially leading to errors.

**Example:**

```javascript
function outer() {
    function sayHello() {
        return "Hello from Outer";
    }

    var sayHello = "Hi"; // Overrides the function
    console.log(typeof sayHello); // "string"
}
outer();

--------------------------------------------------------------------------------

function outer() {
    var sayHello = "Hi"; // Overrides the function
    function sayHello() {
        return "Hello from Outer";
    }

    
    console.log(typeof sayHello); // "string"
}

--------------------------------------------------------------------------------

function outer() {
    let sayHello = "Hi"; // SyntaxError: Identifier 'sayHello' has already been declared
    function sayHello() {
        return "Hello from Outer";
    }
}
outer();

---------------------------------------------------------------------------------

function outer() {
    function sayHello() {
        return "Hello from Outer";
    }
    let sayHello = "Hi"; // SyntaxError: Identifier 'sayHello' has already been declared
}
outer();

---------------------------------------------------------------------------------
🎈 Last 2 is same for const

```

**Reason**:

* The local variable `sayHello` shadows the function declaration.

***

#### **Mixing Function Declarations and Variable Hoisting**

If a variable is declared with the same name as a function, it can cause unexpected behavior due to how hoisting works.

**Example:**

```javascript
console.log(test); // Function: test

function test() {
    console.log("Hello");
}

var test = 42;

console.log(test); // 42

--------------------------------------------------------------------------------

console.log(test); // Function: test

var test = 42;

function test() {
    console.log("Hello");
}


console.log(test); // 42
```

**Reason**:

* The function is hoisted first, but the `var test` declaration reassigns it.

**Pitfall**:

* Variables can overwrite function declarations, leading to loss of functionality.

***

#### **7. Hoisting Function Declarations vs `let` or `const` Variables**

If a `let` or `const` variable shares the same name as a function declaration, the variable takes precedence, but it remains in the Temporal Dead Zone (TDZ) until initialized.

**Example:**

```javascript
console.log(hello()); // ReferenceError: Cannot access 'hello' before initialization
let hello = function () {
    return "Hi!";
};
```

**Reason**:

* `let` and `const` variables are block-scoped and hoisted to the top of the block, but they remain in the TDZ until initialized.

***

#### **8. Hoisting in Nested Scopes**

When a function is declared in a nested scope, it is hoisted only within that scope, leading to unexpected `ReferenceError` if accessed outside.

**Example:**

```javascript
function outer() {
    console.log(inner()); // ReferenceError
    function inner() {
        return "Hi from Inner";
    }
}
outer();
```

**Reason**:

* The function `inner` is hoisted only within the `outer` function scope.

***

#### **How to Avoid Pitfalls**

1.  **Use Function Expressions When Needed**:

    * To avoid confusion with hoisting, prefer function expressions (`const` or `let` for immutability).

    ```javascript
    const greet = function () {
        return "Hello";
    };
    ```
2. **Avoid Duplicate Declarations**:
   * Do not declare variables and functions with the same name in the same scope.
3. **Declare Functions at the Top**:
   * Always declare functions at the beginning of their scope to make hoisting behavior explicit.
4. **Use Strict Mode**:
   * Enabling strict mode (`'use strict'`) ensures block-scoped behavior for functions and avoids some inconsistencies.
5. **Prefer `let` or `const` Variables**:
   * Use `let` or `const` for variables to avoid conflicts with function declarations.
6. **Understand Environment Behavior**:
   * Be aware of how different environments (browsers, Node.js) and strict mode handle hoisting.

By understanding the nuances of function hoisting, you can write more predictable and error-free JavaScript code. Let me know if you'd like more examples or detailed breakdowns! 😊
