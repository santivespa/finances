

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { calculateLastiRemainingAmount, setActiveSheet, startGetSheets } from '../../actions/sheets';
import { openModal } from '../../actions/ui';
import { NewSheetModal } from './NewSheetModal';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

export const SheetsScreen = () => {

    const dispatch = useDispatch();

    const { sheets } = useSelector(state => state.sheets);

    const [ activeToEdit, setActiveToEdit] = useState(null);

    useEffect(() => {
      dispatch(startGetSheets());
    }, [])
    
    const setActiveItem = (sheet) => {
        dispatch(setActiveSheet(sheet));

    }

    const handleNewSheet = () => {
        setActiveToEdit(null);
        dispatch(calculateLastiRemainingAmount());
        dispatch(openModal());
    }

    const handleEditSheet = (sheet) => {
        setActiveToEdit(sheet);
        dispatch(openModal());
    }

    return (
        <div className="sheet__main-container">
            <div className="sheet__header">
                <div className="sheet__header-title">
                    <h1>Sheets</h1>
                   
                </div>
                <button className="btn btn-dark btn-add-sheet" onClick={handleNewSheet}>
                    <span className="material-icons">
                        add
                    </span>
                </button>
                
            </div>


            <div className="sheet__sheets-list">
                <table className="table table-bordered table-hover">
                    <tbody>
                        {
                            sheets.map(sheet => (
                                <tr key={ sheet.id }>
                                    <td>
                                        <NavLink className="btn-fake-link" to="/sheet" onClick={ (e) => setActiveItem(sheet) }>{ moment(sheet.date).format('MMMM') } { moment(sheet.date).format('YYYY')}</NavLink>
                                    </td>
                                    <td className="text-end" >
                                        <span className="small">inicio </span> 
                                        { sheet.initialAmount }
                                    </td>
                                    <td className="text-end">
                                        <button className="btn-fake-link" onClick={ (e) => handleEditSheet(sheet) }>edit</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <NewSheetModal activeToEdit={activeToEdit} />
        </div>
    )
}

