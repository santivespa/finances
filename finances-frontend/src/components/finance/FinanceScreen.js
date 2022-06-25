import React from 'react'
import { useSelector } from 'react-redux';
import { SheetScreen } from '../sheet/SheetScreen';
import { SheetsScreen } from '../sheet/SheetsScreen';
import { Navbar } from '../ui/Navbar'

export const FinanceScreen = () => {

  const { active } = useSelector(state => state.sheets);

  return (
    <>
      {
        active && (<SheetScreen />)
      }
      {
        !active && (<SheetsScreen />)
      }
    </>
  )
}
