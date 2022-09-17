---
slug: use-a-type
title: Use a Type
authors: [cameronaziz]
tags: [type, interface]
sidebar_position: 2
---
## The Problem
We would like to be able to postData to our API that has any key, of type string, and any value, also of type string.
```typescript
interface Person {
  name: string;
}

const postData = <T extends Record<string, string>>(data: T): void => {
  /** ... */
};

const person: Person = {
  name: 'Cameron',
};

/**
 * Argument of type 'Person' is not assignable to parameter of type 'Record<string, string>'.
 *   Index signature for type 'string' is missing in type 'Person'.
 */
postData(person);
```
Building it as so will produce an error and unfortunately, Typescript does not provide much help with its error message. Index signature for type 'string' is missing in type 'Person'. ... huh?

## Not This Way
We can always remove the type definition when person is instantiated.
```typescript
const postData = <T extends Record<string, string>>(data: T): void => {
  /** ... */
};

const person = {
  name: 'Cameron',
};

postData(person);
```
This will remove the error, yay.
Typescript will evaluate the code, see that `person` has keys of type `string` and values of type `string` - and this satisfies what `postData` expects.
```typescript
interface Person {
  name: string;
}

const postData = <T extends Record<string, string>>(data: T): void => {
  /** ... */
};

const preparePerson = (person: Person): Person => 

const person: Person = {
  name: 'Cameron',
};

/**
 * Argument of type 'Person' is not assignable to parameter of type 'Record<string, string>'.
 *   Index signature for type 'string' is missing in type 'Person'.
 */
postData(person);
```
But stop: this causes type safety problems. Future work may define the type of `person` to be of type `Person` and then, we are right back where we started.
Do not solve the problem this way. Drats.

## Using a type
Changing the `Person` to a type alias, using `type` instead of `interface` actually fixes the problem.

```typescript
type Person = {
  name: string;
}

const postData = <T extends Record<string, string>>(data: T): void => {
  /** ... */
};

const person: Person = {
  name: 'Cameron',
};

postData(person);
```
But why?

## Interfaces Extend
Within the codebase, an interface can be extended by simply defining the same name with additional properties.
This is completely valid and often useful code.
```typescript
interface Person {
  name: string;
}

interface Person {
  [key: symbol]: string;
}
```
Now, if we saw both of these interface definitions in our codebase, we could easily see why `postData` cannot receive a `Person` as its parameter.
It doesn't abide by the generic extends of `Record<string, string>`; its keys are either `name` or a `symbol`.

But, when we define this as a type alias, with `type`, and not as an interface, with `interface`, it is not extendable.
This tells Typescript "this is what this type will always be".
Since the type alias abides by the generic, no static type checking errors are thrown.

## Final Code
```typescript
type Person = {
  name: string;
}

const postData = <T extends Record<string, string>>(data: T): void => {
  /** ... */
};

const person: Person = {
  name: 'Cameron',
};

postData(person);
```
