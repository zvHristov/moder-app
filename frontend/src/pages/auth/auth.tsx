import React, { useState, lazy, useCallback, } from 'react';
import { useAppDispatch } from 'shared/redux-hooks';
import { useNavigate } from 'react-router-dom';
// auth ui
import { Layout, Flex,
    Button,
} from 'antd';

import { signUp, signIn } from 'features/auth/by-oauth';
import { AppDispatch } from 'store/store';
const SignUp = lazy(() => import('features/auth/by-oauth/ui/singUp/signUp'));
// auth ui
const { Footer, Sider, Content } = Layout;

export interface FieldTypeI {
    name?: string;
    email?: string;
    password: string;
};


const bgStyleFooter: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    minHeight: '40px',
    padding: '0',
    marginTop: '28px',
    marginInline: 'auto',
};
const contentStyle: React.CSSProperties = {
    minHeight: `62vh`,
    padding: 24,
    backgroundColor: '#F0F4FC',
};  

const AuthPage = () => {
    const [toggleForm, setToggleForm] = useState<string>('signup');
    const dispatch: AppDispatch =  useAppDispatch();
    const navigate = useNavigate();

    const initialValues: FieldTypeI = {
        name: '',
        email: '',
        password: '',
    }

    const handlingOnFinish = useCallback(async (values: any) => {
            // console.log('Success:', values);
            if (values && toggleForm === 'signup') {
                try {
                    await dispatch(
                        signUp(values)
                    ).unwrap();
                    navigate('/user');
                  } catch (e) {
                    console.error(e);
                  }
            }
    
            if (values && toggleForm === 'signin') {
                try {
                    await dispatch(
                        signIn(values)
                    ).unwrap();
                    navigate('/user');
                  } catch (e) {
                    console.error(e);
                  }
            }
       
        
    }, []);

    const handlingOnFinishFailed = useCallback((errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }, []);

    return (
        <Flex gap='middle' align='middel' >
        <Layout>
            <Layout style={{ padding: '0 15%', minHeight: '90vh' }}>
            <Content >
                <Flex wrap='wrap' justify='center' align='center' vertical>
                 <Flex justify='center'
                 className='app-auth-page'
                 style={{ margin: '15% 0 0 0', width: '100%', marginInline: 'auto'}}
                  vertical>
                    <h1>
                        Welcome to
                        <p>Modern app</p>
                    </h1>
                    <p>Here, we believe that building a strong professional network begins with your participation.</p>
                    <p>We are delighted to offer a modern and user-friendly service to ensure you have the best experience.</p>
                    <img
                            alt='Floors'
                            src='../images/login_image.svg'
                            width='50%'
                            className='align-middle mb-1'
                        />
                 </Flex>
                </Flex>
            </Content>
            <Sider width='25%' style={{
                    background: 'transparent'
            }}  >
            <Flex
                    style={{
                        width: '100%',
                        
                    }} 
                    align='center' 
                    justify='center' 
                    vertical 
                >
                <Flex
                    gap={'middle'}
                    align='center' 
                    justify='center' 
                    style={{
                    width: '100%',
                    margin: '32px 0 0 0',
                    
                }} 
                 >
                    <Button 
                        type='link'
                        onClick={() => setToggleForm('signup')}
                        disabled={toggleForm === 'signup'}
                        style={{
                            margin: '0',
                            padding: '0'
                        }}
                    >
                        {'Sign Up'}
                    </Button>
                    <Button
                        onClick={() => setToggleForm('signin')}
                        size='small' 
                        type='link' 
                        disabled={toggleForm === 'signin'}
                        style={{
                            margin: '0',
                            padding: '0'
                        }}
                    >{'Sign In'}</Button>
                </Flex>
                <SignUp
                    initialValues={initialValues}
                    handlingOnFinish={handlingOnFinish}
                    handlingOnFinishFailed={handlingOnFinishFailed}
                    typeForm={toggleForm}    
                />
            </Flex>
            </Sider>
            </Layout>
                    
            <Content>
                <Flex style={{
                        backgroundColor: '#FFFFFF',
                }} align='center' justify='center'>
                    <Footer style={bgStyleFooter} >{'© 2024 '}</Footer>
                </Flex>
            </Content>
            </Layout>
        </Flex>
        
    )
}

export default AuthPage;