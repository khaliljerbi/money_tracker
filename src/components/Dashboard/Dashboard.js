import React, { Component } from "react";
import { Segment, Grid } from "semantic-ui-react";
import TransactionForm from "./TransactionForm/TransactionForm";
import FormContainer from "../SharedComponents/FormContainer/FormContainer";
import RecentTransactions from "./RecentTransactions/RecentTransactions";
import NetWorth from "./NetWorth/NetWorth";
class Dashboard extends Component {
  render() {
    const { Row, Column } = Grid;
    return (
      <div>
        <Segment>
          <Grid stackable>
            <Row>
              <Column width={6}>
                <FormContainer title="NET WORTH">
                  <NetWorth />
                </FormContainer>
              </Column>
              <Column width={10}>
                <FormContainer title="NEW TRANSACTION">
                  <TransactionForm />
                </FormContainer>
                <br />
                <FormContainer title="RECENT TRANSACTIONS">
                  <RecentTransactions />
                </FormContainer>
              </Column>
            </Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}
export default Dashboard;
