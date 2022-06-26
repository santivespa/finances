

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export const GroupItems = () => {


    const { active, activeItems } = useSelector(state => state.sheets);

    const [itemsGroup, setItemsGroup] = useState([])

    const groupBy = (list, keyGetter) => {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    }


    useEffect(() => {
        const groupMap = groupBy(activeItems.filter(x => !x.type), activeItems => activeItems.categoryName);

        const groups = [];

        groupMap.forEach((value, key) => {
            groups.push({
                categoryName: key,
                items: value
            })
        })
        setItemsGroup(groups);
    }, [activeItems]);


    const sumItems = (items) => {
        const sum = items.reduce((accumulator, { amount }) => {
            return Number(accumulator) + Number(amount);
        }, 0);
        return sum;
    }

    return (
        <>
            <div className="d-flex m-2">

                <NavLink to="/sheet" className="btn-black-transparent">
                    <i className="fa-solid fa-circle-arrow-left"></i>
                    
                    <span>back</span>
                </NavLink>
            </div>
            {
                itemsGroup.map(({ categoryName, items }, index) => (
                    <div key={index} className="accordion accordion-flush" id={`accordion-${index}`}>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id={`flush-${categoryName}`}>
                                <button className="accordion-button collapsed btn-accordion-items border-gray" type="button" data-bs-toggle="collapse"
                                    data-bs-target={`#${categoryName}`} aria-expanded="false" aria-controls={categoryName}>
                                    {categoryName} &nbsp; <strong>${sumItems(items)}</strong>
                                </button>
                            </h2>
                            <div id={categoryName} className="accordion-collapse collapse" aria-labelledby={categoryName} data-bs-parent={`#accordion-${index}`}>
                                <div>
                                    <table className="table table-bordered table-hover cursor-pointer">
                                        <tbody>
                                            {
                                                items.map((x, index) => (
                                                    <tr key={index}>
                                                        <td>{x.description}</td>
                                                        <td className="text-end">{x.amount}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                )
                )
            }

        </>
    )
}
