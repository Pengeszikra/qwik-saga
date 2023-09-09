import { Dispatch, useMemo } from "react";
// @ts-ignore
import { put, Saga } from "redux-saga/effects";
import useSagaReducer from "use-saga-reducer";


export type ActionType<T> = T extends { type: infer U, payload: infer P } 
  ? { type: U, payload: P } 
  : never;

export type TypedActionMap<EnumType extends Record<string, string>, UnionType> = {
  [T in keyof EnumType]: 
    (payload: Extract<ActionType<UnionType>, { type: T }>["payload"]) 
    => void;
};

export type TypedGeneratorMap<EnumType extends Record<string, string>, UnionType> = {
  [T in EnumType[keyof EnumType]]: 
    (payload: Extract<ActionType<UnionType>, { type: T }>["payload"]) 
    => Generator;
};


export function typedActionMapFactory<
  EM extends Record<string, string>, 
  AM
>(keys: EM, dispatch: Dispatch<AM>): TypedActionMap<EM, AM> {
  return Object.keys(keys).reduce((acc, type) => ({
    ...acc,
    [type]: (payload: unknown) => {
      dispatch({ type, payload } as AM);
    }
  }), {} as TypedActionMap<EM, AM>);
}

export function typedPutActionMapFactory<
  EM extends Record<string, string>, 
  AM
>(keys: EM): TypedGeneratorMap<EM, AM> {
  return Object.keys(keys).reduce((acc, type) => ({
    ...acc,
    [type]: function* putGenerator(payload: unknown) {
      yield put({ type, payload });
    }
  }), {} as TypedGeneratorMap<EM, AM>);
}

export type UseSagaReturn<ST, Put> = [state: ST, put: Put];

export const useSagaFactory = <
  AM, 
  ST,
  PT extends Record<string, string>,
>(
  reducer: (st: ST, action: AM) => ST,
  initialState: ST,
  labels: PT,
  saga: Saga,
)  => {
  type SagaResult = [state: ST, dispatch: Dispatch<AM>];
  const [state, dispatch]: SagaResult = useSagaReducer(saga, reducer, initialState);
  const put = useMemo(() => typedActionMapFactory(labels, dispatch), [dispatch, labels]);
  return [state, put] as UseSagaReturn<ST, TypedActionMap<PT, AM>>;
};