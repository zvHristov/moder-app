import React, { } from 'react';
import { useAppDispatch } from 'shared/redux-hooks';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from 'store/store';

import { useAuthSelector } from 'entities/auth/model/selectors';
import { logOut } from 'features/auth/by-oauth';

// user ui
import {  
    UserOutlined, 
    MailOutlined, 
    AppstoreOutlined,
 } from '@ant-design/icons';
import { 
    Layout, 
    Flex,
    Col, 
    Row,
    Avatar,
    Menu,
    Button,
} from 'antd';
import type { MenuProps } from 'antd';
const { Sider, Content, Header } = Layout;


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const UserPage = () => {
    const dispatch: AppDispatch =  useAppDispatch();
    const navigate = useNavigate();

    const handligLogOut = async () => {
        try {
            await dispatch(logOut());
            navigate('/');
          } catch (e) {
            console.error(e);
          }
    }

    const auth = useAuthSelector((state) => state.auth.auth);
    const itemsMenu: MenuItem[] = [
        getItem('Overview', 'Overview', <MailOutlined />, [
            getItem('some sub', '1'),
          ]),
        
          getItem('Cummunity', 'sub2', <AppstoreOutlined />, [
            getItem('Cummunity group 1', '1'),
            getItem('Cummunity group 2', '2'),
        
            getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
          ]),
    ];

    return (
        <Layout style={{
             backgroundColor: '#F0F4FC',
        }}>
        
        <Layout>
            <Header 
                style={{
                    padding: '0',
                    lineHeight: '3rem',
                    height: '3rem',
                    backgroundColor: '#FFF',
                    borderBottom: '1px solid #EAEAEA',
                    boxShadow: '2px 4px 5px 0px rgba(99,90,99,0.36)',
                }}
            >
                <Row>
                <Col 
                    span={8}
                    
                >
                    <Flex
                        gap={'small'}
                        align={'center'}
                        
                    >
                        <img
                            src='images/logo.svg'
                            alt='logo'
                            width={'35px'}
                         />
                          <img
                            src='images/analyze.svg'
                            alt='analyze'
                            width={'50px'}
                         />
                        <Flex
                            style={{
                                marginInline: 'auto'
                            }}
                            gap={'small'}   
                            justify={'center'} 
                            align={'center'}
                         
                        >
                            <Avatar size={20} icon={<UserOutlined />} />
                            <abbr>{auth?.name && auth.name}</abbr> 
                        </Flex> 
                    </Flex>
                </Col>
                <Col span={8} offset={8}>
                    <Button
                        onClick={() => handligLogOut()}
                    >{'Sign Out'}</Button>
                </Col>
                </Row>
            </Header>
            <Layout
                style={{
                    backgroundColor: '#F0F4FC',
                }}
            >
                <Sider width="15%" style={{
                    backgroundColor: '#F0F4FC',
                }}>
                                        
                <Menu
                style={{
                    height: '93vh',
                }}
                    mode="inline"
                    items={itemsMenu}
                />
                </Sider>    
                <Content style={{
                        marginTop: '16px',
                        marginLeft: '25px',
                        backgroundColor: '#F0F4FC',
                    }}>
                    <h1>{'Welcome'}</h1> <h3>Dashboard</h3>
                </Content>
            </Layout>
        </Layout>
    </Layout>     
    )
}

export default UserPage;