import React, { Component } from "react";
import { Container, Header, Icon } from "semantic-ui-react";

import "./FormContainer.css";
class FormContainer extends Component {
  state = {
    showContent: true
  };
  showContentHandler = () => {
    this.setState(prevState => ({ showContent: !prevState.showContent }));
  };
  render() {
    return (
      <Container>
        <Header size="large">
          <span onClick={this.showContentHandler}>
            <Icon
              name="dropdown"
              rotated= {this.state.showContent ? null : 'counterclockwise'}
              size="small"
            />{" "}
            {this.props.title}{" "}
          </span>
        </Header>
        {this.state.showContent && this.props.children}
      </Container>
    );
  }
}

export default FormContainer;
