
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startAddItem, startAddSheetItem } from '../../actions/sheets';
import { useForm } from '../../hooks/useForm'

export const NewSheetItem = () => {

    const dispatch = useDispatch();

    const [descriptionValid, setDescriptionValid ] = useState(true);
    const [amountValid, setAmountValid ] = useState(true);

    const { active } = useSelector(state => state.sheets);
    const { loading } = useSelector(state => state.ui);


    const [formValues, handleInputChange, reset ] = useForm({
        description: '',
        amount: ''
    });

    const { description, amount } = formValues;


    const validateAmount = ({ target }) => {
        const amount = target.value;

        if(isNaN(amount)){
            setAmountValid(false);
        }else{
            setAmountValid(true);
        }
    }

    const validateDescription = ({ target }) => {
        const description = target.value;

        if(description.trim().length !== 0){
            setDescriptionValid(true);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();


        if(description.trim().length === 0){
            setDescriptionValid(false);
            return;
        }

        if(isNaN(amount) || !amount){
            setAmountValid(false);
            return;
        }

        dispatch(startAddItem({
            id: new Date().getTime(),
            description,
            amount
        },  active.id));
        reset();
    }



    return (
        <div className="sheet__new-item">
            <form onSubmit={ handleSubmit }>
                <div className="row">
                    <div className="col">
                        <input 
                            type="text" 
                            className={`form-control input-new-entry ${ !descriptionValid && 'is-invalid'}`}
                            placeholder="description"
                            name="description"
                            value={ description }
                            onChange={ (e) => { handleInputChange(e); validateDescription(e); } }

                        />
                    </div>
                    <div className="col">
                        <input 
                            type="text" 
                            className={`form-control input-new-entry ${ !amountValid && 'is-invalid'}`}
                            placeholder="amount"
                            name="amount"
                            value={ amount }
                            onChange={ (e) => { handleInputChange(e); validateAmount(e); } }
                        />
                         <div className="invalid-feedback">
                            invalid amount
                        </div>
                    </div>
                    <div className="col" >
                        <button 
                        type="submit" 
                        className="btn btn-dark btn-small"
                        disabled={ loading }
                        >
                            new entry
                        </button>
                    </div>
                </div>
            </form>

        </div>
    )
}
