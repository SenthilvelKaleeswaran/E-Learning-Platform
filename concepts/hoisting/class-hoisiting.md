# Class Hoisiting

***

#### 1. What is Class Hoisting?

Class declarations in JavaScript are

* Not fully hoisted
* Classes declared using the `class` keyword are **hoisted .** Only the name of the class is hoisted&#x20;
* Remain in the Temporal Dead Zone (TDZ) until the declaration is encountered.&#x20;
* Cannot instantiate a class or access its properties before the class declaration.
* Even static members of a class are unavailable

***

#### Types of Class Declarations

There are two main types of class declarations in JavaScript:

1. **Class Declarations**
2. **Class Expressions**
   1. Anonymous class
   2. Named class

***

How Class Hoisting WorksCreation Phase:

* Partial Hoisting:
  * The class name is hoisted to the top of the scope, but it's in an uninitialized state until the class declaration is reached during the execution phase. This means:\

    * Trying to use the class before its declaration will result in a ReferenceError.

\
Execution Phase:

* Initialization: When the JavaScript engine reaches the class declaration in the code, the class is then fully defined, and you can use it.
* Usage Before Declaration:
  * Using the class name before its declaration leads to an error because, although the name is known (hoisted), the class itself isn't fully defined yet.

***

Points to remember

1. **Class Declarations Are Hoisted**:
   * The class's name is hoisted to the top of its scope.
2. **Not Fully Initialized**:
   * Unlike functions, class declarations are not fully initialized during hoisting.
   * They remain in the TDZ until the JavaScript engine reaches their declaration.
3. **Cannot Be Accessed Before Declaration**:
   * Attempting to reference or instantiate the class before its declaration throws a **ReferenceError**.
4. **Applies to Both Static and Instance Members**:
   * Even static members of a class are unavailable until the class is initialized.
5. **Class Declarations**:
   * Are hoisted but not initialized.
   * Cannot be accessed before their declaration (ReferenceError).
6. **Class Expressions**:
   * Behave like variables declared with `let` or `const`.
   * Are not hoisted at all.
7. **Scope and TDZ**:
   * Classes are block-scoped and follow Temporal Dead Zone rules.

***

#### 2. Class Declarations

Class `declarations are hoisted`, but `they remain in the TDZ` until the declaration is encountered. This means you cannot use the class before it is declared.

**Example:**

```javascript
console.log(MyClass); // ReferenceError: Cannot access 'MyClass' before initialization
const obj = new MyClass(); // ReferenceError: Cannot access 'MyClass' before initialization

class MyClass {
    constructor() {
        console.log('MyClass instance');
    }
}

console.log(MyClass); // Output: [class MyClass]
```

**Behind the Scenes:**

1. **Hoisting Phase**:
   * The class declaration `class MyClass { ... }` is hoisted to the top of the scope, but `MyClass` is in the TDZ.
2. **Execution Phase**:
   * `console.log(MyClass);` tries to access `MyClass`, which is in the TDZ, resulting in a `ReferenceError`.
   * `class MyClass { ... }` initializes `MyClass`.
   * `console.log(MyClass);` outputs the class definition.

***



#### 3. Class Expressions

Class expressions are `not hoisted`. `Only the variable declaration is hoisted, not the class assignment`. This means you cannot use the class expression before it is assigned.

**Example:**

```javascript
console.log(MyClass); // Output: undefined
console.log(typeof MyClass); // Output: undefined
const obj = new MyClass(); // ReferenceError: Cannot access 'MyClass' before initialization


var MyClass = class {
    constructor() {
        console.log('MyClass instance');
    }
};

console.log(MyClass); // Output: [class]
console.log(typeof MyClass); // Output: function
```

**Behind the Scenes:**

1. **Hoisting Phase**:
   * The variable declaration `var MyClass;` is hoisted to the top of the scope, but `MyClass` is `undefined`.
2. **Execution Phase**:
   * `console.log(MyClass);` outputs `undefined`.
   * `console.log(typeof MyClass);` outputs `undefined`.
   * `MyClass = class { ... };` assigns the class to `MyClass`.
   * `console.log(MyClass);` outputs the class definition.
   * `console.log(typeof MyClass);` outputs `function`.

***



#### 4. Named Class Expressions

