import React, { useState } from 'react';
import usersStore from '../models/UsersStore';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const CreateUser = () => {
    const initialState = { name_first: '', name_last: '', age: 0 };

    const [state, setState] = useState(initialState);

    const handleClick = e => {
        const newObj = {
            name: { first: state.name_first, last: state.name_last },
            age: state.age,
        };

        usersStore.addUserItem(newObj);
    };

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="createuser row">
            <div className="col-md-6 col-sm-12 col-lg-6 col-md-offset-3">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <form name="myform">
                            <div className="form-group">
                                <label htmlFor="myName">First Name *</label>
                                <input
                                    id="name_first"
                                    name="name_first"
                                    className="form-control"
                                    type="text"
                                    onChange={handleChange}
                                    value={state.name_first}
                                    data-validation="required"
                                />
                                <span id="error_name" className="text-danger"></span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname">Last Name *</label>
                                <input
                                    id="name_last"
                                    name="name_last"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={state.name_last}
                                    type="text"
                                    data-validation="email"
                                />
                                <span id="error_lastname" className="text-danger"></span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="age">Age *</label>
                                <input
                                    id="age"
                                    name="age"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={state.age}
                                    type="number"
                                    min="1"
                                />
                                <span id="error_age" className="text-danger"></span>
                            </div>
                            <Link to="/">
                                <Button
                                    variant="outline-success"
                                    id="submit"
                                    onClick={handleClick}
                                >
                                    Создать
                                </Button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;
