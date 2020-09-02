import axios from 'axios';
import UserModel from '../interfaces/UserModel.interface';
import UserResponseModel from '../interfaces/UserResponseModel.interface';
import DateUntilDay from '../models/DateUntilDay';
import DateTime from '../models/DateTime';
import NotificationModel from '../interfaces/NotificationModel.interface';
import store from '../store';
import UserEditModel from '../interfaces/UserEditModel.interface';
import UserRequestModel from '../interfaces/UserRequestModel.interface';

const URL = 'https://jsonbox.io/box_d6ac1d9f7a5d2129ed96';

export default {

    addUser(user: UserEditModel): Promise<UserModel> {
        return axios.post(URL, this.convertToRequestModel(user) as UserRequestModel)
        .then((res: any) => {
            this.successNotify('added');
            return this.convertToUserModel(res.data as UserResponseModel);
        })
        .catch((error: any) => {
            this.errorNotify('user adding');
            return error;
        });
    },

    getUsers(): Promise<UserModel[]> {
        return axios.get(URL)
        .then((res) => {
            return res.data.map((user: UserResponseModel) => this.convertToUserModel(user));
        })
        .catch((error) => {
            this.errorNotify('users getting');
            return error;
        });
    },

    updateUser(user: UserEditModel): Promise<UserModel> {
        return axios.put(URL + '/' + user._id, this.convertToRequestModel(user) as UserRequestModel)
        .then(() => {
            this.successNotify('updated');
        })
        .catch((error) => {
            this.errorNotify('user updating');
            return error;
        });
    },

    deleteUser(id: string): Promise<any> {
        return axios.delete(URL + '/' + id)
        .then(() => {
            this.successNotify('deleted');
        })
        .catch((error) => {
            this.errorNotify('user deleting');
            return error;
        });
    },

    convertToRequestModel(user: UserEditModel): UserRequestModel {
        return {...user,
            name: this.trimCapitalize(user.name),
            surname: this.trimCapitalize(user.surname),
            birthday: user.birthday?.toString() || null};
    },

    trimCapitalize(str: string): string {
        str = str.trim();
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    convertToUserModel(user: UserResponseModel): UserModel {
        return {
            _id: user._id,
            name: user.name,
            surname: user.surname,
            birthday: user.birthday ? new DateUntilDay(this.convertDate(user.birthday)) : null,
            phone: user.phone || '',
            email: user.email || '',
            update: new DateTime(user._updatedOn || user._createdOn),
        };
    },

    convertDate(dateStr: string): string {
        const dateArr = dateStr.split(' ');
        const date = dateArr[0].split('.');
        const convertedDay = `${date[1]}-${date[0]}-${date[2]}`;
        return dateArr[1] ? convertedDay + ' ' + dateArr[1] : convertedDay;
    },

    successNotify(msg: string): void {
        this.notify({status: 'success', message: `User ${msg} successfully.`});
    },

    errorNotify(msg: string): void {
        this.notify({status: 'error', message: `During ${msg} an error has occurred.`});
    },

    notify(not: NotificationModel): void {
        store.dispatch('showNotification', not);
    },

};
