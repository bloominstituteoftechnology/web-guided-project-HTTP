import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialItem = {
  name: "",
  price: "",
  imageUrl: "",
  description: "",
  shipping: ""
};

const UpdateForm = props => {
  // console.log('props in UpdateForm: ', props);
  const [item, setItem] = useState(initialItem);
  console.log('useParams: ', useParams());
  const { id } = useParams();
  // const {id} = props.match.params;
  const { push } = useHistory();

  //3. Get the data for the item we are editing.
  useEffect (() => {
    axios.get(`http://localhost:3333/items/${id}`)
    .then (resp => {
      console.log('resp: ', resp);
      setItem(resp.data);
    })
    .catch (err => {
      console.log(err);
    })
  }, [])

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "price") {
      value = parseInt(value, 10);
    }

    setItem({
      ...item,
      [ev.target.name]: value
    });
  };
  
  const handleSubmit = e => {
    //4. User changes the data.
    //5. Clicking the update button.
    e.preventDefault();
    //6. Put request to update the data.
    axios.put(`http://localhost:3333/items/${id}`, item)
    .then (resp => {
        //7. Redirect the user to the item page.
        //8. Update local storage with our new item list
        // console.log('props: ', props);
        // console.log('resp: ', resp);
        props.setItems(resp.data)
        push (`/item-list/${id}`)
    })
    .catch ( err => {
      console.log(err);
    });

  };

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={changeHandler}
          placeholder="name"
          value={item.name}
        />
        <div className="baseline" />

        <input
          type="number"
          name="price"
          onChange={changeHandler}
          placeholder="Price"
          value={item.price}
        />
        <div className="baseline" />

        <input
          type="string"
          name="imageUrl"
          onChange={changeHandler}
          placeholder="Image"
          value={item.imageUrl}
        />
        <div className="baseline" />

        <input
          type="string"
          name="description"
          onChange={changeHandler}
          placeholder="Description"
          value={item.description}
        />
        <div className="baseline" />

        <input
          type="string"
          name="shipping"
          onChange={changeHandler}
          placeholder="Shipping"
          value={item.shipping}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;