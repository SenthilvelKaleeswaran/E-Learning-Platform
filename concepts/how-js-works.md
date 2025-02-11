# How JS works -

### Basic Definition <a href="#d496" id="d496"></a>

JavaScript is a high-level, object-oriented, multi-paradigm programming language.

### Detailed Definition <a href="#ac3a" id="ac3a"></a>

JavaScript is:

1. **High-level:** Every program needs some hardware resources. In JavaScript, there’s no need to manage resources such as memory and CPU.
2. **Garbage Collected:** An algorithm inside the JavaScript engine that automatically removes old unused objects from memory. It cleans computer memory from time to time.
3. **Just in Time Compiled:** Computer processors only understand 0s and 1s (machine code). JavaScript is an Abstraction over 0s and 1s (machine code). Translation of JavaScript to machine code happens inside the JavaScript engine during compilation.
4. **Multi-paradigm:** Approach of Structuring code i.e. Coding Style. JavaScript use all three types of paradigm: Procedural Programming, OOPs, and Functional Programming
5. **Prototype-based Object-Oriented:** Everything in JavaScript is an object except primitive values (numbers, strings, etc).
6. **First-class Functions:** Functions are treated as variables. We can pass functions into other functions and return them from functions.
7. **Dynamic:** We don’t assign data types. Types become known at runtime. They can also be changed.
8. **Single-threaded and Non-blocking Event Loop:** First we need to understand the **Concurrency Model**. The Concurrency Model is how the JavaScript engine handles multiple tasks happening at the same time. We need it because JavaScript runs in one single thread, so it can perform only one thing at a time and therefore, we need a way to handle multiple things happening at the same time. In case we have a long-running task, it would block the single thread. Hence, we use an Event Loop. It takes long-running tasks, executes them in the background, and puts them back in the main thread once they are finished.

### JavaScript Engine <a href="#id-2e34" id="id-2e34"></a>

JavaScript Engine executes JavaScript code. It contains:

1. **Call Stack:** Where the code is executed using Execution Contexts.
2. **Heap:** Unstructured memory pool that stores all the objects that our application needs

<figure><img src="https://miro.medium.com/v2/resize:fit:732/1*cXHWOq2dZ0Ae0kJ9ioYmzw.png" alt="" height="464" width="488"><figcaption></figcaption></figure>

### Compilation vs Interpretation <a href="#id-1d24" id="id-1d24"></a>

In **Compilation**, the entire source code is converted to machine code at once and this machine code is written to a binary file that can be executed by a computer. Execution happens after compilation.

<figure><img src="https://miro.medium.com/v2/resize:fit:1050/1*0SIZIH0A2tH4yztryYoOPg.png" alt="" height="70" width="700"><figcaption></figcaption></figure>

In **Interpretation**, the interpreter runs through the source code and executes it line by line. Conversion to machine code happens right before it’s executed.

<figure><img src="https://miro.medium.com/v2/resize:fit:1050/1*r_y7ICqvXNTzARK--L6a7Q.png" alt="" height="60" width="700"><figcaption></figcaption></figure>

Modern JavaScript uses a mix of Interpretation and Compilation called **Just-in-Time (JIT) Compilation**. The entire code is converted into machine code at once and then executed immediately. There’s no portable file and execution happens, right after compilation.

<figure><img src="https://miro.medium.com/v2/resize:fit:1050/1*6E2xGHRJAfasWs3Ap5nCKQ.png" alt="" height="74" width="700"><figcaption></figcaption></figure>

### **How JIT Compilation Works** <a href="#id-717e" id="id-717e"></a>

As a piece of JavaScript code enters the engine the first step is to parse the code which essentially means to read the code. The code is parsed into a data structure called the **Abstract Syntax Tree (AST)** during the parsing process.

This works by first splitting up each line of code into pieces that are meaningful to the language like the const or function keywords, and then saving all these pieces into the tree in a structured way. This step also checks if there are any syntax errors and the resulting tree will later be used to generate the machine code.

<figure><img src="https://miro.medium.com/v2/resize:fit:840/1*uJxlZ2OV7ayn0TygtknM4g.png" alt="" height="874" width="560"><figcaption><p>AST Example</p></figcaption></figure>

