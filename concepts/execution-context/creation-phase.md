# Creation Phase

The **Creation Phase** in an Execution Context is the first stage where JavaScript prepares your code for execution.

* In this phase, the JS engine begins its compilation phase and scans the particular function  / code for compiling it .
* Code does not get executed here

***

#### What Happens During the Creation Phase?

During the creation phase, the JavaScript engine performs several key tasks to prepare the execution context for code execution. These tasks include:

1. **Creation of the Activation object/Variable Object  (VO)**
2. **Creation of the Scope Chain**
3. **Determination of the `this` Value**

***

#### 1. Variable Object (VO)

The Variable Object (VO) is a special object (key-pair value) that holds the following:

* **Declared Variables**
* **Declared Functions**
  * **Function Arguments**: The arguments passed to the function.
  * **Inner Variable :** Variables declared inside the function.
  * **Function Declarations**: Functions declared inside the function.

**1.1. Declared Variables**

* var: Variables declared with var are hoisted to this phase:
  * Their name is set, but they're initialized with undefined.
* let/const: These are also hoisted but:
  * They enter a "Temporal Dead Zone" (TDZ) where they can't be accessed until their actual declaration in the code. Attempting to use them before will result in a `ReferenceError`.

{% content-ref url="../hoisting/" %}
[hoisting](../hoisting/)
{% endcontent-ref %}

**1.2.  Function Arguments**

If the execution context is for a function, the arguments passed to the function are added to the Variable Object.

```javascript
function greet(name) {
    console.log('Hello, ' + name);
}

greet('Alice');
```

In this example, `name` is added to the Variable Object with the value `'Alice'`.

**1.2. Variable and Function Declarations**

Variable and function declarations are added to the Variable Object. Variables are initialized to `undefined`, while functions are initialized to their function definitions.

```javascript
function example() {
    var a = 10;
    function inner() {
        console.log(a);
    }
    inner();
}

example();
```

In this example:

* `a` is added to the Variable Object and initialized to `undefined`.
* `inner` is added to the Variable Object and initialized to the function definition.

#### 2. Scope Chain

The current lexical environment is connected to outer lexical environments, creating what's called the scope chain. This chain allows functions to access variables from their surrounding scopes.\


* Nested Functions: If a function is defined within another function, its lexical environment will include a reference to the outer function's environment.
* Environment Record: This part of the lexical environment holds all the bindings (variables, functions) for that scope.

```javascript
var globalVar = 'global';

function outer() {
    var outerVar = 'outer';

    function inner() {
        var innerVar = 'inner';
        console.log(globalVar + outerVar + innerVar);
    }

    inner();
}

outer();
```

In this example:

* The scope chain for `inner` includes the Variable Object of `inner`, the Variable Object of `outer`, and the global Variable Object.

{% content-ref url="../scope/scope-chain.md" %}
[scope-chain.md](../scope/scope-chain.md)
{% endcontent-ref %}

#### 3. `this` Value

The value of `this` is determined based on how the function is called:

* **Global Context**: `this` refers to the global object (`window` in browsers).
* **Function Context**: `this` depends on how the function is invoked.
  * **Simple Function Call**: `this` refers to the global object.
  * **Method Call**: `this` refers to the object that the method is called on.
  * **Constructor Call**: `this` refers to the new instance of the object.
  * **apply, call, bind**: `this` is explicitly set.

```javascript
function showThis() {
    console.log(this);
}

showThis(); // `this` refers to the global object

var obj = {
    method: showThis
};

obj.method(); // `this` refers to `obj`
```

{% content-ref url="../this.md" %}
[this.md](../this.md)
{% endcontent-ref %}

***



5\. Example: Detailed Creation Phase

Let's look at a detailed example to understand the creation phase:

```javascript
function outerFunction(outerArg) {
    var outerVar = 'outer';

    function innerFunction(innerArg) {
        var innerVar = 'inner';
        console.log(outerArg, outerVar, innerArg, innerVar);
    }

    innerFunction('innerArg');
}

outerFunction('outerArg');
```

**5.1. Creation Phase for `outerFunction`**

1. **Variable Object (VO)**:
   * `outerArg` is added and initialized to `'outerArg'`.
   * `outerVar` is added and initialized to `undefined`.
   * `innerFunction` is added and initialized to the function definition.
2. **Scope Chain**:
   * The scope chain includes the local Variable Object and the global Variable Object.
3. **`this` Value**:
   * `this` refers to the global object (`window` in browsers).

**5.2. Creation Phase for `innerFunction`**

1. **Variable Object (VO)**:
   * `innerArg` is added and initialized to `'innerArg'`.
   * `innerVar` is added and initialized to `undefined`.
2. **Scope Chain**:
   * The scope chain includes the local Variable Object, the Variable Object of `outerFunction`, and the global Variable Object.
3. **`this` Value**:
   * `this` refers to the global object (`window` in browsers).

#### Conclusion

The creation phase of the execution context is crucial for setting up the environment in which the code will be executed. It involves creating the Variable Object, establishing the scope chain, and determining the value of `this`. Understanding this phase helps in grasping how JavaScript manages variables, functions, and scope, leading to more efficient and bug-free code.
