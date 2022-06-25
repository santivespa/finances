import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import Modal from 'react-modal';
import { useEffect } from 'react';
import { closeModal } from '../../actions/ui';
import { startDeleteCategory, startUpdateCategory } from '../../actions/categories';


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

export const CategoryModal = () => {

  const dispatch = useDispatch();

  const { active } = useSelector(state => state.categories);

  const { modalOpen, loading } = useSelector(state => state.ui);

  const [nameValid, setNameValid] = useState(true);

  const [formValues, handleInputChange, reset] = useForm({...active});

  useEffect(() => {
    buildForm();
  }, [active])
  
  const { name } = formValues || {name:''};

  const buildForm = () => {
    reset(active);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startUpdateCategory(formValues));
  }

  const handleDelete = () => {
    dispatch(startDeleteCategory(active));

  }

  const handleCloseModal = () => {
    dispatch(closeModal());
  }



  const validateName = ({ target }) => {
    const name = target.value;

    if (name.trim().length !== 0) {
      setNameValid(true);
    }
  }



  return (
    <Modal
      className="modal"
      overlayClassName="modal-fondo"
      isOpen={ modalOpen }
      closeTimeoutMS={200}
      onRequestClose={ handleCloseModal }
      style={ customStyles }
      contentLabel="Example Modal"
    >
      <h1>Edit Category</h1>
      <hr />
      <form onSubmit={ handleSubmit }>
        <div className="row">
          <div className="col-12">
            
           
                <input
                  type="text"
                  className={`form-control input-new-entry ${!nameValid && 'is-invalid'}`}
                  placeholder="Category name"
                  name="name"
                  value={ name }
                  onChange={(e) => { handleInputChange(e); validateName(e); }}
                />
           

          </div>
          

          <div className="btn-modal-actions">

            <div>
              <button
                type="button"
                className="btn btn-outline-danger btn-small"
                onClick={ handleDelete }
                disabled={ loading }
              >
                delete
              </button>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-secundary btn-small me-3"
                onClick={ handleCloseModal }
              >
                close
              </button>
              <button
                type="submit"
                className="btn btn-dark btn-small"
                disabled={ loading }
              >
                save
              </button>
            </div>

          </div>

        </div>
      </form>
    </Modal>
  )
}
