

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CategoriesScreen } from '../components/categories/CategoriesScreen'
import { FinanceScreen } from '../components/finance/FinanceScreen'
import { Navbar } from '../components/ui/Navbar'

export const FinancesRouter = () => {
    return (
        <>
             <div className='finance__main-content'>
                <div className="container">
                    <div className="row mp-0 justify-content-center">
                        <div className="col-12 col-md-8 col-lg-6 mp-0"> 

                            <Navbar />

                            <Routes>
                                <Route path="/*" element={<FinanceScreen />} />
                                <Route path="/categories" exact element={<CategoriesScreen />} />
                            </Routes>


       

                         </div>
                    </div>
                </div>
            </div> *
        </>
    )
}
