import * as actionTypes from "./types";
import { firestore as db } from "../../../store";

export const get_Transactions = () => dispatch => {
  const transactions = [];
  db.collection("transactions")
    .orderBy("date", "desc")
    .get()
    .then(data => {
      data.forEach(transaction => transactions.push({id: transaction.id ,data:transaction.data()}));
      dispatch({
        type: actionTypes.GET_TRANSACTIONS,
        payload: transactions
      });
    });
};

export const add_data  = data => dispatch => {
  db.collection('transactions').add(data).then(data => data.get().then(data => dispatch({
    type: actionTypes.ADD_DATA,
    payload : {id : data.id , data: data.data()}
  })));
  
}

export const set_FilterName = data => {
  return {
    type: actionTypes.SET_FILTER_NAME,
    payload: data
  };
};
export const set_FilterTags = data => {
  return {
    type: actionTypes.SET_FILTER_TAGS,
    payload: data
  };
};
export const filter_data = filterData => dispatch => {
  const transactions = [];
  let filteredArray = [];
  db.collection("transactions")
    .get()
    .then(data => {
      data.forEach(transaction => transactions.push(transaction.data()));

      filteredArray = transactions
        .filter(
          transaction =>
            transaction.expenseName === filterData.name &&
            JSON.stringify(transaction.expenseTags) === JSON.stringify(filterData.tags)
        )
        .concat(
          transactions.filter(
            transaction =>
              transaction.incomeName === filterData.name &&
              JSON.stringify(transaction.incomeTags) === JSON.stringify(filterData.tags)
          )
        );
        console.log(filteredArray);
      

      dispatch({
        type: actionTypes.FILTER_DATA,
        payload: filteredArray
      });
    });
};
