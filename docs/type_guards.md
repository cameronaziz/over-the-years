---
slug: type-guard
title: Type Guards
authors: [cameronaziz]
tags: [typeguard]
sidebar_position: 2
---

A type guard is used to ensure that the parameter that is being passed into a function or method,
that if often a union of two distinct types, is of a specific expected type.

## The Problem
Often times, you may receive data from a source that cannot explicitly define an exact type, often an API or a utility function,
causing errors when attempting to pass that into other functions or methods that expect to receive a more specific type.

```typescript
interface Apple {
  color: 'red' | 'green';
  pickDate: string;
}

interface Orange {
  pickDate: string;
}

type Fruit = Apple | Orange;

const fetchFruit = (): Fruit => {
  /** ... */
};

const addToPie = (apple: Apple) => {
  /** ... */
};

const makePie = () => {
  const pickedFruit = fetchFruit();
  addToPie(pickedFruit);
};
```
## Solutions
There are many solutions, lets walk through them.
### `In` Operator
We don't want just any `Fruit` in our pie, because seriously, who likes pies with an `Orange` in them?!
So our `addToPie` function only accepts an `Apple`.
We can easily fix this problem with the Typescript `in` operator, as so:

```typescript
const makePie = () => {
  const pickedFruit = fetchFruit();
  
  if ('color' in pickedFruit) {
    addToPie(pickedFruit);
  }
};
```

This will prevent an `Orange`, which lacks a color property from evaluating `true` in the `if` evaluation.
Within its following block, Typescript can infer that since only `Apple` has a `color` property, so the type with that block is an `Apple`!
Quick, dirty, and easy.

### Type Predicate
Now what if both an `Apple` and an `Orange` have a color property?
```typescript
interface Apple {
  color: 'red' | 'green';
  pickDate: string; 
}

interface Orange {
  color: 'orange';
  pickDate: string;
}
```
This presents a problem: using the in operator will return true for both an Apple and a Orange so the type can not be inferred.
W will need to define a predicate to instruct Typescript how to identify the type.
```typescript
const isApple = (fruit: Fruit): fruit is Apple =>
  fruit.color === 'green' || fruit.color === 'red';

const makePie = () => {
  const pickedFruit = fetchFruit();

  if (isApple(pickedFruit)) {
    addToPie(pickedFruit);
  }
}
```
By defining the return type as `[parameter] is [type]`, the function is required to return a boolean type.
If the function returns true, the `[parameter]`, in this case a `Fruit` will be of the `[type]`, in our case an `Apple`, within any following block.

Awesome! So Typescript was able to evaluate the `Fruit` type, determine it was a union of an `Apple` and a `Orange`, we have established that the `pickedFruit` is an `Apple`.
> Note: It must be a type narrowing function; the asserted type must be assignable to the parameter's type.

### Using __typename
For the majority of use cases, using the `in` operator or defining a type narrowing function will resolve issues that arise.
We should also be cautious of type narrowing that may cause issues in the future, as we saw when both types eventually had a `color` property.
Lets say an `Apple` can be `'orange'` (I know, crazy, but run with me).

```typescript
interface Apple {
  color: 'red' | 'green' | 'orange';
  pickDate: string; 
}
```
This would cause our `isApple` to assert that the `Fruit` is an `Apple` even if it is passed an `Orange`.
This is not good, as adding an `Orange` to a pie is gross.

This is a good use case for adding a `__typename` property to the type definition.
Although it may be additional setup work, it will reduce the chance of your type predicate failing.

```typescript
interface Apple {
  __typename: 'apple'
  color: 'red' | 'green' | 'orange';
  pickDate: string;
}

interface Orange {
  __typename: 'orange';
  color: 'orange';
  pickDate: string;
}

const isApple = (fruit: Fruit): fruit is Apple =>
  fruit.__typename === 'apple';
```
### Use `asserts`
If we would rather throw an error if the type that should be asserted is not of that type, we can use `asserts`.
There will not be a need to enclose the following code within a block.
Instead of the type predicate returning true or false, the predicate either returns or throws.
If it does not throw, the type will be asserted.
> Note: When compiled into Javascript, this WILL throw an error if it fails.

```typescript
const isApple = (fruit: Fruit): asserts fruit is Apple => {
  if (fruit.__typename !== 'apple') {
    throw new AssertionError(`The fruit provided was a ${fruit.__typename}, when a fruit of type 'apple' was expected.`);
  };
}

const makePie = () => {
  const pickedFruit = fetchFruit();

  isApple(pickedFruit);
  
  addToPie(pickedFruit);
}
```
