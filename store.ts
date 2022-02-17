import { createStore, combineReducers, applyMiddleware ,Store} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  authReducer,
} from 'reducers/authRed'
import {statusReducer} from 'reducers/statusRed'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { Middleware, MiddlewareAPI, Dispatch, Action } from "redux";


// function customDispatch() {
//   type MyAction = { type: 'LOADING' } | { type: 'FINISH' }

//   // dispatch that expects action union
//   type MyDispatch = Dispatch<MyAction>

//   const customDispatch: Middleware =
//     (api: MiddlewareAPI<MyDispatch>) => next => action => {
//       api.dispatch({ type: 'LOADING' })
//       const returnValue = next(action)
//       api.dispatch({ type: 'FINISH' })
//       return returnValue
//     }
//     return customDispatch
// }
type myMiddlerProp={
  dispatch:Dispatch
}

const myMiddler:Middleware=({dispatch}:myMiddlerProp)=>(next:Dispatch)=>action=>{
  console.log('log')
  return next(action)
}

function logger() {
  const loggerMiddleware: Middleware =
    ({ getState }: MiddlewareAPI) =>
    (next: Dispatch) =>
    action => {
      console.log('will dispatch', action)
      // Call the next dispatch method in the middleware chain.
      const returnValue = next(action)

      console.log('state after dispatch', getState())

      // This will likely be the action itself, unless
      // a middleware further in chain changed it.
      return returnValue
    }

  return loggerMiddleware
}


const reducer = combineReducers({
  authReducer:authReducer,
  statusReducer:statusReducer,
})


const middleware = [thunk]

const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware,myMiddler))
)

export const persistor = persistStore(store)

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
