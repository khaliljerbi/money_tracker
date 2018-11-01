import React, { Component } from 'react'
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import Transactions from "../Transactions";
import { Loader } from 'semantic-ui-react';
class TransactionsDetails extends Component {
  componentDidUpdate() {
    console.log('updated');
  }
  render() {
      const { account, transactions }= this.props;
      let filteredTransactions= []
      if (account && transactions){
        filteredTransactions = transactions.filter(transaction => transaction.expenseName === account.name).concat(transactions.filter(transaction => transaction.incomeName === account.name));
        return (
            <Transactions accountName= {account.name} filteredData= {filteredTransactions} />
          )
       }

       else {
           return <Loader active inline size="small">
           Loading
         </Loader>
       }
      
    
  }
}

export default compose(
    firestoreConnect(props => [{collection: 'accounts', storeAs: 'account' , doc : props.match.params.id}, {collection: 'transactions'}]),
    connect(({firestore: {ordered}}, props) => ({
      account: ordered.account && ordered.account[0],
      transactions: ordered.transactions
    }))
  )(TransactionsDetails);
