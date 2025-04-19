import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import AuthReducer from "@store/slices/auth.slice";
import ArticleReducer from "@store/slices/article.slice";
import FaqsReducer from "@store/slices/faqs.slice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    article: ArticleReducer,
    faqs: FaqsReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
