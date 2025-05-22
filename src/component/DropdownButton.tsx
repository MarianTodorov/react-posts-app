import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store/store.ts";
import {useState} from "react";
import {changeStatus, filterByUser} from "../store/reducer.ts";

function DropdownButton() {
    const [chooseUser, setChooseUser]= useState(0);
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.posts.users);

    function handleFilterByUser(user:number){
        if (user != 0){
            setChooseUser(user);
            dispatch(filterByUser(user));
            dispatch(changeStatus('sortView'));
        } else {
            setChooseUser(user);
            dispatch(changeStatus('loadView'));
        }
    }
    return (
        <>
            <div className="btn-group">
                {chooseUser == 0 ?
                    <button type="button" className="btn btn-danger">Филтрирай по потребител</button>
                    : <button type="button" className="btn btn-danger">Избран потребител {chooseUser}</button>
                }
                <button type="button" className="btn btn-danger dropdown-toggle dropdown-toggle-split"
                        data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                    {users.map((user,index) => (
                        <li key={index}>
                            <a className="dropdown-item"
                               onClick={(e)=>{
                                   e.preventDefault();handleFilterByUser(user)}
                               }>{user}</a></li>
                    ))}
                    {chooseUser != 0 && <li key={0}>
                        <a className="dropdown-item"
                           onClick={(e)=>{
                               e.preventDefault();handleFilterByUser(0)}
                           }>Изчисти филтъра</a></li>}

                </ul>
            </div>
        </>
    )
}

export default DropdownButton;