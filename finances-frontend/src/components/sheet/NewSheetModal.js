

import React, { useEffect, useState } from 'react'
import Modal from 'react-modal/lib/components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { setLastRemainingAmount, startAddSheet, startDeleteSheet, startUpdateSheet } from '../../actions/sheets';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const NewSheetModal = ( { activeToEdit }) => {

    const dispatch = useDispatch();

    const { modalOpen, loading } = useSelector(state => state.ui);
    const { remainingAmount } = useSelector(state => state.sheets);

    const [date, setDate] = useState(new Date());
    const [initialAmount, setInitialAmount] = useState('0');

    useEffect( ()=> {
        if(activeToEdit) {
            setDate(new Date(activeToEdit.date));
            setInitialAmount(activeToEdit.initialAmount);
        }
    }, [activeToEdit]);

    useEffect( ()=> {
        if(!activeToEdit) {
            setDate(new Date());
            setInitialAmount(0);
        }
    }, [modalOpen]);

    const handleCloseModal = () => {
        setInitialAmount('0');
        setDate(new Date());
        dispatch(closeModal());
        dispatch(setLastRemainingAmount(0));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const momentDate = moment(date);

        if(activeToEdit) {
            activeToEdit.date = momentDate;
            activeToEdit.initialAmount = initialAmount;
            dispatch(startUpdateSheet(activeToEdit));
        } else {
            const newSheet = { 
                initialAmount,
                remainingAmount: initialAmount,
                date: momentDate
    
            }
            dispatch(startAddSheet(newSheet));
        }

    }

    const handleDateChange = (e)=> {
        setDate(e);
    }
    
    const handleAmountChange = ({ target })=> {
        setInitialAmount(target.value);
    }

    const handleDelete = () => {
        dispatch(startDeleteSheet(activeToEdit));
    }
    
    return (
        <Modal
            className="modal modal-lg"
            overlayClassName="modal-fondo"
            isOpen={ modalOpen }
            closeTimeoutMS={ 200 }
            onRequestClose={ handleCloseModal }
            style={ customStyles }
            contentLabel="Example Modal"
        >
            <h1>
                {
                    activeToEdit ? "Edit " : "New "
                }
                Sheet
            </h1>
            <hr/>
            <form onSubmit={ handleSubmit }>
                <div className="row">
                   
                    <div className="col-6">
                        <label>Date</label>
                        <DatePicker
                            selected={date}
                            className="form-control"
                            dateFormat="MMMM yyyy"
                            showMonthYearPicker
                            onChange={handleDateChange} 
                        />
                    </div>
                    <div className="col-6">
                        <label>Initial amount</label>
                        <input
                            type="text"
                            value={initialAmount}
                            className="form-control"
                            onChange={handleAmountChange} 
                        />
                        {
                            (remainingAmount > 0) && (
                                <a className="btn-custom-link" onClick={(e) => setInitialAmount(remainingAmount)}>
                                    <span>Set remaining amount of the last sheet</span>
                                </a>
                            )
                        }
                       
                    </div>
                    
                
                    <div  className="btn-modal-actions">
                    
                        <div>
                            {
                                activeToEdit && (
                                    <button 
                                    type="button" 
                                    className="btn btn-outline-danger btn-small"
                                    onClick={ handleDelete }
                                    >
                                        delete
                                    </button>
                                )
                            }
                           
                        </div>
                        <div>
                            <button 
                                type="button" 
                                className="btn btn-secundary btn-small me-3"
                                disabled={loading}
                                onClick={ handleCloseModal }
                            >
                                close
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-dark btn-small"
                                disabled={loading}
                            >
                                 {
                                    activeToEdit ? "save " : "create"
                                }
                            </button>
                        </div>
                        
                    </div>
                
                </div>
            </form>
        </Modal>
    )
}
