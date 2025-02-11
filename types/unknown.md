# unknown



The `unknown` type in TypeScript is a **type-safe counterpart to `any`**. It represents a value whose type is not known at the time of writing the code. Unlike `any`, it forces you to perform type-checking before using the value, ensuring safer and more predictable code.

#### **Key Features of `unknown`**

1. **Safer Alternative to `any`:** Requires type checking before usage.
2. **Type Guarding Required:** You cannot perform operations or access properties without narrowing its type.
3. **Top Type:** It can hold any value but cannot be directly assigned to other types without type assertions or narrowing.

***

## **What Is unknown?**

The `unknown` type is used when:

* You cannot determine the type of a value at compile time.
* You want to enforce runtime checks to ensure correct usage of the value.
* You’re handling dynamic data or generic programming patterns.

**Basic Declaration**

```typescript
let value: unknown;

value = "Hello";   // OK
value = 42;        // OK
value = true;      // OK
value = { key: "value" }; // OK
```

***

## **Why Use `unknown`?**

The key advantage of `unknown` is that it enforces type safety:

* You cannot perform operations on an `unknown` type without narrowing it to a specific type.
* This makes it a safer choice than `any`.

***

## **Restrictions of `unknown`**

Unlike `any`, you cannot directly access properties or call methods on an `unknown` variable without first narrowing its type.

**Example: Restricted Operations**

```typescript
let value: unknown;

console.log(value.toUpperCase()); // ❌ Error: Object is of type 'unknown'
console.log(value + 10);          // ❌ Error: Object is of type 'unknown'
```

***

### **Using `unknown` Safely**

To use a value of type `unknown`, you need to **narrow** its type explicitly using:

1. **Type guards (e.g., `typeof`, `instanceof`)**
2. **Type assertions**
3. **Control flow analysis**

### **Type Guards**

*   **Using `typeof`:**

    ```typescript
    let value: unknown = "TypeScript";

    if (typeof value === "string") {
      console.log(value.toUpperCase()); // Works
    }

    if (typeof value === "number") {
      console.log(value + 10); // Works
    }
    ```



*   **Using `instanceof`:**

    ```typescript
    let value: unknown = new Date();

    if (value instanceof Date) {
      console.log(value.toISOString()); // Works
    }
    ```



*   **Using Array Checks:**

    ```typescript
    let value: unknown = [1, 2, 3];

    if (Array.isArray(value)) {
      console.log(value.length); // Works
    }
    ```

### **Type Assertions**

You can use a type assertion to explicitly specify the type of an `unknown` value. However, this should be done with caution.

```typescript
let value: unknown = "Hello, TypeScript!";

console.log((value as string).toUpperCase()); // Works, but risky
```

***

## **Use Cases for `unknown`**

### **1. Dynamic Data Handling**

`unknown` is particularly useful when dealing with dynamic data, such as JSON responses from an API.

```typescript
function processResponse(response: unknown) {
  if (typeof response === "object" && response !== null) {
    console.log("It's an object:", response);
  } else if (typeof response === "string") {
    console.log("It's a string:", response.toUpperCase());
  } else {
    console.log("Unknown type");
  }
}
```

### **2. Error Handling**

You can use `unknown` in `catch` blocks to handle errors more safely.

```typescript
try {
  throw "An error occurred!";
} catch (error: unknown) {
  if (typeof error === "string") {
    console.log("Error:", error);
  } else if (error instanceof Error) {
    console.log("Error message:", error.message);
  }
}
```

### **3. Generic Programming / Library development**

`unknown` is commonly used with generics to ensure that the type is checked at runtime.

```typescript
function getValue<T>(value: T): T {
  return value;
}

let result: unknown = getValue("Hello");
if (typeof result === "string") {
  console.log(result.toUpperCase());
}
```

***

#### **Difference Between `unknown` and `any`**

