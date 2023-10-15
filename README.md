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

## generator on Qwik server side 

[streaming-responses](https://qwik.builder.io/docs/server$/#streaming-responses)

```ts
import { server$ } from '@builder.io/qwik-city';
 
const stream = server$(async function* () {
  for (let i = 0; i < 10; i++) {
    yield i;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
});
 
export default component$(() => {
  const message = useSignal('');
  return (
    <div>
      <button
        onClick$={async () => {
          const response = await stream();
          for await (const i of response) {
            message.value += ` ${i}`;
          }
        }}
      >
        start
      </button>
      <div>{message.value}</div>
    </div>
  );
});
```