import React , {useEffect, useState} from 'react'
import { Form, Input , message} from 'antd'
import { Link , useNavigate} from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Layout/Spinner'
// import jwt from 'jsonwebtoken'


const Login = () => {
    const [loading,setLoading]=useState(false)
    const navigate = useNavigate()

    const submitHandler = async (values)=>{
        try{
            setLoading(true)
            const {data} = await axios.post('/users/login',values)
            console.log("data",data)
            // const user = jwt.decode(data.token)
            // console.log(data.user)
            localStorage.setItem('user',JSON.stringify({...data.user,password:''}))
            // localStorage.setItem('user',JSON.stringify({...data.token}))
            message.success('Login Successful')
            setLoading(false)
            navigate('/')
        }catch(error){
            setLoading(false)
            message.success('something went wrong')
        }
    }

    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate('/')
        }
    },[navigate]);

    return (
        <div className='home'>
            <div className="login-page">
                {loading && <Spinner/>}
                
                <Form className='login-form' layout='vertical' onFinish={submitHandler}>
                    <h1>Login Form</h1>
                    <Form.Item className='form-label' label='Email' name='email'>
                        <Input type='email' />
                    </Form.Item>
                    <Form.Item className='form-label' label='Password' name='password'>
                        <Input type='password' />
                    </Form.Item>
                    <div className="btnLink">
                        <button className='btn btn-primary'>Login</button>
                        <Link to='/register'>Not a user ? Click Here to register</Link>
                    </div>
                </Form>
                <div className="login-image">
                    <img src="https://media.istockphoto.com/id/1011441292/photo/login-written-on-an-old-typewriter.webp?b=1&s=170667a&w=0&k=20&c=K1ZfQNHKuN8NkoJbfnzQlg6EWTHs5GC44KFu4B0uJDA=" alt="loginImg" />
                </div>
            </div>
        </div>
    )
}

export default Login