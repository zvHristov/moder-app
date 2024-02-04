import { RootState,  } from 'store/store';
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

export const useAuthSelector: TypedUseSelectorHook<RootState> = useSelector;