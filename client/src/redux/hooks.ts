import type { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import type { RootState } from '@reduxjs/toolkit/query';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

type DispatchFunc = () => ThunkDispatch<RootState, any, AnyAction>;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
