import * as actionTypes from '../../actions/Dashboard/RecentTransactions/types'
const initialState= {
  transactions:[],
  filterName: '',
  filterTags:[],
  newTransaction: {}
}
 const reducer= (state=initialState, action) => {
    switch(action.type){
        case actionTypes.GET_TRANSACTIONS:
        return {
            ...state,
            transactions:action.payload
        }
        case actionTypes.ADD_DATA:
        return {
            ...state,
            newTransaction: action.payload
        }
        case actionTypes.SET_FILTER_NAME:
        return {
            ...state,
            filterName:action.payload
        }
        case actionTypes.SET_FILTER_TAGS:
        return {
            ...state,
            filterTags:action.payload
        }
        case actionTypes.FILTER_DATA:
        return {
            ...state,
            transactions:action.payload
        }
        default: return state;
    }
    
}

export default reducer;