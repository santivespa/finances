import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm'

export const Register = () => {

  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.ui);


  const [ formValues, handleInputChange] =useForm({
    email: '',
    password1: '',
    password2: ''
  });

  const { email, password1, password2 } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startRegister(email, password1));
  }


  return (
    <>
        <h1>Register</h1>
        
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
              name="password1"
              value={password1}
              onChange={handleInputChange}
            />

            <input 
              type="password" 
              className="form-control mt-3" 
              placeholder="Confirm password" 
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />
            
            <input 
              type="submit" 
              className="btn btn-dark w-100 mt-3 mb-2" 
              value="Register"
              disabled={ loading } 
            />

            <Link 
                to="/login"
            >
                Already have an account? login
            </Link>
       
        </form>
     
        </>
  )
}
