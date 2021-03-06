import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm'

export const Login = () => {

  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.ui);

  const [ formValues, handleInputChange] =useForm({
    email: '',
    password: ''
  });

  const { email, password } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startLogin(email, password))
  }


  return (
      <>
        <h1>Login</h1>
        
        <form onSubmit={ handleSubmit }>
            <input 
              type="text" 
              className="form-control mt-3" 
              placeholder="Email" 
              name="email"
              value={email}
              onChange={handleInputChange}
            />

            <input 
              type="password" 
              className="form-control mt-3" 
              placeholder="Password" 
              name="password"
              value={password}
              onChange={handleInputChange}
            />

            <input 
              type="submit" 
              className={`btn btn-dark w-100 mt-3 mb-2}`} 
              disabled={ loading }
              value="Login" 
            />
       
       
            <Link
                to="/auth/register"
            >
                Register
            </Link>

        </form>
     
        </>
    
  )
}
