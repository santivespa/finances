import React from 'react'
import { useSelector } from 'react-redux';
import { SheetScreen } from '../sheet/SheetScreen';
import { SheetsScreen } from '../sheet/SheetsScreen';
import { Navbar } from '../ui/Navbar'

export const FinanceScreen = () => {

  const { active } = useSelector(state => state.sheets);

  return (
    <div className='finance__main-content'>
 

      <div className="container">
        <div className="row mp-0 justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 mp-0">
          <Navbar />
          {
            active && (<SheetScreen />)
          }
          {
            !active && (<SheetsScreen/>)
          }
          </div>
        </div>
      </div>
     
  
      

    </div>
    
  )
}
