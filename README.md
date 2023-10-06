# qwik-saga
redux-saga like process handling implement to qwik
> ! under development, just 4 lock a module name

## placeholder code
just for check module development works
this is some real basics array lib, will be removed!!

```ts
export type Mapper = <T>(list: T[]) => T[];
export type Picker = <T>(list: T[]) => T;
export type PickerBy = <T>(list: T[], seek: T) => T;
export type Creators = <T>(amount: number, creators: () => T) => T[];

export const rotateList:Mapper = ([first, ...rest]) => [...rest, first];
export const shuffleList:Mapper = list => [...list].sort(() => Math.random() > 0.5 ? 1 : -1);
export const randomPick:Picker = (list) => list[Math.random() * list.length | 0];
export const createList:Creators = (amount, creators) =>
  Array(amount)
    .fill(0)
    .map(() => creators())
  ;
export const nextOf:PickerBy = (list, current) => list[(list.indexOf(current) + 1) % list.length];
```

## Installation

```sh
npm add qwik-saga
# or yarn
yarn add qwik-saga
# or pnpm
pnpm add qwik-saga
```