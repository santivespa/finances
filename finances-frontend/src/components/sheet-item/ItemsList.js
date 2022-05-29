
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSheetItem, sheetGetItems } from '../../actions/sheets';
import { openModal } from '../../actions/ui';
import { NewSheetItem } from './NewSheetItem'
import { SheetItemModal } from './SheetItemModal';

export const ItemsList = () => {

    const dispatch = useDispatch();

    const { active, activeItems } = useSelector(state => state.sheets);

    useEffect(()=>{
        dispatch(sheetGetItems(active.id));
    }, []);


    const setActiveItem = (item) => {
        dispatch(setActiveSheetItem(item));
        dispatch(openModal());
    }

    return (
        <div className="sheet__sheet-items-list">
            
            <NewSheetItem/>
            <table className="table table-bordered table-hover cursor-pointer cursor-pointer">
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
                                        <td>{ item.description }</td>
                                        <td className="text-end">{ item.amount }</td>
                                    </tr>
                                )
                            
                          
                        ))
                    }
                </tbody>
            </table>

            <SheetItemModal />
        </div>
    )
}
