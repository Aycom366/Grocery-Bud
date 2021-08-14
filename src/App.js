import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

//getting the local storage datas
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  //if it true, the return, if falsy then retrurn empty array
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
};

function App() {
  //the name we are passing, the form itself
  const [name, setName] = useState('');

  // for the list, array of name inputed
  //setting list as local storage that has been saved
  const [list, setList] = useState(getLocalStorage());

  //set editing flag
  const [isEditing, setIsEditing] = useState(false);

  //getting the id of what we are editing
  const [editId, setEditId] = useState(null);

  //the alert information,we are passing objects, passing many values
  //show alert or not, message that we are passing, then either dange or success
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });

  //handle submiy gunction
  const handleSubmit = (e) => {
    e.preventDefault();

    //if value is empty
    if (!name) {
      showAlert(true, 'danger', 'Please enter value');
    } else if (name && isEditing) {
      setList(
        //to change the edit title, we map through available list
        list.map((item) => {
          //if item.id mathes with the editId, of coz that what we are working on
          if (item.id === editId) {
            //then return all list with the spread operator changing only the title of the id
            return { ...item, title: name };
          }
          //if it din match then return same list
          return item;
        })
      );
      setName('');
      setEditId(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed');
    } else {
      //show alert
      showAlert(true, 'success', 'item added to the list');
      //the new item, adding date automatically
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  };

  //seting up the showalert function
  const showAlert = (show = false, type = '', msg = '') => {
    //then set the alert
    setAlert({ show, type, msg });
  };

  //clearlist
  const clearList = () => {
    showAlert(true, 'danger', 'list(s) cleared');
    //the set list to an empty array
    setList([]);
  };

  //remove specific item
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item Removed');
    //setting list to new value
    //if the item matches with the id am pasing, then dont return it, if it matches it, them return
    setList(list.filter((item) => item.id !== id));
    setName('');
  };

  //edit item
  const editItem = (id) => {
    //retrieving only one value
    //if id passed in is equal to current item, then plz return it
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  //using locastorage, anytime my list changes then modify local storage as well
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {/* The alert conditional rendering Componentt,
        passing the showAlert as prop to set interval
        passing in list to fix bug not counting more than 3 seconds
        */}
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="grocery"
            placeholder="e.g eggs"
          />
          <button className="submit-btn" type="submit">
            {/* button conditional rendenring */}
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>

      {/* check if list length is greater than zero */}
      {list.length > 0 && (
        <div className="grocery-container">
          {/* passing the list as prop
            passing the remove item to where it would be used    
        */}
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button onClick={clearList} className="clear-btn">
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
