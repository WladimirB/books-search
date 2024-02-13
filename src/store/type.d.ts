export type DispatchType = (args: Action | AppAction) => Action
export type AppAction<T = null> = { readonly payload?: T } & Action
