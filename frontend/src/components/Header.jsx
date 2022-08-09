import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header({ heading, isLogin }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth || {})
    const onLogout = () => {
        console.log('LOGOUT BUTTON PRESSED')
        dispatch(logout())
        dispatch(reset())
        console.log('Navigating to /login')
        console.log('Header User:', user)
        navigate('/login')
    }
    return (
        <div>
            <header className='header'>
                <div className='logo'>
                    <h4>{heading}</h4>
                    <ul>
                        {user ? (
                            <li>
                                <button className='btn' onClick={onLogout}>
                                    <FaSignOutAlt />Logout
                                </button>
                            </li>
                        ) :
                            (
                                <>
                                    <li>
                                        <Link to='/login'>
                                            <FaSignInAlt />Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/register'>
                                            <FaUser /> Register
                                        </Link>
                                    </li>
                                </>
                            )
                        }

                    </ul>


                </div>
            </header>

        </div>
    )
}
Header.defaultProps = { heading: '', isLogin: true }
Header.propTypes = {
    heading: PropTypes.string.isRequired,
    isLogin: PropTypes.bool.isRequired
}

export default Header