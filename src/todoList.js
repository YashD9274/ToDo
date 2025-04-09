/*import React, {useState } from "react";

function TodoList() {
    const [todo, setToDo] = useState([]);
    const [text, setText] = useState('');
    const [showmodal, setShowModal] = useState(false);
    const [edit, setEdit] = useState(null);
    const [descriptionText, setDescription] = useState([]);

    const handleAdd = () => {
        if ((!edit && text?.trim() !== '') || (edit && descriptionText?.trim() !== '')) {
            if(edit) {
                setToDo(todo.map(item =>
                    item.id === edit
                        ? {
                            ...item,
                            description: [...(Array.isArray(item.description) ? item.description : [item.description]), descriptionText],
                            completed: false
                        }
                        : item
                ));
                setEdit(null);
            } else {
                setToDo([...todo, {id: Date.now(), title: text, description: []}]);
            }
            setText('');
            setShowModal(false);
        }
    };

    const toggleComplete = (id) => {
        setToDo(todo.map(item =>
          item.id === id
            ? {
              ...item,
              description: item.description.map((desc, i, arr) =>
                i === arr.length - 1
                  ? { ...desc, completed: true }
                  : desc
              )
            }
            : item
        ));
      };

    return(
        <div className="app">
            <h1 className="task">Tasks List</h1>
            <button className="add_button" onClick={() => setShowModal(true)}>Add Item</button>

            <div className="todo_list">
            
                {todo.map((item) => (
                    <div key={item.id} className="todo_item">
                        <h3 className="title">{item.title}</h3>
                        {item.description.length > 0 && (
                        <div className="description_wrapper">
                            {item.description.map((desc, index) => (
                                <p
                                    key={index}
                                    className="todo_description"
                                    style={{ textDecoration: item.completed ? 'line-through' : 'none' }}
                                >
                                    {desc.text}
                                </p>
                            ))}
                            {!item.description[item.description.length - 1]?.completed && (
                                <button
                                    className="complete_button"
                                    onClick={() => toggleComplete(item.id)}
                                >
                                    Done
                                </button>
                                )}
                        </div>
                    )}
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
                                setDescription([]);
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
*/




import React, { useState } from "react";

function TodoList() {
  const [todo, setToDo] = useState([]);
  const [text, setText] = useState('');
  const [showmodal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [descriptionText, setDescription] = useState('');

  const handleAdd = () => {
    if ((!edit && text?.trim() !== '') || (edit && descriptionText?.trim() !== '')) {
      if (edit) {
        setToDo(todo.map(item =>
          item.id === edit
            ? {
              ...item,
              description: [
                ...item.description,
                { text: descriptionText, completed: false }
              ]
            }
            : item
        ));
        setEdit(null);
      } else {
        setToDo([
          ...todo,
          {
            id: Date.now(),
            title: text,
            description: [], // will hold objects like {text, completed}
          }
        ]);
      }
      setText('');
      setDescription('');
      setShowModal(false);
    }
  };

  const toggleComplete = (id) => {
    setToDo(todo.map(item =>
      item.id === id
        ? {
          ...item,
          description: item.description.map((desc, i, arr) =>
            i === arr.length - 1
              ? { ...desc, completed: true }
              : desc
          )
        }
        : item
    ));
  };

  return (
    <div className="app">
      <h1 className="task">Tasks List</h1>
      <button className="add_button" onClick={() => setShowModal(true)}>Add Item</button>

      <div className="todo_list">
        {todo.map((item) => (
          <div key={item.id} className="todo_item">
            <h3 className="title">{item.title}</h3>
            {item.description.length > 0 && (
              <div className="description_wrapper">
                {item.description.map((desc, index) => (
                  <p
                    key={index}
                    className="todo_description"
                    style={{ textDecoration: desc.completed ? 'line-through' : 'none' }}
                  >
                    {desc.text}
                  </p>
                ))}
                {!item.description[item.description.length - 1]?.completed && (
                  <button
                    className="complete_button"
                    onClick={() => toggleComplete(item.id)}
                  >
                    Done
                  </button>
                )}
              </div>
            )}
            <div className="todo_buttons">
              <button className="edit_button" onClick={() => {
                setText(item.title);
                setEdit(item.id);
                setDescription('');
                setShowModal(true);
              }}>Edit</button>
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
            <h3>{edit ? "Add Description" : "Add New Task"}</h3>

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
}

export default TodoList;
