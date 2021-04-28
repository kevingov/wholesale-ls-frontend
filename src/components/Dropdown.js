import React, { useState } from "react";
import { Toggle } from "react-bootstrap/lib/Dropdown";
import onClickOutside from 'react-onclickoutside';

function Dropdown({ title, items = [], multiSelect = false }) {
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState([]);
    const toggle = () => setOpen(!open);
    const [search, setSearch] = useState(false);
    Dropdown.handleClickOutside = () => setOpen(false);

    function handleOnClick(item) {
        if (!selection.some(current => current.userId == item.userId)) {
            if (!multiSelect) {
                setSelection([item]);
            } else if (multiSelect) {
                setSelection([ ... selection, item]);
            }
        } else {
            let selectionAfterRemoval = selection;
            selectionAfterRemoval = selectionAfterRemoval.filter(
                current => current.userId != item.userId
            );
            setSelection([ ... selectionAfterRemoval]);
        }
    }

    function isItemInSelection(item) {
        if (selection.find(current => current.userId == item.userId)) {
            return true;
        }
        return false;
    }

    return (
        <div className="dd-wrapper">
            <div 
                tabIndex={0} 
                className="dd-header" 
                role="button" 
                onKeyPress={() => toggle(!open)} 
                onClick={() => toggle(!open)}
            >
            <div className="dd-header__title">
                <p className="dd-header_title--bold">{title}</p>
            </div>
                <div className="dd-header__action">
                    <p>{open ? 'Close' : 'Open'}</p>
                    <input 
                        type="text" 
                        placeholder="Type a name or multiple names..." 
                        onChange={ e => setSearch(e.target.value) }
                        >

                    </input>
                </div>
            </div>
            {open && (
                <ul className="dd-list">
                    {items.map(item => (
                        <li className="dd-list-item" key={item.userId}>
                            <button type="button" onClick={() => handleOnClick(item)}>
                                <span>{item.fullName} </span>
                                <span>{isItemInSelection(item) && 'Selected'} </span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);