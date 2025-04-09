import React, {useState } from "react";

function TodoList() {
    const [todo, setToDo] = useState([]);
    const [text, setText] = useState('');
    const [showmodal, setShowModal] = useState(false);
    const [edit, setEdit] = useState(null);
    const [descriptionText, setDescription] = useState('');

    const handleAdd = () => {
        if ((!edit && text?.trim() !== '') || (edit && descriptionText?.trim() !== '')) {
            if(edit) {
                setToDo(todo.map(item =>
                    item.id === edit ? {...item, description: descriptionText} : item
                    ));
                setEdit(null);
            } else {
                setToDo([...todo, {id: Date.now(), title: text, description: ''}]);
            }
            setText('');
            setShowModal(false);
        }
    };

    return(
        <div className="app">
            <h1 className="task">Tasks List</h1>
            <button className="add_button" onClick={() => setShowModal(true)}>Add Item</button>

            <div className="todo_list">
            
                {todo.map((item) => (
                    <div key={item.id} className="todo_item">
                        <h3 className="title">{item.title}</h3>
                        <p>{item.description}</p>
                        <div className="todo_buttons">
                            <button className="edit_button" onClick={() => {
                                setText(item.text)
                                setEdit(item.id)
                                setDescription(item.description);
                                setShowModal(true);
                            }                        
                            }>Edit</button>
                            <button className="delete_button"
                                    onClick={() => setToDo(todo.filter((t) => t.id !== item.id))}                            
                            >Delete</button>                           
                        </div>                                         
                    </div>
                ))}
                
            </div>

            {showmodal && (
                <div className="modal_overlay">
                    <div className="modal">
                        <h3>Add New Task</h3>

                        {!edit && (
                            <textarea
                                rows="2"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Enter Task Title"
                            />
                        )}

                        {edit && (
                            <textarea
                                rows="4"
                                value={descriptionText}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter Description"
                            />
                        )}

                        <div className="modal_buttons">
                            <button onClick={handleAdd}>{edit ? "Save" : "Add"}</button>
                            <button onClick={() => {
                                setShowModal(false);
                                setText('');
                                setDescription('');
                                setEdit(null);
                            }}>Close</button>
                        </div>
                    </div>

                        
                    </div>
               
            )}
        </div>
    );
};

export default TodoList;