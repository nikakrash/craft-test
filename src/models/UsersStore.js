/* eslint-disable default-case */
import { action, extendObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import usersDB from '../users.json';

class ObservableUsersStore {
    constructor() {
        extendObservable(this, {
            users: [],
            get usersState() {
                return this.users;
            },
        });
    }

    saveLocal() {
        const lst = typeof localStorage === 'undefined' ? {} : localStorage;

        lst.users = JSON.stringify(this.usersState);
    }

    // Функция добавления
    addUserItem = action('addUserItem', function(userItem) {
        const guid = uuidv4();

        this.users.push({ ...userItem, ...{ guid } });
        this.saveLocal();
    });

    // Функция удаления
    deleteUserItem = action('deleteUserItem', function(guid) {
        const userList = this.users.filter((item, idx) => {
            if (item.guid !== guid.guid) {
                return item;
            }
        });

        this.users = userList;
        this.saveLocal();
    });

    // Функция редактирования
    editUserItem = action('editUserItem', function(userItem, id) {
        const userList = this.users.map((item, idx) => {
            if (idx === id) {
                item.name.first = userItem.name.first;
                item.name.last = userItem.name.last;
                item.age = userItem.age;
            }

            return item;
        });

        this.users = userList;
        this.saveLocal();
    });

    // Функция сортировки
    sortBy = action('sortBy', function(field) {
        const byField = field => {
            switch (field) {
                case 'age': {
                    return (a, b) => (a.age > b.age ? 1 : -1);
                }
                case 'first-name': {
                    return (a, b) => (a.name.first > b.name.first ? 1 : -1);
                }
                case 'last-name': {
                    return (a, b) => (a.name.last > b.name.last ? 1 : -1);
                }
                case 'index': {
                    return (a, b) => (a > b ? 1 : -1);
                }
            }
        };

        const sortedArray = this.users.sort(byField(field));

        this.users.replace(sortedArray);

        this.saveLocal();
    });
}

const insertData = store => {
    const lst = typeof localStorage === 'undefined' ? {} : localStorage;

    if (!!lst.users && JSON.parse(lst.users).length > 0) {
        JSON.parse(lst.users).forEach(e => store.addUserItem(e));
    } else {
        usersDB.forEach(e => store.addUserItem(e));
    }

    return store;
};

const usersStore = insertData(new ObservableUsersStore());

export default usersStore;
