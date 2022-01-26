import React from "react";
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';

function ItemsList(props) {
  const { items } = props;
  const { push } = useHistory();

  function handleClick(ev, item) {
    ev.preventDefault();
    push(`/item-list/${item.id}`);
  }
  
  return (
    <div className="items-list-wrapper">
      {items.map(item => (
        <div
          onClick={ev => handleClick(ev, item)}
          className="item-card"
          key={item.id}
        >
          <img
            className="item-list-image"
            src={item.imageUrl}
            alt={item.name}
          />
          <p>{item.name}</p>
          <p>${item.price}</p>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state)=> {
  return({
    items: state.items
  });
}

export default connect(mapStateToProps)(ItemsList);