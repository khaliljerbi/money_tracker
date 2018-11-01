import React from 'react'
import { Layout } from "antd";

const {Content} = Layout;
const mainContent =  props => {
  return (
      
      
        <Content style={{ margin: '24px 16px 0', padding: '24px' }}> {props.content}</Content>
     
  )
}

export default mainContent;