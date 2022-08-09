import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
//import Header from '../components/Header'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password1: '',
        password2: ''
    })

    const navigate = useNavigate()
    const { name, email, password1, password2 } = formData
    const dispatch = useDispatch()
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth || {})
    //console.log('FormData:',name, email, password1, password2)
    console.log('USER:', user)
    useEffect(() => {
        if (isError) {
            console.log('ERROR OCCURED')
            toast.error(message)
        }
        //redirect when logged in
        if (isSuccess || user) {
            console.log('USER SIGNED IN')
            console.log('ISSUCCESS:', isSuccess)
            console.log("USER:", user)
            navigate('/')
        }
        dispatch(reset())
    }, [user, isLoading, isError, isSuccess, message, dispatch, navigate])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()
        console.log("Name:", name)
        console.log('Email:', email)
        console.log('Password1:', password1)
        console.log('Password2:', password2)
        if (password1 !== password2) {
            //console.log('Passwords do not match!')
            toast.error('Passwords do not match!')
        }
        else {
            const userData = { name, email, password1 }
            dispatch(register(userData))
        }
    }
    return (
        <div>
            <section className='heading'>
                <h1>
                    <FaUser />Register
                </h1>
                <p>Please create an account</p>
            </section>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='name'
                            name='name'
                            value={name}
                            onChange={onChange}
                            placeholder='Enter your name'
                            required
                        />
                    </div>
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
                            id='password1'
                            name='password1'
                            value={password1}
                            onChange={onChange}
                            placeholder='Confirm password'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password2'
                            name='password2'
                            value={password2}
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
        </div>
    )
}

export default Register