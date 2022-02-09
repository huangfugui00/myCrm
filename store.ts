import { createStore, combineReducers, applyMiddleware ,Store} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  customerReducer,
} from 'reducers/customerRed'

const reducer = combineReducers({
  customerReducer:customerReducer,
})

const initialState = {}


const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)



export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store