Named class expressions are similar to class expressions but have a name. The name is only accessible within the class itself.

**Example:**

```javascript
var NamedClass = class Named {
    constructor() {
        console.log(Named); // Output: [class Named]
    }
};

new NamedClass(); // Output: [class Named]
console.log(Named); // ReferenceError: Named is not defined
```

**Behind the Scenes:**

1. **Hoisting Phase**:
   * The variable declaration `var NamedClass;` is hoisted to the top of the scope, but `NamedClass` is `undefined`.
2. **Execution Phase**:
   * `NamedClass = class Named { ... };` assigns the class to `NamedClass`.
   * `new NamedClass();` outputs `[class Named]`.
   * `console.log(Named);` results in a `ReferenceError` because `Named` is not defined in the outer scope.

***

#### 5. Class Hoisting in Different Scopes

Class hoisting behaves differently in global scope and function scope. Let's explore these differences.

**5.1. Global Scope**

In the global scope, class declarations are hoisted to the top of the script but remain in the TDZ until the declaration is encountered.

```javascript
console.log(GlobalClass); // ReferenceError: Cannot access 'GlobalClass' before initialization

class GlobalClass {
    constructor() {
        console.log('GlobalClass instance');
    }
}

console.log(GlobalClass); // Output: [class GlobalClass]
```

**5.2. Function Scope**

In function scope, class declarations are hoisted to the top of the function but remain in the TDZ until the declaration is encountered.

```javascript
function outerFunc() {
    console.log(InnerClass); // ReferenceError: Cannot access 'InnerClass' before initialization

    class InnerClass {
        constructor() {
            console.log('InnerClass instance');
        }
    }

    console.log(InnerClass); // Output: [class InnerClass]
}

outerFunc();
```

***

#### **Scope of Hoisted Classes**

Classes are hoisted to their **block scope**. They are only accessible within the scope where they are declared.

**Example:**

```javascript
{
    class Test {
        constructor() {
            this.value = "Inside block";
        }
    }

    const test = new Test();
    console.log(test.value); // "Inside block"
}

console.log(Test); // ReferenceError: Test is not defined
```

***



#### **Differences Between Function and Class Hoisting**

| Feature                            | **Function Declarations** | **Class Declarations** |
| ---------------------------------- | ------------------------- | ---------------------- |
| **Hoisted?**                       | Yes                       | Yes                    |
| **Fully Initialized?**             | Yes                       | No                     |
| **Accessible Before Declaration?** | Yes                       | No (ReferenceError)    |
| **TDZ Applies?**                   | No                        | Yes                    |

***

| **Feature**                        | **Function Declarations** | **Function Expressions**                                   | **Class Declarations**     |
| ---------------------------------- | ------------------------- | ---------------------------------------------------------- | -------------------------- |
| **Hoisted?**                       | Yes                       | Yes                                                        | Yes                        |
| **Fully Initialized?**             | Yes                       | No                                                         | No                         |
| **Accessible Before Declaration?** | Yes                       | No (TypeError if `var`, ReferenceError if `let/const`)     | No (ReferenceError)        |
| **TDZ Applies?**                   | No                        | Yes (if `let` or `const`)                                  | Yes                        |
| **Scope**                          | Function or global scope  | Block or global scope (depending on `var`, `let`, `const`) | Block scope                |
| **Body Hoisted?**                  | Yes                       | No (only variable is hoisted)                              | No                         |
| **Call Before Declaration?**       | Yes                       | No (TypeError/ReferenceError)                              | No (ReferenceError)        |
| **Initialization Timing**          | During the Creation Phase | During the Execution Phase                                 | During the Execution Phase |

***



#### 6. Best Practices

To avoid confusion and potential bugs, it's a good practice to declare classes before using them. This makes the code more readable and easier to understand.

```javascript
class ExampleClass {
    constructor() {
        console.log('ExampleClass instance');
    }
}

console.log(ExampleClass); // Output: [class ExampleClass]
```

***

Common Mistakes with Class Hoisting

**Static Members**

Even static members of a class are inaccessible before initialization:

```javascript
console.log(MyClass.staticMethod()); // ReferenceError

class MyClass {
    static staticMethod() {
        return "Static Method";
    }
}
```

***

