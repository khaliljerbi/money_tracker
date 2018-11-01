import React, { Component } from "react";
import { Modal, Button, Icon } from "semantic-ui-react";

class CustomModal extends Component {
  render() {
    return (
      <div>
        <Modal
          size={this.props.size}
          open={this.props.open}
          onClose={this.props.close}
          closeIcon
        >
          <Modal.Header>
            <Icon size="small" name="file alternate outline" />{this.props.title}
          </Modal.Header>
          <Modal.Content>{this.props.children}</Modal.Content>
          {this.props.modify ?  <Modal.Actions>
            <Button
              negative
              icon="trash alternate"
              labelPosition="right"
              onClick={this.props.deleteItem}
              content="Delete"
            />
          </Modal.Actions>: null }
          {this.props.filter ?  
            <Modal.Actions>
            <Button>Reset</Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              onClick={this.props.filterHandler}
              content="Apply"
            />
          </Modal.Actions>: null }
         
        </Modal>
      </div>
    );
  }
}

export default CustomModal;
