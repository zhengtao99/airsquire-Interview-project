
import  { legacy_createStore as createStore} from "redux"
import { usernameReducer } from "./reducer";

export const store = createStore(usernameReducer);