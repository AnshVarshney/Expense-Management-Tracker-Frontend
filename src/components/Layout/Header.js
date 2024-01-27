import React, { useState, useEffect } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Header = () => {

    const navigate=useNavigate();
    const [loginUser, setLoginUser] = useState('');
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('username'))
        console.log(user)
        if (user) {
            setLoginUser(user)
        }
    }, [])

    const logoutHandler = ()=>{
        message.success('Logout Successfully')
        localStorage.removeItem('user')
        localStorage.removeItem('username')
        navigate('/login')
    }

    return (
        <div >
            <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <div className="headings">
                        <Link className="navbar-brand" to="/">Expense-Management</Link>
                        <div className='username navbar-brand'>
                                    {loginUser }     
                                    </div>
                        </div>
                        
                        <div className="userdetail">

                        {/* <ul className="navbar-nav ms-auto mb-2 mb-lg-0"> */}
                            {/* <li className="nav-item"> */}
                                <p className='header-name nav-link'>
                                    {/* <div className='username'>
                                    {loginUser && loginUser.name}      
                                    </div> */}
                                    <UserOutlined />
                                </p>
                            {/* </li> */}
                            {/* <li className="nav-item"> */}
                                <button className='btn header-btn' onClick={logoutHandler}>
                                    Logout
                                </button>
                            {/* </li> */}
                        {/* </ul> */}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header