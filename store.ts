import { createStore, combineReducers, applyMiddleware ,Store} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  authReducer,
} from 'reducers/authRed'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const reducer = combineReducers({
  authReducer:authReducer,
})


const middleware = [thunk]

const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export const persistor = persistStore(store)

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
