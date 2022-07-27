import React, { useEffect, useState } from 'react';
import { Route, NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

import ItemDescription from './ItemDescription';
import ItemShipping from './ItemShipping';

function Item(props) {
  const [item, setItem] = useState({});
  const { id } = props.match.params;
  console.log(useParams())

  useEffect(()=>{
    axios.get(`http://localhost:3333/items/${id}`)
      .then(res=>{
        setItem(res.data);
      });
  }, []);

  if (!item) {
    return <h2>Loading item data...</h2>;
  }

  const handleEditButton = () => {
    props.history.push(`/item-update/${item.id}`)
  }

  //add onclick handler
  //add an axios call to delete the item with the relevant item id
  //reflect new change in client - update our state with our returned values
  //redirect to item list

  const handleDeleteButton = (e) => {
    e.preventDefault()
    axios.delete(`http://localhost:3333/items/${item.id}`)
        .then(res => {
          console.log(res)
          props.setItems(res.data);
          props.history.push('/item-list')
        })
        .catch(err => console.log(err))
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
      <button onClick={handleEditButton} className="md-button">
        Edit
      </button>
      <button onClick={handleDeleteButton} className="md-button">
        Delete
      </button>
    </div>
  );
}

export default Item;
