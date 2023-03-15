import React, { useState, useEffect } from 'react';
import './TodoList.css'
import Icon from './assets/task.png'

function TodoList(){

    const storageList = localStorage.getItem('List');

    const [list, setList] = useState(storageList ? JSON.parse(storageList) : []);
    const [newItem, setNewItem] = useState("");

    useEffect(()=>{
        localStorage.setItem('List', JSON.stringify(list))
    },[list])

    function addItem(form){
        form.preventDefault();
        if(!newItem){
            return
        }
        setList([...list, {text: newItem, isCompleted: false}])
        setNewItem("");
        document.getElementById("enter-input").focus();
    }

    function clicked(index){
        const listAux = [...list];
        listAux[index].isCompleted = !listAux[index].isCompleted;
        setList(listAux)
    }

    function deleteThisOne(index){
        const listAux = [...list];
        listAux.splice(index,1);
        setList(listAux);
    }

    function deleteAll(){
        setList([])
    }
    return (
        <div>
            <h1>Task List</h1>
            <form onSubmit={addItem}>
                <input 
                    type="text"
                    id="enter-input"
                    value={newItem} 
                    onChange={
                        (e)=>{
                            setNewItem(e.target.value)
                        }
                    }
                    placeholder="Add a task"
                />
                <button type="submit" className="add">Add +</button>
            </form>
            <div className="taskList">
                <div style={{textAlign:"center"}}>
                    {
                    list.length < 1 
                    ?
                    <img className="centerIcon" src={Icon} />
                    : 
                    list.map((item, index)=>(
                        <div 
                        key={index}
                        className={item.isCompleted ? "item complete" : "item"}
                        >
                        <span onClick={()=>{clicked(index)}}>{item.text}</span>
                            <button onClick={()=>{deleteThisOne(index)}} className="del">Delete</button>
                        </div>
                    ))
                    }
                {
                    list.length > 0 &&
                    <button onClick={()=>{deleteAll()}} className="delAll">Delete All</button>
                }
                </div>
            </div>
        </div>
    )
}

export default TodoList