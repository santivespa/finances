import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startAddCategory } from '../../actions/categories';

export const NewCategoryItem = () => {
 
    const dispatch = useDispatch();

    const [nameValid, setNameValid ] = useState(true);

    const { active } = useSelector(state => state.categories);
    const { loading } = useSelector(state => state.ui);

    const [formValues, handleInputChange, reset ] = useForm({
        name: ''
    });

    const { name } = formValues;

    const validateName = ({ target }) => {
        const name = target.value;

        if(name.trim().length !== 0){
            setNameValid(true);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if(name.trim().length === 0){
            setNameValid(false);
            return;
        }

        dispatch(startAddCategory(formValues, reset));
    }



    return (
        <div className="sheet__new-item">
            <form onSubmit={ handleSubmit }>
                <div className="row">
                    <div className="col">
                        <input 
                            type="text" 
                            className={`form-control input-new-entry ${ !nameValid && 'is-invalid'}`}
                            placeholder="Category name"
                            name="name"
                            value={ name }
                            onChange={ (e) => { handleInputChange(e); validateName(e); } }

                        />
                    </div>
                   
                    <div className="col" >
                        <button 
                        type="submit" 
                        className="btn btn-dark btn-small"
                        disabled={ loading }
                        >
                            add
                        </button>
                    </div>
                </div>
            </form>

        </div>
    )
}