The next step is the compilation which takes the generated AST and compiles it into machine code. This machine code then gets executed right away as modern JavaScript engines use just-in-time compilation. Execution happens in the JavaScript engine Call Stack.

<figure><img src="https://miro.medium.com/v2/resize:fit:1050/1*Hphq_IutnrL5Twisb0acjQ.png" alt="" height="407" width="700"><figcaption><p>Just-in-Time Compilation of JavaScript</p></figcaption></figure>

Modern JavaScript engines also have some clever **optimization strategies**. They create a very unoptimized version of machine code in the beginning just so that it can start executing as fast as possible. Then in the background, this code is optimized and recompiled during the already running program execution. This can be done often and after each optimization, the unoptimized code is simply converted to a new more optimized code without ever stopping execution. This process is what makes modern engines so fast.

All this parsing, compilation, and optimization happens in some special threads inside the engine, completely separate from the main thread that is running into a call stack.

### JavaScript Runtime <a href="#f344" id="f344"></a>

Imagine a JavaScript runtime as a big container that includes all the things that we need to use JavaScript.

The heart of any JavaScript runtime is always a **JavaScript engine**. Without an engine, there is no runtime and there is no JavaScript at all.

However, more than the engine is needed to work properly, we also need access to the web APIs. Web APIs are functionalities provided to the engine. JavaScript simply gets access to these APIs through the global window object.

JavaScript runtime also includes a **callback queue**. This is a data structure that contains all the callback functions that are ready to be executed. For example, we attach event handler functions to DOM elements like a button to react to certain events. These event-handler functions are also called **callback functions**. So as the event happens, for example, a click, the callback function is called.

The first thing that happens after the event happens is that the callback function is put into the callback queue. Then when the stack is empty the callback function is passed to the stack so that it can be executed. This is done by the event loop. The event loop takes callback functions from the callback queue and puts them in the call stack so that they can be executed.

<figure><img src="https://miro.medium.com/v2/resize:fit:1050/1*EST2BCf8duusxfvHz5xP_A.png" alt="" height="395" width="700"><figcaption><p>JavaScript Runtime</p></figcaption></figure>

### How is JavaScript Code executed? <a href="#id-2cc3" id="id-2cc3"></a>

Suppose that our code was just finished compiling and is now ready to be executed. A **global execution context** is created for the top-level code.

Top-level code is code that is not inside any function. Hence, in the beginning, the code outside of functions will be executed. Functions should only be executed when they are called.

In any JavaScript project, no matter how large it is, there is only one global execution context. It’s always there as the default context, and it’s where top-level code will execute. Once the top-level code is finished, functions will finally start to be executed.

For each function call, a new execution context is created containing all the necessary information to run that function and the same goes for methods, because methods are simply functions attached to objects. All these execution contexts together, make up the call stack.

When all functions are done executing, the engine will keep waiting for callback functions to arrive so that it can execute them. For example, a callback function that is associated with a click event. The event loop provides these new callback functions. In addition, every time the execution of a function is completed, it is popped off of the call stack.

<figure><img src="https://miro.medium.com/v2/resize:fit:747/1*wLYhZxv9ncXcQBO9dZ4sjQ.png" alt="" height="762" width="498"><figcaption><p>JavaScript Execution</p></figcaption></figure>

When JavaScript completes the execution of the entire code, the Global Execution Context gets deleted and popped out from the Call Stack making the Call stack empty.

> **Note:** JavaScript can exist outside of browsers as well, for example, **Node.js**.

In conclusion, it is crucial to understand the components of JavaScript and the way the code is executed to determine how JavaScript works behind the scenes.

The main takeaways are:

* JavaScript is a single-threaded language. It runs code line by line.
* When code is executed the Global Execution Context is created.
* For each function call, a new execution context is created.
* After functions are executed, callback functions are provided by an event loop to the call stack.
* When all code execution is done the Global Execution Context is popped off.



## Resources

{% embed url="https://www.freecodecamp.org/news/how-javascript-works-behind-the-scenes/" %}

{% embed url="https://www.freecodecamp.org/news/execution-context-how-javascript-works-behind-the-scenes/" %}

{% embed url="https://www.freecodecamp.org/news/how-javascript-works-behind-the-scenes/" %}

{% embed url="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/" %}
