


import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setActiveCategory, startGetCategories } from '../../actions/categories';
import { openModal } from '../../actions/ui';
import { CategoryModal } from './CategoryModal';
import { NewCategoryItem } from './NewCategoryItem'

export const CategoriesScreen = () => {


  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(startGetCategories());

  }, [])


  const handleSetActiveCategory = (category) => {
    dispatch(openModal());
    dispatch(setActiveCategory(category));
  }

  return (
    <div className="sheet__main-container">
      <div className="sheet__header">
        <div className="sheet__header-title">
          <h1>Categories</h1>
        </div>
      </div>
      <div>

        <div className="sheet__sheet-items-list">

          <NewCategoryItem />



          <table className="table table-bordered table-hover cursor-pointer cursor-pointer">
            <tbody>
              {
                categories?.map(category => (



                  <tr key={category.id} onDoubleClick={(e) => handleSetActiveCategory(category)}>
                    <td>{category.name}</td>
                  </tr>



                ))
              }
            </tbody>
          </table>

        </div>
      </div>

      <CategoryModal />
    </div>
  )
}
