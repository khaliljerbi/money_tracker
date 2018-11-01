import React from 'react'
import { Layout } from "antd";

const {Footer} = Layout;
const footer =  props => {
  return (
      
        <Footer style={{ textAlign: 'center' }}>  Astrolab &copy; {new Date().getFullYear()}  </Footer>
     
  )
}

export default footer;