# Examples - Function Hoisitng

#### 1)

```javascript
greet(); 

function getName() {
    return 'World';
}

greet(); 

function greet(name = getName()) {
    console.log(`Hello, ${name}!`);
}

greet();
```

<details>

<summary>Answer</summary>

```javascript
greet(); // Output: Hello, World!

function getName() {
    return 'World';
}
greet(); // Output: Hello, World!

function greet(name = getName()) {
    console.log(`Hello, ${name}!`);
}

greet();  // Output: Hello, World!
```

</details>

***

