//React Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './stylesheets/index.css';
import { Layout, Menu } from 'antd';
import logo from './img/zady.png';



import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  RightOutlined
} from '@ant-design/icons';

import MasterForm from './components/Form/MasterForm'

const { Header, Sider, Content } = Layout; // 3 Layout Components Sider = Menu
class App extends React.Component {
  state = { // Collapse menu
    collapsed: true,// Default start app with collapsed menu
  };

  toggle = () => {
    this.setState({ // setting collapsible state
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" > 
            <img src={logo}/>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<RightOutlined />}>
              OurAuthors
            </Menu.Item>
            <Menu.Item key="2" icon={<RightOutlined />}>
              About Us
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
             Novel Generator
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <MasterForm></MasterForm>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

//Render to root from index.html
ReactDOM.render(<App/>,document.getElementById('app'));
export default App;//exporting  App;
