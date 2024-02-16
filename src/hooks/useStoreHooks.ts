import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState } from 'store'
import { DispatchType } from 'store/type'

type DispatchFunc = () => DispatchType
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
