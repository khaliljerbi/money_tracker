import React, { Component } from "react";
import {
  Segment,
  Header,
  Button,
  Dropdown,
  Label,
  Icon,
  Container,
  Grid,
  Table
} from "semantic-ui-react";
import { connect } from "react-redux";
import { firestore as db } from "../../store";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import RecentTransactions from "../Dashboard/RecentTransactions/RecentTransactions";
import Aux from "../../HOC/hoc";
import TransactionForm from "../Dashboard/TransactionForm/TransactionForm";
import Modal from "../UI/Modal/Modal";
import AccountFilter from "../Accounts/AccountFilter/AccountFilter";
import { filter_data } from "../../actions/Dashboard/RecentTransactions/actions";
const durationOptions = [
  { key: "1", value: "Today", text: "Today" },
  { key: "2", value: "Yesterday", text: "YesterDay" },
  { key: "3", value: "Last 7 Days", text: "Last 7 Days" },
  { key: "4", value: "Last Month", text: "Last Month" }
];
class Transactions extends Component {
  state = {
    openModal: false,
    openModalFilter: false,
    filterName: true,
    transactionsAfterFilter: this.props.filteredData,
    totalIncome: 0,
    totalExpense: 0,
    totalValue: 0,
    tags: []
  };
  
  componentDidMount() {
    let totalIncome =0 ;
    let totalExpense = 0;
    if (this.state.transactionsAfterFilter) {
        this.state.transactionsAfterFilter.forEach(transaction => {
          if (transaction.transactionType === 'Income'){
            totalIncome = totalIncome + parseFloat(transaction.incomeValue)
          }
          if (transaction.transactionType === 'Expense'){
            totalExpense = totalExpense+ parseFloat(transaction.expenseValue)
          }
        })
        this.setState({totalIncome: totalIncome , totalExpense : totalExpense , totalValue : totalIncome + totalExpense})
    }
    else {
      db.collection('transactions').get().then(data => {
        data.forEach(transaction =>  {
          if (transaction.data().transactionType === 'Income'){
            totalIncome = totalIncome + parseFloat(transaction.data().incomeValue)
          }
          if (transaction.data().transactionType === 'Expense'){
            totalExpense = totalExpense+ parseFloat(transaction.data().expenseValue)
          }
          
        } )
        this.setState({totalIncome: totalIncome , totalExpense : totalExpense , totalValue : totalIncome + totalExpense})
      })
    }
    
  }
  
  onFilterDataHandler = () => {
    
      const {filterName , filterTags} = this.props.transaction;
      this.props.filter_data({name:filterName , tags:filterTags});
  }

  onResetDataHander = () => {

  }
 
  show = size => () => this.setState({ size, openModal: true });
  showFilter = size => () => this.setState({ size, openModalFilter: true });
  close = () => this.setState({ openModal: false , openModalFilter: false });
  render() {
    return (
      <Aux>
        <Modal
          open={this.state.openModalFilter}
          modify={false}
          title="Filter Transaction"
          size="small"
          filter
          filterHandler= {this.onFilterDataHandler}
          close={this.close}
        >
          <AccountFilter />
        </Modal>
        <Modal
          open={this.state.openModal}
          modify={false}
          title="New Transaction"
          size="large"
          close={this.close}
        >
          <TransactionForm />
        </Modal>
        <Segment>
          <Header as="h2" attached="top" block>
            <Button.Group>
              <Button
                labelPosition="left"
                icon="plus"
                content="New"
                onClick={this.show("large")}
              />
              <Dropdown
                icon="calendar alternate outline"
                selection
                floating
                labeled
                button
                className="icon"
                options={durationOptions}
              />
              <Button icon="filter" onClick={this.showFilter('small')} />
            </Button.Group>
          </Header>
          {this.props.filteredData && this.state.filterName ? (
            <Container fluid>
              <div
                style={{
                  padding: "0.75em",
                  borderBottom: "1px solid #d4d4d5",
                  background: "#f8f8f8",
                  boxShadow: "inset 0 1px 1px 0 rgba(34,36,38,.15)"
                }}
              >
                <Label>
                  <Icon name="credit card outline" />
                  {this.props.accountName}
                  <Icon
                    name="delete"
                    onClick={() =>
                      this.setState({
                        filterName: false,
                        transactionsAfterFilter: this.props.transactions
                      })
                    }
                  />
                </Label>
              </div>
            </Container>
          ) : null}
          <RecentTransactions
            afterFilterTransactions={this.state.transactionsAfterFilter}
          />
          <Grid>
            <Grid.Row>
              <Grid.Column width={11} />
              <Grid.Column width={5}>
                <Table basic="very">
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Total Income: </Table.Cell>
                      <Table.Cell/>
                      <Table.Cell><span style={{color: 'green'}}>{this.state.totalIncome.toFixed(2)} USD</span></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Total Expense: </Table.Cell>
                      <Table.Cell/>
                      <Table.Cell><span style={{color: 'red'}}>{this.state.totalExpense.toFixed(2)} USD</span></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell/>
                      <Table.Cell/>
                      <Table.Cell><span style={{color: this.state.totalValue >=  0 ? 'green' : 'red'}}>{this.state.totalValue.toFixed(2)} USD</span></Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Aux>
    );
  }
}

export default compose(
  firestoreConnect([
    { collection: "transactions" },
    { collection: "accounts" }
  ]),
  connect((state, props) => ({
    transactions: state.firestore.ordered.transactions,
    accounts: state.firestore.ordered.accounts,
    transaction: state.transactions
  }), {filter_data})
)(Transactions);
