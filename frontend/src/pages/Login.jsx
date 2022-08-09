import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner';
//import Header from '../components/Header'
function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const { email, password } = formData
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth || {})

    useEffect(() => {
        if (isError) {
            console.log(message)
            toast.error(message)
        }
        //redirect when logged in
        if (isSuccess || user) {
            console.log('ISSUCCESS:', isSuccess)
            console.log('LOGIN USER:', user)
            navigate('/')
        }
        dispatch(reset())
    }, [user, isLoading, isError, isSuccess, message, dispatch, navigate])

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password,
        }

        dispatch(login(userData))
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    if (isLoading) {
        <Spinner />
    }
    return (
        <div>
            <>
                <section className='heading'>
                    <h1>
                        <FaUser />Login
                    </h1>
                    <p>Welcome Back</p>
                </section>
                <section className='form'>
                    <form onSubmit={onSubmit}>
                        <div className='form-group'>
                            <input
                                type='email'
                                className='form-control'
                                id='email'
                                name='email'
                                value={email}
                                onChange={onChange}
                                placeholder='Enter your email'
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='password'
                                className='form-control'
                                id='password'
                                name='password'
                                value={password}
                                onChange={onChange}
                                placeholder='Confirm password'
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <button className='btn btn-block'>Submit</button>
                        </div>
                    </form>
                </section>
            </>
        </div>
    )
}

export default Login