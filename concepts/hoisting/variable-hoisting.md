# Variable Hoisting



Variable hoisting involves moving variable declarations to the top of the current scope. However, only the declarations are hoisted, not the initializations.

***

**`var` Hoisting**

When you use the `var` keyword to declare a variable,&#x20;

* `declaration` is `hoisted` to the top of the scope,&#x20;
* `initialized` with `undefined`.

```javascript
console.log(a); // Output: undefined
var a = 10;
console.log(a); // Output: 10
```

**Behind the Scenes:**

```javascript
var a; // Declaration is hoisted

console.log(a); // Output: undefined
a = 10; // Initialization remains in place
console.log(a); // Output: 10
```

***



**`let` and `const` Hoisting**

* When variables are declared with `let` and `const`
  * the `declaration` is `hoisted` to the top of the scope,&#x20;
  * but they are `not initialized`
* They are in the **`Temporal Dead Zone (TDZ)`** until `the line of code where they are declared` is executed.
* Accessing them before the declaration results in a `ReferenceError`.

```javascript
console.log(c); // ReferenceError: Cannot access 'b' before initialization
let a = 10
let b = 20
let c = 30;
let d 
console.log(d)
d=40
```

**Behind the Scenes:**

```javascript
// Hoisting Phase
let a; // `a` is in the TDZ
let b; // `b` is in the TDZ
let c; // `c` is in the TDZ
let d; // `d` is in the TDZ

// Execution Phase
console.log(c); // ReferenceError: Cannot access 'c' before initialization
a = 10; // `a` is now initialized
b = 20; // `b` is now initialized
c = 30; // `c` is now initialized
console.log(d); // Output: undefined (since `d` is declared but not initialized)
d = 40; // `d` is now initialized

```



## Resources&#x20;

{% content-ref url="temporal-dead-zone-tdz.md" %}
[temporal-dead-zone-tdz.md](temporal-dead-zone-tdz.md)
{% endcontent-ref %}

{% content-ref url="../error-handling/referenceerror.md" %}
[referenceerror.md](../error-handling/referenceerror.md)
{% endcontent-ref %}
