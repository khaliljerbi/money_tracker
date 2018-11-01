import * as actionTypes from "../../actions/Accounts/types";
const initialState= {
    accounts: []
}
 const reducer= (state=initialState, action) => {
     switch(action.type) {
         case actionTypes.GET_ACCOUNTS:
            return {
                ...state,
                accounts: action.payload
            }

            default : return state;
     }
    
    
}

export default reducer;