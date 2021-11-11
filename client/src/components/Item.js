import React, { useEffect, useState } from 'react';
import { Route, NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';

import ItemDescription from './ItemDescription';
import ItemShipping from './ItemShipping';

function Item(props) {
  const [item, setItem] = useState({});
  const { id } = props.match.params;

  const { push } = useHistory();

  useEffect(()=>{
    axios.get(`http://localhost:3333/items/${id}`)
      .then(res=>{
        setItem(res.data);
      });
  }, []);

  if (!item) {
    return <h2>Loading item data...</h2>;
  }

  const handelEdit = () => {
    //1. Capture a click of the edit button.
    //2. redirect the user to the edit form.
    push(`/item-update/${id}`);
    
  }

  //To Delete:
  //1. Capture a click.
  //2. Send our axios call to delete current item (id)
  //3. Redirect user to item list page.
  //4. Update local state
  const handelDelete = () => {
    axios.delete(`http://localhost:3333/items/${id}`)
    .then (resp => {
      // console.log('resp: ', resp);
      props.setItems(resp.data);
      push("/item-list/");
    })
    .catch (err => {
      console.log(err);
    })
  }

  return (
    <div className="item-wrapper">
      <div className="item-header">
        <div className="image-wrapper">
          <img src={item.imageUrl} alt={item.name} />
        </div>
        <div className="item-title-wrapper">
          <h2>{item.name}</h2>
          <h4>${item.price}</h4>
        </div>
      </div>
      <nav className="item-sub-nav">
        <NavLink exact to={`/item-list/${item.id}`}>
          the story
        </NavLink>
        <NavLink to={`/item-list/${item.id}/shipping`}>shipping</NavLink>
      </nav>
      <Route
        exact
        path="/item-list/:id"
        render={props => <ItemDescription {...props} item={item} />}
      />
      <Route
        path="/item-list/:id/shipping"
        render={props => <ItemShipping {...props} item={item} />}
      />
      <button onClick = {handelEdit} className="md-button">
        Edit
      </button>
      <button onClick = {handelDelete} className="md-button">
        Delete
      </button>
    </div>
  );
}

export default Item;
