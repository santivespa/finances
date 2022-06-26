import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sheetGetItems, sheetUpdateRemainingAmount } from '../../actions/sheets';
import { ItemsList } from '../sheet-item/ItemsList'
import moment from 'moment';
import { Routes, Route, NavLink } from 'react-router-dom';
import { GroupItems } from '../sheet-item/GroupItems';

export const SheetScreen = () => {

    const { active, activeItems } = useSelector(state => state.sheets);
    const { date, initialAmount } = active;
    const [ monthName, setMonthName ] = useState('');
 
    const [ year, setYear ] = useState('');

    useEffect(()=>{
        const momentDate = moment(date);
        setMonthName(momentDate.format('MMMM'));
        setYear(momentDate.format('YYYY'));
    }, []);


    const [remainingAmount, setRemainingAmount] = useState(null);


    useEffect(()=>{
        if(activeItems){
            const sumAmounts = activeItems.reduce((accumulator, { amount }) => {
                return Number(accumulator) + Number(amount);
            }, 0);
            const remainingAmount = active.initialAmount - sumAmounts;
            setRemainingAmount( remainingAmount);
        }
 

    },[activeItems]);

    return (
        <div className="sheet__main-container">
            <div className="sheet__header">
                <div className="sheet__header-title">
                    <h1>{ monthName }</h1>
                    <span className="sheet__year">{ year }</span>
                </div>
                <div className="sheet__header-numbers">
                    <span className="text-success text-end">
                        <span className="small">Initial amount  </span><span>{ initialAmount.toString() }</span>
                    </span>
                    <span className="text-primary text-end"> 
                        <span className="small">Remaining amount  </span><span>{ remainingAmount?.toString() }</span>
                    </span>
                </div>
            </div>
            

            <Routes>
                <Route path="/" element={<ItemsList />}/>
                <Route path="/group-items" element={<GroupItems />}/>
            </Routes>
        </div>
    )
}
