
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { sheetClearActiveItem, startDeleteItem, startUpdateItem } from '../../actions/sheets';
import { closeModal } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

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

export const SheetItemModal = ({ categories }) => {

    const dispatch = useDispatch();

    const { modalOpen, loading } = useSelector(state => state.ui);
    const { activeItem } = useSelector(state => state.sheets);
    const [selectedCategory, setSelectedCategory] = useState();



    const [formValues, handleInputChange, reset] = useForm({ description: activeItem?.description || '', amount: activeItem?.amount || '' });


    useEffect(() => {
        if (activeItem) {
            reset(activeItem);
            setSelectedCategory(activeItem?.categoryID ? activeItem.categoryID : 0)
        }

    }, [activeItem])

    const [descriptionValid, setDescriptionValid] = useState(true);
    const [amountValid, setAmountValid] = useState(true);

    const { id, description, amount, type } = formValues;


    const validateAmount = ({ target }) => {
        const amount = target.value;

        if (isNaN(amount)) {
            setAmountValid(false);
        } else {
            setAmountValid(true);
        }
    }

    const validateDescription = ({ target }) => {
        const description = target.value;

        if (description.trim().length !== 0) {
            setDescriptionValid(true);
        }
    }

    const resetAll = () => {
        setAmountValid(true);
        setDescriptionValid(true);
        dispatch(closeModal());
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if (description.trim().length === 0 && !type) {
            setDescriptionValid(false);
            return;
        }
        if (isNaN(amount) || !amount) {
            setAmountValid(false);
            return;
        }

        dispatch(startUpdateItem({ id, description, amount: Number(amount), category: selectedCategory }));
        dispatch(sheetClearActiveItem());
        reset();
    }

    const handleCloseModal = () => {
        dispatch(sheetClearActiveItem());
        resetAll();
    }

    const handleDelete = () => {
        dispatch(startDeleteItem({ ...activeItem, amount: Number(amount) }));
        dispatch(sheetClearActiveItem());
    }

    const selectCategory = (e) => {
        setSelectedCategory(e.target.value);
    }



    return (
        <Modal
            className="modal"
            overlayClassName="modal-fondo"
            isOpen={modalOpen}
            closeTimeoutMS={200}
            onRequestClose={handleCloseModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <h1>Edit</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col">
                        {
                            !type && (
                                <input
                                    type="text"
                                    className={`form-control input-new-entry ${!descriptionValid && 'is-invalid'}`}
                                    placeholder="description"
                                    name="description"
                                    value={description}
                                    onChange={(e) => { handleInputChange(e); validateDescription(e); }}
                                />
                            )
                        }

                    </div>
                    <div className="col-3">
                        <input
                            type="text"
                            className={`form-control input-new-entry ${!amountValid && 'is-invalid'}`}
                            placeholder="amount"
                            name="amount"
                            value={amount}
                            onChange={(e) => { handleInputChange(e); validateAmount(e); }}
                        />
                        <div className="invalid-feedback">
                            invalid amount
                        </div>
                    </div>

                    <div className="col">
                        <select className="form-select input-new-entry" value={selectedCategory} onChange={(e) => { selectCategory(e); }}>
                            <option value={0}></option>

                            {
                                categories.map(x => (
                                    <option key={x.id} value={x.id}>{x.name}</option>
                                ))
                            }
                        </select>


                    </div>



                </div>
                <div className="btn-modal-actions">

                    <div>
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-small"
                            onClick={handleDelete}
                            disabled={loading}
                        >
                            delete
                        </button>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="btn btn-secundary btn-small me-3"
                            onClick={handleCloseModal}
                        >
                            close
                        </button>
                        <button
                            type="submit"
                            className="btn btn-dark btn-small"
                            disabled={loading}
                        >
                            save
                        </button>
                    </div>

                </div>
            </form>
        </Modal>
    )
}
