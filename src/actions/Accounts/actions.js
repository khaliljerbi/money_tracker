 import * as actionTypes from "./types";
import { firestore as db } from "../../store";


export const get_Accounts = () => dispatch => {
  const accounts = [];
    db.collection("accounts")
      .get()
      .then(data => {
        data.forEach(account => accounts.push({id: account.id , data: account.data()}));
        dispatch({
            type: actionTypes.GET_ACCOUNTS,
            payload: accounts
        })
      });
};