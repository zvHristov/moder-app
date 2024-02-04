import React from 'react';
import { Button, Flex, Form, Input } from 'antd';
import { FieldTypeI } from 'pages/auth/auth';


export interface SignUpProps {
    initialValues: {},
    handlingOnFinish: (values: any) => Promise<void>,
    handlingOnFinishFailed: (errorInfo: any) => void,
    typeForm: string;
}
const SignUp: React.FC<SignUpProps> = (props) => {
    const {
        initialValues,
        handlingOnFinish,
        handlingOnFinishFailed,
        typeForm,
    } = props;
    return (
        <Flex
        style={{
            width: '100%',
            margin: '28% 0 0 0',
            marginInlineEnd: 'auto',
            padding: '4px  0 0 0',
            marginInline: 'auto',
        }} 
        wrap='wrap' 
        gap='small' 
        justify='center' 
        vertical
     >
    <h2>{`${typeForm === 'signup' ? 'Sign Up' : 'Sign In'}`}</h2>
        <Form
            style={{
                width: '100%',
                
            }} 
            name='auth'
            initialValues={initialValues}
            onFinish={handlingOnFinish}
            onFinishFailed={handlingOnFinishFailed}
            autoComplete='off'
         >
        {
            typeForm === 'signup' && (
                <Form.Item 
                    name={['name']} 
                    rules={[{ 
                        required: true,
                        message: 'Please input your username!'
                    }]}
                >
                    <Input placeholder='Enter Name ' />
                </Form.Item>
            )
        }
        <Form.Item 
            name={['email']} 
            rules={[{ 
                type: 'email', 
                required: true, 
                message: 'Please input your email!'  
            }]}
        >
            <Input  placeholder='Enter email '  />
        </Form.Item>
         <Form.Item<FieldTypeI>
            name={['password']} 
            rules={[{
                required: true, 
                message: 'Please input your password!' 
            }]}
            >
            <Input.Password />
            </Form.Item>
         <Form.Item>
            <Button style={{
                width: '100%',
            }} type='primary' htmlType='submit' block >
                {`${typeForm === 'signup' ? 'Sign Up' : 'Sign In'}`}
            </Button>
        </Form.Item>
        </Form>
    </Flex>   
    )
}

export default SignUp;