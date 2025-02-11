# Type assertion

#### **Assertions in TypeScript: From Scratch to Core**

TypeScript assertions allow developers to tell the compiler to treat a value as a specific type. They are a way to override TypeScript’s type inference when you have more specific knowledge about a value than the compiler can deduce.&#x20;



***

## **What Are Type Assertions?**

1. **Definition**: Type assertions let you explicitly specify a type for a value. It’s like telling TypeScript, “Trust me, I know what I’m doing.”
2. A way to explicitly inform TypeScript about the type of a value when the compiler cannot infer it.
3. **Syntax**:
   * **Angle Bracket Syntax**: `<Type>value`
   * **`as` Syntax**: `value as Type`

#### **Key Points About Assertions**

* Assertions do not perform any runtime type checks—they are purely a compile-time feature.
* Use assertions with caution, as incorrect assertions can lead to runtime errors.
* They are useful when TypeScript cannot infer the correct type from the code.

***

## **Basic Examples of Type Assertions**

### **1. Using `as` Syntax**

The `as` syntax is the preferred modern way of writing assertions.

```typescript
let value: unknown = "Hello, TypeScript!";

// Assert that value is a string
let str: string = value as string;

console.log(str.toUpperCase()); // HELLO, TYPESCRIPT!
```

### **2. Using Angle Bracket Syntax**

The older syntax for type assertions.

```typescript
let value: unknown = "Hello, TypeScript!";

// Assert that value is a string
let str: string = <string>value;

console.log(str.toUpperCase()); // HELLO, TYPESCRIPT!
```

{% hint style="info" %}
**Note**: Angle bracket syntax is not allowed in `.tsx` files because it conflicts with JSX.
{% endhint %}

***

## **Why Use Type Assertions?**

### **1. When TypeScript Cannot Infer the Type**

```typescript
const canvas = document.getElementById("myCanvas");
// TypeScript infers `HTMLElement | null`

// Assert as HTMLCanvasElement for specific canvas properties
const ctx = (canvas as HTMLCanvasElement).getContext("2d");
```

### **2. Narrowing Down Dynamic Types**&#x20;

Type assertions help when working with data sources like APIs.

```typescript
function getUserData(): any {
  return { id: 1, name: "Alice", role: "admin" };
}

const user = getUserData();
console.log((user as { name: string }).name); // Alice
```

### **3. Ignoring TypeScript Errors (Temporarily)**

You can force TypeScript to accept any value as any type (though it’s risky).

```typescript
const x = "123" as unknown as number; // Dangerous!
```

### **4. Working with  `unknown` or `any`**:

When working with `unknown` **or `any`** , type assertions are often necessary.

```typescript
function processValue(value: any): void {
  if (typeof value === "string") {
    console.log((value as string).toUpperCase());
  }
}
```

### **5. Working with JSON Parsing**:

&#x20;When you parse JSON, TypeScript considers the result as `any`. You can use type assertions to provide type safety.

```typescript
typescriptCopy codeconst json = '{"id": 1, "name": "Alice"}';
const user = JSON.parse(json) as { id: number; name: string };

console.log(user.name); // "Alice"
```



***

## **Type Assertions vs Type Casting**

* **TypeScript Assertions**: Compile-time only, does not alter the actual runtime behavior.
* **Type Casting in JavaScript**: Runtime conversion of data (e.g., `Number("123")`).

Example of Type Assertion:

```typescript
const num = "123" as number; // Compile-time assertion
```

Example of Type Casting:

```typescript
const num = Number("123"); // Runtime conversion
```

***

## **Advanced Use Cases**

### **1. Asserting Union Types**

Type assertions can help narrow down types in union scenarios.

```typescript
type Shape = { kind: "circle"; radius: number } | { kind: "square"; side: number };

function calculateArea(shape: Shape): number {
  if (shape.kind === "circle") {
    return Math.PI * (shape.radius as number) ** 2;
  } else {
    return (shape.side as number) ** 2;
  }
}
```

### **2. Non-Null Assertions**

The non-null assertion operator (`!`) asserts that a value is not `null` or `undefined`.

```typescript
const button = document.querySelector("button");

// Assert that button is not null
button!.addEventListener("click", () => console.log("Clicked!"));
```

### **3. Working with APIs**

When working with APIs, dynamic data often requires type assertions.

