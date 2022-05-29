

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { startChekingToken } from '../actions/auth';

import { FinanceScreen } from '../components/finance/FinanceScreen';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

  const dispatch = useDispatch();
  const { checking, id } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(startChekingToken());
  }, [dispatch]);
  
  if(checking) {
    return <h1>Checking...</h1>
  }

  return (
    <BrowserRouter>
        <Routes>

            <Route path="/" element={
              <PrivateRoute isAuthenticated={!!id}>
                <FinanceScreen />
              </PrivateRoute>
            } />
       
            <Route path="/*" element={
              <PublicRoute isAuthenticated={!!id}>
                <AuthRouter /> 
              </PublicRoute>
            }/>
           
        </Routes>
    </BrowserRouter>
  )
}
