import React, { Component } from 'react'
import { Form, Grid, Button  , Checkbox , Input} from "semantic-ui-react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
class AccountForm extends Component {
  state={
    currency: [],
    showOnDashboard: false,
    name: '',
    group: '',
    usdBalance:'',
    eurBalance:'',
    jpyBalance:'',
    usdCheck: true
  }
  onSubmitData = e => {
    const newAccount= {
      name: this.state.name,
      group: this.state.group,
      usdBalance: this.state.usdBalance,
      eurBalance: this.state.eurBalance,
      jpyBalance: this.state.jpyBalance,
      currency: this.state.currency,
      showOnDashboard: this.state.showOnDashboard
    }
    const {firestore} = this.props;

    firestore.add({collection: 'accounts'}, newAccount);

  }
  handleMultipleCheckbox  = (e,value,checked) => {
    const addedCurrency = [...this.state.currency];
    if (checked) {
      addedCurrency.push(value);
    }
    else {
      addedCurrency.splice(addedCurrency.indexOf(value),1);

    }
    this.setState({currency:addedCurrency});
  }
  render() {
    console.log(this.props);
    const {accountgp} = this.props;
    return (
        <Form onSubmit={this.onSubmitData}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={9}>
              <Form.Field required>
              <label>Account Name</label>
              <Input placeholder='Account Name' onChange={e => this.setState({name:e.target.value})} />
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={7}>
              <Form.Field>
              <label>Group</label>
                <select
                  name="action"
                  placeholder=""
                  onChange={(e) => this.setState({ group: e.target.value})}
                >
                 {accountgp.map(group => <option key={group.id}>
                  {group.groupName}
                 </option>)}
                </select>
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={9}>
              <Form.Field>
              <Form.Checkbox label='USD' name='USD'  value='USD' onChange={(e, {value, checked}) => this.handleMultipleCheckbox(e, value, checked)}  />
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={7}>
              <Form.Field>
              <Input
                  label="USD"
                  labelPosition="right"
                  type="number"
                  required
                  step = "0.01"
                  placeholder= "Balance"
                  onChange={e => this.setState({usdBalance: e.target.value})}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={9}>
              <Form.Field>
              <Checkbox label='EUR' value='EUR' name='EUR' onChange={(e, {value, checked}) => this.handleMultipleCheckbox(e, value, checked)}/>
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={7}>
              <Form.Field>
              <Input
                  label="EUR"
                  labelPosition="right"
                  type="number"
                  required
                  step = "0.01"
                  placeholder= "Balance"
                  onChange={e => this.setState({eurBalance: e.target.value})}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={9}>
              <Form.Field>
              <Checkbox label='JPY'  value='JPY' name='JPY' onChange={(e, {value, checked}) => this.handleMultipleCheckbox(e, value, checked)}/>
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={7}>
              <Form.Field>
              <Input
                  label="JPY"
                  labelPosition="right"
                  type="number"
                  required
                  step = "0.01"
                  placeholder= "Balance"
                  onChange={e => this.setState({jpyBalance: e.target.value})}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={9}>
            <Checkbox label='Show on Dashboard' onChange={(e,{checked}) => this.setState({showOnDashboard: checked})} />
            </Grid.Column>
            <Grid.Column width={7}>
              <Button  content='Save Account' fluid primary />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    )
  }
}

export default compose(
  firestoreConnect([{collection:'accounts'},{collection:'accountgroup'}]),
  connect( (state,props) => ({
    accounts:state.firestore.ordered.accounts,
    accountgp: state.firestore.ordered.accountgroup
  }))
)(AccountForm);
