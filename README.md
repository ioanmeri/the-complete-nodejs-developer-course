# Introduction

Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.

### Non-blocking I/O

A critical feature for node.js

> I/O: Input / Output

* read data from a file on the file system.
* communicate with some other server, e.g. querying a database

Non blocking means i/o operations are running in the background. Started from the browser so the user can make actions,  like click elements while waiting for data to be fetched.

### Event-driven

Registering those callbacks and having them called when the IO operation is done.

## Single Threaded

That doesn't mean that NodeJs is a completely single threaded.

The code you run is indeed still single threaded, but node uses other threads in C++ behind the scenes to manage your events.


- Call Stack

- Node APIs

- CallBack Queue

- Event Loop


```
console.log('Starting Up') # 1.

setTimeout(() => { // # 2.
  console.log('Two seconds!')  # 3.
}, 2000)

setTimeout(() => { // # 4.
  console.log('Zero seconds!') // # 5.
}, 0)

console.log('Finishing Up') // # 6.
```


# #2.
That's What allows us to continue running our application while we're waiting those two seconds. 

This is not blocking the rest of the app from running.

- Call Stack
```
main() // the nodejs main wrapper function
```
- Node APIs
```
setTimeout(2 sec)
```

- CallBack Queue

~~ Event Loop

# #4.

The job of the Queue is to maintain a list of all the callback functions that are ready to get executed.

Before the callback is executed, it needs to be added onto the call stack.

The Event Loop looks:

- at the call stack and 
- it looks at the Callback Queue


If the Call Stack is empty is going to is going to run items from the Callback Queue

- Call Stack
```
main() // the nodejs main wrapper function
```
- Node APIs
```
setTimeout(2 sec)
```

- CallBack Queue
```
CallBack(0 sec)
```

~~ Event Loop

```main()``` actually continues to run => **Non blocking**

# #6.

- Call Stack
```
main()
console.log('Fin...')
```
- Node APIs
```
setTimeout(2 sec)
```

- CallBack Queue
```
Callback(0 sec)
```

~~ Event Loop


**Console**
* Starting up
* Finishing up

# #5.

- Call Stack
```
Callback(0 sec)
console.log('Zero...')
```
- Node APIs
```
setTimeout(2 sec)
```

- CallBack Queue

~~ Event Loop

**Console**
* Starting up
* Finishing up
* Zero seconds!

> **Non of the callbacks** are ever going to run **BEFORE** the **main** function is done.

# #3.

- Call Stack

- Node APIs

- CallBack Queue
```
Callback (2 sec)
```

~~ Event Loop 

-->

- Call Stack
```
Callback (2 sec)
```
- Node APIs

- CallBack Queue

~~ Event Loop 

**Console**
* Starting up
* Finishing up
* Zero seconds!
* Two seconds!