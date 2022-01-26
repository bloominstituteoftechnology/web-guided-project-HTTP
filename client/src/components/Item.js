import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';

import { deleteItems } from './../actions';

import ItemDescription from './ItemDescription';
import ItemShipping from './ItemShipping';

function Item(props) {
  const { deleteItems } = props;

  const [item, setItem] = useState({});
  const { id } = useParams();

  useEffect(()=>{
    axios.get(`http://localhost:3333/items/${id}`)
      .then(res=>{
        setItem(res.data);
      });
  }, []);

  if (!item) {
    return <h2>Loading item data...</h2>;
  }

  const handleEditClick = ()=> {
    props.history.push(`/update-item/${id}`);
  }

  const handleDeleteClick = ()=> {
    deleteItems(id)
      .then(()=> {
        props.history.push('/item-list');
      });
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
      <button onClick={handleEditClick} className="md-button">
        Edit
      </button>
      <button onClick={handleDeleteClick} className="md-button">
        Delete
      </button>
    </div>
  );
}

export default connect(null, { deleteItems })(Item);
