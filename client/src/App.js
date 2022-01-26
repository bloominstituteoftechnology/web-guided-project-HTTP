import React, { useEffect } from "react";

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import axios from "axios";

import { connect } from 'react-redux';

import { getItems } from './actions';

import Home from "./components/Home";
import ItemsList from "./components/ItemsList";
import Item from "./components/Item";
import ItemForm from "./components/ItemForm";
import UpdateForm from "./components/UpdateForm";
import "./styles.css";

const App = (props) => {
    const { getItems } = props;

    useEffect(() => getItems(), []);

    return (
        <div className="App">
        <nav>
            <h1 className="store-header">BloomTech Trinkets</h1>
            <div className="nav-links">
            <NavLink exact to="/item-form">
                Add Item
            </NavLink>
            <NavLink exact to="/">
                Home
            </NavLink>
            <NavLink to="/item-list">Shop</NavLink>
            </div>
        </nav>

        <Route exact path="/" component={Home} />
        <Route exact path="/item-list" component={ItemsList} />
        <Route exact path="/item-list/:id" component={Item}/>
        <Route path="/update-item/:id" component={UpdateForm}/>
        <Route path="/item-form" component={ItemForm} />

        </div>
    );
};

const mapStateToProps = (state)=> {
    return({
        items: state.items
    })
}

export default connect(mapStateToProps, { getItems })(App);