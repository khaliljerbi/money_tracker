import React, { Component } from 'react'
import { Message, Icon , Button } from "semantic-ui-react";
class SharedMessage extends Component {
  render() {
    return (
        <Message icon>
        <Icon name='user circle' size='big'/>
        <Message.Content>
          <Message.Header><h2><strong> This is just a Demo App !</strong></h2></Message.Header>
          <p style={{fontSize:'16px'}}>You are logged in as a demo user with sample data generated to show
          you how things might look like.<br/> <br/> All the changes you make will only
          be stored locally on your device.</p>
          <Button icon labelPosition="right" >
            <a  href ="https://app.moneytracker.cc/" style={{ textDecoration:'none', color:"gray"}}> Go to live App </a>
            <Icon name="sign in alternate" />
          </Button>
        </Message.Content>
      </Message>
    )
  }
}

export default  SharedMessage;
