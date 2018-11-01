import React, { Component } from "react";
import { Tab} from "semantic-ui-react";
import './TransactionForm.css';
import ExpenseIncomeForm from '../../SharedComponents/CommonForm/ExpenseIncomeForm';

import TransferForm from "./TransferForm/TransferForm";



class TransactionForm extends Component {
  
 render(){
  const panes = [
    { menuItem: 'Expense', render: () => <Tab.Pane><ExpenseIncomeForm fromTo="From" /></Tab.Pane> },
    { menuItem: 'Transfer', render: () => <Tab.Pane><TransferForm /></Tab.Pane> },
    { menuItem: 'Income',render: () => <Tab.Pane ><ExpenseIncomeForm   fromTo="To"/></Tab.Pane>  },
  ]
    return (

      <Tab  menu={{ attached: true, tabular: false }} panes={panes}/>

    );
  }
}

export default TransactionForm;
