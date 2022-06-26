
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSheetItem, sheetGetItems } from '../../actions/sheets';
import { openModal } from '../../actions/ui';
import { NewSheetItem } from './NewSheetItem'
import { SheetItemModal } from './SheetItemModal';
import { NavLink } from 'react-router-dom';

export const ItemsList = () => {

    const dispatch = useDispatch();

    const { active, activeItems } = useSelector(state => state.sheets);

    const { categories } = useSelector(state => state.categories);


    useEffect(()=>{
        dispatch(sheetGetItems(active.id));
    }, []);


    const setActiveItem = (item) => {
        dispatch(setActiveSheetItem(item));
        dispatch(openModal());
    }

    return (
        <div className="sheet__sheet-items-list">
            
            <NewSheetItem categories={ categories } />

            <div className="d-flex mt-3 mb-3">
                <NavLink to="/sheet/group-items" className="btn-black-transparent">
                    <i className="fa-solid fa-layer-group"></i>
                    <span>group by categories</span>
                    
                </NavLink>
            </div>

            <table className="table table-bordered table-hover cursor-pointer">
                <tbody>
                    {
                        activeItems?.map(item => (

                            
                                item.type === 'adjustment' ? 
                                (
                                    <tr key={ item.id } onDoubleClick={ (e) => setActiveItem(item) } className="sheet__item-adjustment">
                                        <td>adjustment</td>
                                        <td className="text-end">{ item.amount }</td>
                                    </tr>
                                ) : 
                                (
                                    <tr key={ item.id } onDoubleClick={ (e) => setActiveItem(item) }>
                                        <td>{ item.categoryName } &nbsp; { item.description }</td>
                                        <td className="text-end">{ item.amount }</td>
                                    </tr>
                                )
                            
                          
                        ))
                    }
                </tbody>
            </table>

            <SheetItemModal categories={ categories }/>
        </div>
    )
}
