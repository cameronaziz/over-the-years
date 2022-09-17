---
slug: template-literal-type
title: Template Literal Types
authors: [cameronaziz]
tags: [template literal]
sidebar_position: 3
---

Template Literal types are simply string literals with 'holes' in them, where the hole can be either another string literal type or string. This can allow creation of many union types with little code.

## Basic String Literal
Let say we want a type to accept any string, 1 to 1000. That would normally be over 1000 lines of code. Not with template literal types!

```typescript
type NonZeroDigits =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9';

type Digits = '0' | NonZeroDigits;
type DoubleDigits = `${NonZeroDigits}${Digits}`;
type TripleDigits = `${NonZeroDigits}${Digits}${Digits}`;

type OneToOneThousand =
  | NonZeroDigits
  | DoubleDigits
  | TripleDigits
  | '1000';
```

The `OneToOneThousand` type will accept any string, between `1` and `1000`, but things like `054` wont be accepted, only `54` - along with obviously prevent things like `foo` or `'1500'`.

Pretty Cool.
