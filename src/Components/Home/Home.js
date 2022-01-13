import React, { useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import UseAuth from '../../Hooks/useAuth';
import {addToDO, deleteToDo, deleteAllToDo} from '../../redux/actions/index';
import bannerImg from '../../images/2.png';
import icon from '../../images/3.png';
import './Home.scss'

const Home = () => {
    const {logOut, user} = UseAuth();
    const [todoInputVal, setTodoInputVal] = useState('');

    const list = useSelector((state)=> state?.todoReducers?.list);

    const handleInput = (e) => {
        setTodoInputVal(e.target.value);
        e.target.value='';
    }
    
    const dispatch = useDispatch();

    return (
        <div className='home-wrapper'>
            {/* Top Section */}
            <div className='home-top-section'>
                {/* Icon */}
                <img className='icon-img' src={icon} alt="" />
                {/* Site title */}
                <h2 className='site-title'>Xeggo To Do App</h2>
            </div>
            {/* Greeting user */}
            <div>
                <p className='welcome-user'>Welcome dear {user.displayName}</p>
            </div>
            {/* Banner */}
            <div>
                <img className='banner-img' src={bannerImg} alt="Banner" />
            </div>
            {/* Logout btn */}
            {user.email && <button className='logout-btn' onClick={logOut} ><i className="fas fa-sign-out-alt"></i>Logout</button>}

            {/* Taking input Secction */}
            <div className='input-area-outer'>
                <div className='input-area'>
                    <i className="fas fa-pen-alt"></i>
                    <input className='add-todo-inp' type='text' placeholder='write' onBlur={handleInput}/>
                    <button className='add-btn' type="submit" onClick={()=>dispatch(addToDO(todoInputVal))}>Add </button>
                </div>
            </div>

            {/* Showing to do list item */}
            {
                list.map(listItem => (<div key={listItem.id}>
                    {/* Single Item wrapper */}
                    <div className='list-item-wrapper-outer'>
                        <div className='list-item-wrapper-inner'>
                            <i className="fas fa-tasks"></i>
                            <p className='list-data'>{listItem.data}</p>
                            <button className='check-action' onClick={()=>dispatch(deleteToDo(listItem.id))}><i className="fas fa-trash-alt"></i></button>
                        </div>
                        
                    </div>
                    
                </div>))
            }

            {/* Check all start */}
            {list.length ? <div>
                <button className='remove-all-btn' onClick={()=>dispatch(deleteAllToDo())}><i className="fas fa-trash-alt"></i>Check all</button>
            </div> :
            <p className='empty-message'>Nothing Added Yet!</p>
            }
        </div>
    );
};

export default Home;