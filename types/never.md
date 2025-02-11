# never



The `never` type in TypeScript represents **a value that will never occur**. It is typically used to signify situations where a function doesn't return anything because it either throws an error or an infinite loop prevents it from completing.

#### **Key Characteristics of `never`**

* A type that **cannot have any value**.
* `never` is the most restrictive type in TypeScript.
* Used to indicate:
  1. Functions that always throw errors or never return  (infinite loops) .
  2. Code that is unreachable.
  3. Exhaustiveness checks in `switch` or conditional logic.
* **No Runtime Representation:** `never` does not exist at runtime, only at compile time.
* **Acts as the Bottom Type:** `never` is a subtype of every type, but no type is a subtype of `never`.

***

## **Declaring `never`**

You cannot assign any value to a variable of type `never`.

```typescript
let x: never;

// This is invalid as `never` cannot hold any value.
x = 42;           // ❌ Error
x = "Hello";      // ❌ Error
x = undefined;    // ❌ Error
x = null;         // ❌ Error
```

***

## **Assignability of `never`**

* **`never` is the most restrictive type in TypeScript.**
* It can only be assigned to itself or `any`.

```typescript
let a: never;

// Cannot assign other types to `never`
a = 42;          // ❌ Error
a = "Hello";     // ❌ Error

// But `never` can be assigned to `any`
let b: any = a;  // ✅ Valid
```

***

## **When to Use `never`**

### **1. Functions That Throw Errors**

Functions that throw an error instead of returning a value use the `never` type.

```typescript
function throwError(message: string): never {
  throw new Error(message);
}

// Example usage
throwError("This is an error!"); // Throws error and never returns
```

### **2. Functions with Infinite Loops**

Functions with infinite loops can never return, so their return type is `never`.

```typescript
function infiniteLoop(): never {
  while (true) {
    console.log("Running forever...");
  }
}
```

### **3. Exhaustive Type Checking**

When using discriminated unions, `never` helps ensure all cases are handled. This is particularly useful in **type-safe switch statements**.

```typescript
type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    default:
      // TypeScript ensures this never happens
      const _exhaustiveCheck: never = shape;
      throw new Error(`Unhandled shape: ${_exhaustiveCheck}`);
  }
}
```

***

## **`never` vs. `void`**

| Feature           | `never`                                                       | `void`                                 |
| ----------------- | ------------------------------------------------------------- | -------------------------------------- |
| **Represents**    | A value that never occurs.                                    | Absence of a return value.             |
| **Functions**     | Functions that never return (e.g., throw or loop infinitely). | Functions that return `undefined`.     |
| **Assignability** | Cannot assign any value to `never`.                           | `undefined` can be assigned to `void`. |

#### **Examples**

*   **`void`:**

    ```typescript
    function logMessage(message: string): void {
      console.log(message);
    }
    ```
*   **`never`:**

    ```typescript
    function throwError(): never {
      throw new Error("This function never returns");
    }
    ```

***

## **`never` in Union Types**

The `never` type is useful in union types because it acts as the **"bottom type"**. When combined with other types, it is effectively ignored.

**Example: Union with `never`**

```typescript
type Example = string | never; // Equivalent to just 'string'

function processValue(value: Example) {
  console.log(value); // 'value' is treated as 'string'
}
```

***

## **`never` in Intersection Types**

The `never` type is useful in intersection types because it acts as the **"bottom type"**. When combined with other types, the other types are ignored.

**Example: Union with `never`**

```typescript
type Example = string & never; // Equivalent to just 'never'

function processValue(value: Example) {
  console.log(value); // 'value' is treated as 'never'
}
```

***

## **`never` in Conditional Types**

When using conditional types, `never` often arises when a condition excludes all possibilities.

**Example: Excluding Types**

```typescript
type ExcludeType<T, U> = T extends U ? never : T;

type Result = ExcludeType<"a" | "b" | "c", "b">; 
// Result is "a" | "c" because "b" was excluded
```

Here:

* If `T extends U` is true, the type is `never`. Otherwise, it retains `T`.

***

## **`never` in Mapped Types**

When a mapped type excludes all keys, the resulting type is `never`.

**Example: Key Exclusion**

```typescript
type ExcludeKeys<T, K> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type User = { id: number; name: string; isAdmin: boolean };

type Admin = ExcludeKeys<User, "isAdmin">;
// Result:
// type Admin = {
//   id: number;
//   name: string;
// }
```

***

## **Practical Applications of `never`**

### **1. Exhaustiveness Checks**

Ensures you handle all possible cases in conditional statements.

```typescript
type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    default:
      // Exhaustive check: `shape` here is `never`
      const _exhaustive: never = shape; // Ensures all cases are handled
      throw new Error("Unhandled shape");
  }
}
```

### **2. Utility Types**

`never` is used in utility types like `Exclude` and `Extract` to narrow down or filter types.

```typescript
type Exclude<T, U> = T extends U ? never : T;
type Extract<T, U> = T extends U ? T : never;

type Excluded = Exclude<"a" | "b" | "c", "b">; // "a" | "c"
type Extracted = Extract<"a" | "b" | "c", "b">; // "b"
```

### **3. Error-Prone Situations**

Use `never` for functions that should never reach certain states in logic.

```typescript
function processValue(value: number | string): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (typeof value === "number") {
    return value.toFixed(2);
  }

  // This should never happen
  const _never: never = value; // Compile-time error if a new type is added to the union
  throw new Error(`Unexpected value: ${_never}`);
}
```

***

## **Advanced Examples of `never`**

### **Recursive Conditional Types**

`never` is commonly used in advanced type manipulation, especially when narrowing down complex types.

```typescript
type FilterNever<T> = T extends never ? true : false;

type Result1 = FilterNever<never>;  // true
type Result2 = FilterNever<string>; // false
```

### **Excluding `never` from Types**

```typescript
type RemoveNever<T> = T extends never ? never : T;

type Result = RemoveNever<string | number | never>; // string | number
```

### **Function Argument Restriction**

You can use `never` as a parameter type to prevent a function from being called with any argument.

```typescript
function doNothing(value: never): void {
  // Function cannot be called because no value can match `never`
}
```

***

## **Best Practices with `never`**

1. **Use in Exhaustive Type Checks**:
   * Helps ensure all cases in union types are handled.
   * Improves maintainability and reduces runtime errors.
2. **Avoid Misuse**:
   * `never` should not be used for values that might exist at runtime.
   * It’s designed only for cases where something **cannot occur**.
3. **Use to Signal Impossible States**:
   * Helps identify unreachable code paths.
   * Makes your intentions clear when designing APIs or functions.

***

## **Key Takeaways**

1. **Represents impossible values:** Functions or code paths that can never return or be reached.
2. **Forces type safety:** Ensures exhaustive checks in conditional logic.
3. **Used in advanced type manipulation:** Integral in utility types like `Exclude` and `Extract`.
4. **Core Difference from `void`:** `never` means the function does not complete, while `void` means the function returns `undefined`.

* **Definition:** `never` represents values that will never occur.
* **Usage Scenarios:**
  * Functions that throw errors or run indefinitely.
  * Enforcing exhaustive type-checking.
  * Narrowing unreachable code paths.
* **Behavior:**
  * Cannot be assigned any value.
  * Ensures compile-time safety and code completeness.
* **Difference from `void`:** While `void` means no return value, `never` means no possible execution or return path.

Understanding and leveraging `never` ensures that your TypeScript code is robust, type-safe, and logically sound.
