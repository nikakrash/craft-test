import React, { useState, FC, useEffect } from 'react';
import usersStore from '../models/UsersStore';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

interface EditUserProps {
    firstNameInit: string;
    lastNameInit: string;
    ageInit: number;
    match: any;
    params: any;
    userID: string;
}

export const EditUser: FC<EditUserProps> = props => {
    const [firstName, setFirstName] = useState(props.firstNameInit);
    const [lastName, setLastName] = useState(props.lastNameInit);
    const [age, setAge] = useState(props.ageInit);
    const userId = +props.match.params.userID;

    useEffect(() => {
        const updateUser = usersStore.usersState.find(
            (el: any, index: number) => userId === index,
        );

        setFirstName(updateUser.name.first);
        setLastName(updateUser.name.last);
        setAge(updateUser.age);
    }, [userId]);

    const handleClick = () => {
        const editedObj = {
            name: { first: firstName, last: lastName },
            age,
        };

        usersStore.editUserItem(editedObj, userId);
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
                                    onChange={e => setFirstName(e.target.value)}
                                    value={firstName || ''}
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
                                    onChange={e => setLastName(e.target.value)}
                                    value={lastName || ''}
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
                                    onChange={e => setAge(Number(e.target.value))}
                                    value={age || 0}
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