```typescript
async function fetchUser() {
  const response = await fetch("https://api.example.com/user");
  const data = (await response.json()) as { id: number; name: string };
  console.log(data.name);
}
```

***

## **Limitations and Risks of Type Assertions**

### **Does Not Perform Type Checks**:

* Type assertions do not validate the type at runtime. If you assert incorrectly, it may lead to runtime errors.

```typescript
let value: any = 42;

// Incorrect assertion
let stringValue = value as string;

console.log(stringValue.length); // Runtime Error: length is undefined
```

### **Double Assertions**:

* In some cases, you might need a **double assertion** (`unknown` → `T`), but this is often discouraged unless absolutely required.

```typescript
const input = "hello" as unknown as number; // Double assertion
```

### **Overusing Assertions**

Use type assertions sparingly. They bypass TypeScript’s safety checks and should only be used when necessary.

```typescript
let value: any = "Hello";
let num: number = value as number; // No error, but incorrect assertion
console.log(num + 5); // Runtime error!
```

### **Assertions Do Not Perform Type Conversion**

Assertions don’t transform data; they only change the type as perceived by the compiler.

```typescript
let str = "123";
let num = str as unknown as number; // No error, but num is still a string
```

***

## **Best Practices for Type Assertions**

1. **Avoid Unnecessary Assertions**:
   * If TypeScript can infer the type correctly, avoid explicit assertions.
2. **Limit Assertions to Specific Scenarios**:
   * Use assertions sparingly, mainly for DOM manipulations or working with dynamic data.
3. **Validate at Runtime**:
   * Use assertions for compile-time checks but validate data at runtime to ensure correctness.
4. **Prefer `as` Syntax**:
   * Use `as` over angle brackets for better readability and compatibility with JSX.



***

## **Key Differences: `unknown`, `any`, and Type Assertions**

| Feature              | `unknown`                   | `any`               | Type Assertions                             |
| -------------------- | --------------------------- | ------------------- | ------------------------------------------- |
| **Safety**           | Requires explicit narrowing | Allows unsafe usage | Explicitly specifies type without checking. |
| **Flexibility**      | Safe but restrictive        | Very flexible       | Flexible but prone to misuse.               |
| **Runtime Behavior** | No runtime effect           | No runtime effect   | No runtime effect.                          |

***

## **Key Differences Between Assertions and Other Type Features**

| **Feature**                 | **Type Assertions**               | **Type Guards**                       | **Definite Assignment Assertions**        |
| --------------------------- | --------------------------------- | ------------------------------------- | ----------------------------------------- |
| **Purpose**                 | Explicitly define a value's type. | Narrow a type dynamically at runtime. | Inform TS that a variable is initialized. |
| **Compile-time or Runtime** | Compile-time only.                | Works at runtime.                     | Compile-time.                             |
| **Risk**                    | Risky if assertion is incorrect.  | Safer as it validates the type.       | Risky if the assumption is wrong.         |

***

## **Summary: Assertions in TypeScript**

| **Feature**        | **Details**                                                                                               |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| **Definition**     | Allows explicitly defining the type of a value for the TypeScript compiler.                               |
| **Syntax**         | `value as Type` (modern) or `<Type>value` (older).                                                        |
| **Common Uses**    | DOM manipulations, dynamic data handling, narrowing types, working with `unknown`.                        |
| **Risks**          | Overuse can lead to incorrect runtime behavior. Assertions don’t perform type conversions.                |
| **Best Practices** | Use sparingly, prefer `as` syntax, validate data at runtime, and avoid chaining assertions unnecessarily. |

Mastering type assertions ensures you can handle edge cases in TypeScript where type inference isn’t sufficient, while maintaining type safety and correctness.

#### **Key Takeaways**

* **Type Assertions (`as`)**: Override TypeScript's inferred types.
* **Definite Assignment Assertions (`!`)**: Tell TypeScript that variables will be initialized.
* **Common Use Cases**:
  * Narrowing `unknown` or `any`.
  * Handling DOM elements.
  * Parsing JSON.
  * Suppressing null or undefined checks (`!`).
* **Use Sparingly**: Avoid overusing assertions; rely on TypeScript's type inference and guards where possible.

By understanding assertions, you can handle edge cases effectively and ensure robust type safety in your TypeScript projects.
