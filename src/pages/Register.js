import React, { useEffect, useState } from 'react'
import Spinner from '../components/Layout/Spinner'
import { Form, Input, message } from 'antd'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (values) => {
        try {
            setLoading(true)
            const {data} = await axios.post('/users/register', values)
            message.success('Registeration Successfull')
            setLoading(false)
            navigate('/login')
        } catch (error) {
            console.log(error)
            setLoading(false)
            message.error('something went wrong')
        }
    }

    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate('/')
        }
    },[navigate]);

    return (
        <div className='home'>
            <div className="register-page">
                {loading && <Spinner/>}

                <div className="register-image">
                    <img src="https://media.istockphoto.com/id/1472229829/photo/online-registration-form-for-modish-form-filling.webp?b=1&s=170667a&w=0&k=20&c=Hx-0fVmT_bsXYO_MqFVSwfy8CuPGZp2tDUYJxCPwg7A=" alt="regImg" />
                </div>

                <Form className='register-form' layout='vertical' onFinish={submitHandler}>
                    <h1>Register Form</h1>
                    <Form.Item label='Name' name='name'>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Email' name='email'>
                        <Input type='email' />
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input type='password' />
                    </Form.Item>
                    <div className="btnLink">
                        <button className='btn btn-primary'>Register</button>
                        <Link to='/login'>Already Register ? Click Here to login</Link>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Register