import React, { Component } from 'react'
import {Message , Icon} from 'semantic-ui-react';
class Budget extends Component {
  render() {
    return (
      <Message icon>
      <Icon name='hourglass half' size='big'/>
      <Message.Content>
        <Message.Header><h2><strong> Not ready yet</strong></h2></Message.Header>
        <p style={{fontSize:'16px'}}> This will be available later ! :)</p>
      </Message.Content>
    </Message>
    )
  }
}
export default Budget;