| Feature           | `unknown`                              | `any`                                        |
| ----------------- | -------------------------------------- | -------------------------------------------- |
| **Type Safety**   | Enforces type-checking before use.     | No type-checking; anything is allowed.       |
| **Operations**    | Requires type narrowing or assertions. | Allows all operations without checks.        |
| **Assignability** | Assignable only to `unknown` or `any`. | Assignable to any type.                      |
| **Usage**         | Suitable for safe dynamic scenarios.   | Suitable for untyped or temporary scenarios. |

***

## **Union and Intersection with `unknown`**

### **Union with `unknown`**

When `unknown` is used in a union, it dominates other types. This means any value could match the union.

```typescript
type MappedType<T> = {
  [K in keyof T]: T[K] | unknown;
};

type User = {
  id: number;
  name: string;
};

type UnknownUser = MappedType<User>; // { id: unknown; name: unknown; }

```

### **Intersection with `unknown`**

When intersected, `unknown` acts as the least restrictive type, inheriting restrictions from the other type.

```typescript
type MappedType<T> = {
  [K in keyof T]: T[K] & unknown;
};

type User = {
  id: number;
  name: string;
};

type UnknownUser = MappedType<User>; // { id: number; name: string; }

```

***

## **`unknown` with Functions**

**Unknown Parameters**

You can use `unknown` for function parameters when the input type is unpredictable.

```typescript
function processInput(input: unknown): void {
  if (typeof input === "string") {
    console.log(input.toUpperCase());
  } else if (typeof input === "number") {
    console.log(input * 2);
  } else {
    console.log("Unhandled type");
  }
}

processInput("Hello"); // HELLO
processInput(42);      // 84
processInput(true);    // Unhandled type
```

**Unknown Return Type**

Use `unknown` as a return type when the output type cannot be determined beforehand.

```typescript
function getRandomValue(): unknown {
  return Math.random() > 0.5 ? "Hello" : 42;
}

const result = getRandomValue();
if (typeof result === "string") {
  console.log(result.toUpperCase());
} else if (typeof result === "number") {
  console.log(result + 10);
}
```

***

## **Combining `unknown` with Advanced Types**

### **Mapped Types**

You can use `unknown` with mapped types for dynamic type transformations.

```typescript
type MappedType<T> = {
  [K in keyof T]: unknown;
};

type User = {
  id: number;
  name: string;
};

type UnknownUser = MappedType<User>; // { id: unknown; name: unknown; }
```

### **Conditional Types**

`unknown` works seamlessly with conditional types for advanced type checks.

```typescript
type IsUnknown<T> = T extends unknown ? "Yes" : "No";

type Result1 = IsUnknown<unknown>; // "Yes"
type Result2 = IsUnknown<string>;  // "No"
```

***

## **Best Practices with `unknown`**

1.  **Always Narrow the Type:** Ensure you perform type-checking before using an `unknown` value.

    ```typescript
    function processValue(value: unknown): void {
      if (typeof value === "string") {
        console.log(value.toUpperCase());
      }
    }
    ```


2.  **Avoid Excessive Type Assertions:** Overusing `as` defeats the purpose of `unknown`.

    ```typescript
    let value: unknown = "Hello";

    console.log((value as string).toUpperCase()); // Safe but use sparingly
    ```


3. **Use with `noImplicitAny`:** Enable the `noImplicitAny` flag in your TypeScript configuration to prefer `unknown` over implicit `any`.
4. **Enable Strict Mode:** Always use `unknown` with `strict` mode enabled to enforce proper type-checking.
5. **Prefer `unknown` Over `any`:** Use `unknown` when handling dynamic data to maintain type safety.
6. **Combine with Type Guards:** Write custom type guards to handle `unknown` more effectively.

***

#### **Key Takeaways**

* The `unknown` type is safer than `any`, requiring explicit type-checking before use.
* It’s ideal for dynamic scenarios like API responses or generic programming.
* `unknown` enforces better coding practices by preventing unsafe operations.
* Use type guards, assertions, or control flow analysis to narrow an `unknown` type.
* Prefer `unknown` over `any` to write more robust and maintainable TypeScript code.
* **Common Scenarios:**
  * Dynamic or uncertain data (e.g., API responses).
  * Error handling in `try-catch`.
  * Writing reusable, type-safe generics.
