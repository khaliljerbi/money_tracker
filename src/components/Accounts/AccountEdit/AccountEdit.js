import React, { Component } from 'react'
import { Form, Grid, Button  , Checkbox , Input} from "semantic-ui-react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";


class AccountEdit extends Component {
  state={
    currency: this.props.account.currency,
    showOnDashboard: this.props.account.showOnDashboard,
    name: this.props.account.name,
    group: this.props.account.group,
    usdBalance:this.props.account.usdBalance,
    eurBalance:this.props.account.eurBalance,
    jpyBalance: this.props.account.jpyBalance,
    usdCheck: true
  }
  onSubmitEditHandler = e => {
    const updatedAccount= {
      name: this.state.name,
      group: this.state.group,
      usdBalance: this.state.usdBalance,
      eurBalance: this.state.eurBalance,
      jpyBalance: this.state.jpyBalance,
      currency: this.state.currency,
      showOnDashboard: this.state.showOnDashboard
    }
    const {firestore} = this.props;

    firestore.update({collection: 'accounts', doc: this.props.account.id}, updatedAccount);

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
    const {accountgp} = this.props;
    return (
        <Form onSubmit={this.onSubmitEditHandler}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={9}>
              <Form.Field required>
              <label>Account Name</label>
              <Input placeholder='Account Name' defaultValue ={this.props.account.name} onChange={e => this.setState({name:e.target.value})} />
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={7}>
              <Form.Field>
              <label>Group</label>
                <select
                  name="action"
                  defaultValue ={this.props.account.group}
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
              <Form.Checkbox label='USD' name='USD'  value='USD' checked= {this.props.account.currency.filter(p => p === 'USD').length > 0 ? true : false} onChange={(e, {value, checked}) => this.handleMultipleCheckbox(e, value, checked)}  />
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={7}>
              <Form.Field>
              <span style={{color: this.state.usdBalance > 0 ? 'green' : 'red' , float:'right'}}> {parseFloat(this.state.usdBalance).toFixed(2)} USD </span>
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={9}>
              <Form.Field>
              <Checkbox label='EUR' value='EUR' name='EUR' checked= {this.props.account.currency.filter(p => p === 'EUR').length > 0 ? true : false} onChange={(e, {value, checked}) => this.handleMultipleCheckbox(e, value, checked)}/>
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={7}>
              <Form.Field>
              <span style={{color: this.state.eurBalance > 0 ? 'green' : 'red' , float:'right'}}> {parseFloat(this.state.eurBalance).toFixed(2)} EUR </span>
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={9}>
              <Form.Field>
              <Checkbox label='JPY' name='JPY' value='JPY' checked= {this.props.account.currency.filter(p => p === 'JPY').length > 0 ? true : false} onChange={(e, {value, checked}) => this.handleMultipleCheckbox(e, value, checked)} />
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={7}>
              <Form.Field>
              <span style={{color: this.state.jpyBalance > 0 ? 'green' : 'red' , float:'right'}}> {parseFloat(this.state.jpyBalance).toFixed(2)} JPY </span>
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
)(AccountEdit);
