
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startGetCategories } from '../../actions/categories';
import { startAddItem, startAddSheetItem } from '../../actions/sheets';
import { useForm } from '../../hooks/useForm'

export const NewSheetItem = ({ categories }) => {

    const dispatch = useDispatch();

    const [descriptionValid, setDescriptionValid ] = useState(true);
    const [amountValid, setAmountValid ] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState();

    const { active } = useSelector(state => state.sheets);
    const { loading } = useSelector(state => state.ui);


    const [formValues, handleInputChange, reset ] = useForm({
        description: '',
        amount: ''
    });

    const { description, amount } = formValues;

    useEffect(() => {
        dispatch(startGetCategories());
    }, []);

    useEffect(() => {
        if(categories?.length > 0) {
            setSelectedCategory(categories[0].id);
        }
    }, [categories]);

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
        },  active.id, selectedCategory));
        reset();
    }



    const selectCategory = (e) => {
        setSelectedCategory(e.target.value);
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
                    <div className="col-3">
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
                    <div className="col">
                        <select className="form-select input-new-entry" value={selectedCategory} onChange={ (e) => { selectCategory(e); }}>
                            {
                                categories.map(x => (
                                    <option key={x.id} value={x.id}>{x.name}</option>
                                ))
                            }
                        </select>
                     
                      
                    </div>
                    <div className="col-2" >
                        <button 
                        type="submit" 
                        className="btn btn-dark btn-small"
                        disabled={ loading }
                        >
                            <i className="fa-regular fa-floppy-disk"></i>
                        </button>
                    </div>
                </div>
            </form>

        </div>
    )
}
