
let initialState = {
    username: "zhengtao"
}

export function usernameReducer (state = initialState, action){
    if(action.type === "updateUsername"){
        return {username: action.payload};
    }
    else{
        return state;
    }
}