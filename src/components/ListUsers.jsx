import React, { useState } from 'react';
import { observer } from 'mobx-react';
import usersStore from '../models/UsersStore';
import { Link } from 'react-router-dom';
import { UserRowItem } from './UserRowItem';
import Button from 'react-bootstrap/Button';

export const ListUsers = observer(() => {
    const initialState = {
        firstName: '',
        lastName: '',
        age: 0,
        sortOrder: 1,
        users: usersStore.usersState,
    };

    const [state, setState] = useState(initialState);

    const itemsList = initialState.users.reduce((acc, value, index) => {
        const userIndex = usersStore.usersState.slice().findIndex((el, index) => {
            return el.name.first === value.name.first && el.name.last === value.name.last;
        });

        return userIndex === -1
            ? acc
            : acc.concat([
                  <UserRowItem
                      key={`userItem_${index}`}
                      value={value}
                      userID={userIndex}
                  />,
              ]);
    }, []);

    return (
        <div className="userListDiv">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>
                            <Button
                                variant="outline-dark"
                                id="sort-index"
                                onClick={() => usersStore.sortBy('index')}
                            >
                                #
                            </Button>
                        </th>
                        <th>
                            <Button
                                variant="outline-dark"
                                id="sort-first-name"
                                onClick={() => usersStore.sortBy('first-name')}
                            >
                                First Name
                            </Button>
                        </th>
                        <th>
                            <Button
                                variant="outline-dark"
                                id="sort-last-name"
                                onClick={() => usersStore.sortBy('last-name')}
                            >
                                Last Name
                            </Button>
                        </th>
                        <th>
                            <Button
                                variant="outline-dark"
                                id="sort-age"
                                onClick={() => usersStore.sortBy('age')}
                            >
                                Age
                            </Button>
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key="tr_filter">
                        <td key="id_filter">-</td>
                        <td key="nf_input">
                            <input
                                type="text"
                                name="firstName"
                                value={state.firstName}
                                onChange={() => {}}
                            ></input>
                        </td>
                        <td key="nl_input">
                            <input
                                type="text"
                                name="lastName"
                                value={state.lastName}
                                onChange={() => {}}
                            ></input>
                        </td>
                        <td key="age_input">
                            <input
                                type="number"
                                min="1"
                                step="1"
                                name="age"
                                value={state.age}
                                onChange={() => {}}
                            ></input>
                        </td>
                        <td key="actoions_input">
                            <span></span>
                            <span></span>
                        </td>
                    </tr>
                    {itemsList}
                </tbody>
            </table>
            <Link to="/create">
                <Button variant="outline-dark">Создать</Button>
            </Link>
        </div>
    );
});
