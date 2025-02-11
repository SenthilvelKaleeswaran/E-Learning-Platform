# Examples - TDZ

#### 1)

```javascript
var x = 10;
{
    console.log(x); // Answer
    let x = 20;
}
```

<details>

<summary>Answer</summary>

```javascript
var x = 10;
{
    console.log(x); // ReferenceError
    let x = 20;
}
```

</details>

<details>

<summary>Explaination</summary>



**1. Hoisting Phase**

* The `var` declaration is hoisted to the top of its scope (in this case, the global scope).
* The `let` declaration inside the block is hoisted to the top of the block scope, but `x` is in the TDZ until the declaration is encountered.

**2. Execution Phase**

1. **Global Scope**:
   * `var x = 10;` initializes `x` with the value `10`.
2. **Block Scope**:
   * `let x;` is hoisted within the block scope, but `x` is in the TDZ.
   * `console.log(x);` tries to access `x`, which is in the TDZ, resulting in a `ReferenceError`.
   * `x = 20;` initializes `x` with the value `20`.

#### Detailed Explanation

**Hoisting Phase**:

```javascript
// Global Scope
var x; // `x` is hoisted to the top of the global scope

// Block Scope
let x; // `x` is hoisted to the top of the block scope, but is in the TDZ
```

**Execution Phase**:

```javascript
// Global Scope
x = 10; // `x` is initialized with the value `10`

// Block Scope
{
    // `x` is in the TDZ within the block scope
    console.log(x); // ReferenceError: Cannot access 'x' before initialization
    x = 20; // `x` is initialized with the value `20`
}
```

</details>

<details>

<summary>Key Points</summary>



</details>

***

