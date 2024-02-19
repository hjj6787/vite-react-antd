import React from "react"
import { Layout } from "antd";
import styles from './css/layout.module.css'

const { Header, Footer, Sider, Content } = Layout;

const layoutStyle = {
    height:'100%',
    width:'100%'
  };
const layoutPage=()=>{

    return<>
    <Layout style={layoutStyle} className={styles.Layoutcot}>
      <Header>Header</Header>
      <Layout>
      <Sider width="15%" height="100%">
          Sider
      </Sider>
        <Content>Content</Content>
        
      </Layout>
      <Footer className={styles.footcon}>Footer</Footer>
    </Layout>
    </>
}

export default layoutPage;