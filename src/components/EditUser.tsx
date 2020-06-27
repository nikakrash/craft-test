import React, { useState } from 'react';
import usersStore from '../models/UsersStore';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const EditUser:React.FC = () => {
    function getUsername(url: string) {
        const urlParts = url.split('edit/');
        const userName = urlParts[1];

        return userName;
    }
    
    const id: string = getUsername(window.location.href);

    const initialState = {
        name_first: usersStore.users[id].name.first || ' ',
        name_last: usersStore.users[id].name.last || ' ',
        age: usersStore.users[id].age || ' ',
    };

    const [state, setState] = useState(initialState);

    const handleClick = (e:any) => {
        usersStore.editUserItem(state, id);
    };

    const handleChange = (e:any) => {
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
                                    Сохранить
                                </Button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
