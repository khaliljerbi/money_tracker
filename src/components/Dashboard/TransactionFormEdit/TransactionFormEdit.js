import React, { Component } from "react";
import { Tab} from "semantic-ui-react";
import '../TransactionForm/TransactionForm.css';
import ExpenseIncomeFormEdit from './ExpenseIncomeEdit/ExpenseIncomeEdit';
import TransferFormEdit from "./TransferEdit/TransferEdit";



class TransactionFormEdit extends Component {

 render(){
  const panes = [
    { menuItem: 'Expense', render: () => <Tab.Pane><ExpenseIncomeFormEdit transaction= {this.props.transaction} fromTo="From" /></Tab.Pane> },
    { menuItem: 'Transfer', render: () => <Tab.Pane><TransferFormEdit transaction= {this.props.transaction} /></Tab.Pane> },
    { menuItem: 'Income',render: () => <Tab.Pane ><ExpenseIncomeFormEdit  transaction= {this.props.transaction}  fromTo="To"/></Tab.Pane>  },
  ]
   
    return (
      
      <Tab defaultActiveIndex={this.props.transaction.data.transactionType === 'Expense' ? '0' : this.props.transaction.data.transactionType === 'Transfer' ? '1' : '2'}  menu={{ attached: true, tabular: false }} panes={panes}/>

    );
  }
}

export default TransactionFormEdit;
