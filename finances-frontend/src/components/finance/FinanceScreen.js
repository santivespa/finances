import React from 'react'
import { useSelector } from 'react-redux';
import { SheetScreen } from '../sheet/SheetScreen';
import { SheetsScreen } from '../sheet/SheetsScreen';
import { Navbar } from '../ui/Navbar'
import { Routes, Route } from 'react-router-dom';
export const FinanceScreen = () => {

  const { active } = useSelector(state => state.sheets);

  return (
    <>

      <Routes>

        <Route path="/" element={<SheetsScreen />} />

        <Route path="/sheet/*" exact element={<SheetScreen />} />

      </Routes>

    </>
  )
}
