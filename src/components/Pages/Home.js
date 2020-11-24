//React Libraries
import React from 'react';

import 'antd/dist/antd.css';
import '../../stylesheets/index.css';
import { Layout, Menu } from 'antd';
import logo from '../../img/zady.png';
import {Link} from 'react-router-dom'



import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  RightOutlined,
  HomeOutlined
} from 
'@ant-design/icons';

import MasterForm from '../Form/MasterForm'
import MenuItem from 'antd/lib/menu/MenuItem';
const { Header, Sider, Content } = Layout; // 3 Layout Components Sider = Menu


class Home extends React.Component {
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
                        <img src={logo} alt="Zady logo"/>
                    </div>
                
                    <Menu theme="dark" mode="inline"  defaultSelectedKeys={['1']}>
                        <MenuItem key="1" icon={<HomeOutlined />}>
                            <Link to="/">
                                Home
                            </Link> 
                        </MenuItem>
                        <Menu.Item key="2" icon={<RightOutlined />}>
                            <Link to="/OurAuthors">
                                OurAuthors
                            </Link>
                        </Menu.Item>   
                        <Menu.Item key="3" icon={<RightOutlined />}>
                            <Link to="/About"> 
                                About Us
                            </Link>
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
export default Home;