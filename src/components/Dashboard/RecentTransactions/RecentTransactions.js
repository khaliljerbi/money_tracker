import React, { Component } from "react";
import {
  Segment,
  List,
  Button,
  Icon,
  Label,
  Divider,
  Loader
} from "semantic-ui-react";
import { connect } from "react-redux";
import { get_Transactions } from ".././../../actions/Dashboard/RecentTransactions/actions";
import Modal from "../../UI/Modal/Modal";
import moment from "moment";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Aux from "../../../HOC/hoc";
import TransactionFormEdit from "../TransactionFormEdit/TransactionFormEdit";
class RecentTransactions extends Component {
  state = {
    open: false,
    transaction: {}
  };
  
  componentWillMount() {
    this.props.get_Transactions();
  }

  componentWillReceiveProps(nextProps) {
      if(nextProps.newTransaction){
        nextProps.recents.transactions.unshift(nextProps.nexTransaction);
      }
  }
 
  show = (size,transaction) => () => this.setState({ size,transaction:transaction, open: true });

  close = () => this.setState({ open: false });

  onDeleteHandler = id => {
    const { firestore } = this.props;
    firestore
      .delete({ collection: "transactions", doc: id })
      .then(() => this.setState({ open: false }));
  };
  render() {
    let recentTransaction = [...this.props.recents.transactions];
    
    let transactions = <Loader size="medium" active inline>
    {" "}
    Loading{" "}
  </Loader>
    if (this.props.afterFilterTransactions) {
      recentTransaction = [...this.props.afterFilterTransactions];
    }
    if (recentTransaction && recentTransaction.length !== 0) {
      transactions = recentTransaction.map(transaction => (
        <Aux key={transaction.id}>
          {transaction.data.transactionType === "Expense" ? (
            <Aux>
              <List.Item>
                <List.Content floated="right">
                  <p>
                    <span
                      style={{
                        color: "red"
                      }}
                    >
                      {parseFloat(transaction.data.expenseValue)} &nbsp;{" "}
                      {transaction.data.expenseCurrency}
                    </span>
                    <Button
                      onClick={this.show("large",transaction)}
                      circular
                      basic
                      floated="right"
                      icon="pencil"
                    />
                  </p>
                </List.Content>

                <List.Content>
                  {moment(new Date(transaction.data.date.seconds * 1000)).format(
                    "DD MMM"
                  )}{" "}
                  &nbsp; {transaction.data.expenseName}{" "}
                  {<Icon name="long arrow alternate right" />}
                  {transaction.data.expenseTags.map(tag => (
                    <Label key={Math.random()} size="medium">
                      {" "}
                      {tag}{" "}
                    </Label>
                  ))}
                  &nbsp; {transaction.data.note}
                </List.Content>
              </List.Item>
              <Divider />
            </Aux>
          ) : transaction.data.transactionType === "Income" ? (
            <Aux>
              <List.Item>
                <List.Content floated="right">
                  <p>
                    <span
                      style={{
                        color: "green"
                      }}
                    >
                      {parseFloat(transaction.data.incomeValue)} &nbsp;{" "}
                      {transaction.data.incomeCurrency}
                    </span>
                    <Button
                      onClick={this.show("large",transaction)}
                      circular
                      basic
                      floated="right"
                      icon="pencil"
                    />
                     
                  </p>
                </List.Content>

                <List.Content>
                  {moment(new Date(transaction.data.date.seconds * 1000)).format(
                    "DD MMM"
                  )}{" "}
                  &nbsp; {transaction.data.incomeName}{" "}
                  {<Icon name="long arrow alternate left" />}
                  {transaction.data.incomeTags.map(tag => (
                    <Label key={Math.random()} size="medium">
                      {" "}
                      {tag}{" "}
                    </Label>
                  ))}
                  &nbsp; {transaction.data.note}
                </List.Content>
              </List.Item>
              <Divider />
            </Aux>
          ) : transaction.data.transactionType === "Transfer" ? (
            <Aux>
              <List.Item>
                <List.Content floated="right">
                  <p>
                    <span
                      style={{
                        color: "gray"
                      }}
                    >
                      {transaction.data.expenseCurrency ===
                      transaction.data.incomeCurrency ? (
                        <span>
                          {" "}
                          {parseFloat(transaction.data.expenseValue)} &nbsp;{" "}
                          {transaction.data.expenseCurrency}
                        </span>
                      ) : (
                        <span>
                          {parseFloat(transaction.data.expenseValue)} &nbsp;{" "}
                          {transaction.data.expenseCurrency}{" "}
                          <Icon name="long arrow alternate right" />{" "}
                          {parseFloat(transaction.data.incomeValue)} &nbsp;{" "}
                          {transaction.data.incomeCurrency}
                        </span>
                      )}
                    </span>
                    <Button
                      onClick={this.show("large",transaction)}
                      circular
                      basic
                      floated="right"
                      icon="pencil"
                    />
                  </p>
                </List.Content>

                <List.Content>
                  {moment(new Date(transaction.data.date.seconds * 1000)).format(
                    "DD MMM"
                  )}{" "}
                  &nbsp; {transaction.data.expenseName}{" "}
                  {<Icon name="long arrow alternate right" />}
                  {transaction.data.incomeName}
                  &nbsp; {transaction.data.note}
                </List.Content>
              </List.Item>
              <Divider />
            </Aux>
          ) : null}
        </Aux>
      ));
      return (
        <Aux>
          <Modal
            open={this.state.open}
            modify
            title="Edit Transaction"
            size="large"
            deleteItem = {() => this.onDeleteHandler(this.state.transaction.id)}
            close={this.close}
          >
            <TransactionFormEdit transaction = {this.state.transaction} />
          </Modal>
          <Segment attached>
            <List verticalAlign="middle">{transactions.slice(0,6)}</List>
          </Segment>
        </Aux>
      );
    } 
    else {
      return (
        <div>
          <p style={{fontSize: '15px'}}>No recent transactions found !</p>
        </div>
      );
    }
  }
}

export default compose(
  firestoreConnect([{ collection: "transactions" }]),
  connect((state, props) => ({
    transactions: state.firestore.ordered.transactions,
    recents: state.transactions,
    nexTransaction : state.transactions.newTransaction
  }), {get_Transactions})
)(RecentTransactions);
