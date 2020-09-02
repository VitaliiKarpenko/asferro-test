import Vue from 'vue';
import Vuex from 'vuex';
import AppStateModel from '../../interfaces/AppStateModel.interface';
import UserModel from '../../interfaces/UserModel.interface';
import NotificationModel from '../../interfaces/NotificationModel.interface';
import UserEditModel from '../../interfaces/UserEditModel.interface';
import httpService from '../../services/HttpService';

Vue.use(Vuex);

function findIndexById(id: string, users: UserModel[]): number {
    return users.findIndex((u: UserModel) => u._id === id);
}

export default {
    state: {
        users: [] as UserModel[],
        notification: {status: null, message: ''} as NotificationModel,
    } as AppStateModel,

    mutations: {

        addUser: (state: AppStateModel, user: UserModel) => {
            state.users.push(user);
            state.users = [...state.users];
        },

        setUsers: (state: AppStateModel, users: UserModel[]) => state.users = [...users],

        deleteUser: (state: AppStateModel, id: string) => {
            state.users.splice(findIndexById(id, state.users), 1);
            state.users = [...state.users];
        },

        setNotification(state: AppStateModel, notification: NotificationModel) {
            state.notification = notification;
        },

        unsetNotification(state: AppStateModel) {
            state.notification.status = null;
        },
    },

    actions: {
        addUser({commit}: any, user: UserEditModel): void {
            httpService.addUser(user).then((res: UserModel) => {
                commit('addUser', res);
            });
        },

        getUsers({commit}: any): void {
            httpService.getUsers().then((res: UserModel[]) => commit('setUsers', res));
        },

        updateUser({commit}: any, user: UserEditModel) {
            httpService.updateUser(user).then(() => {
                // PUT does not return updated user, so to obtain Update Date GET performed again
                httpService.getUsers().then((res: UserModel[]) => commit('setUsers', res));
            });
        },

        deleteUser({commit}: any, id: string) {
            httpService.deleteUser(id).then(() => commit('deleteUser', id));
        },

        showNotification({commit}: any, notification: NotificationModel) {
            commit('setNotification', notification);
            setTimeout(() => commit('unsetNotification', notification), 4000);
        },
    },

    getters: {
        getNotification: (state: AppStateModel) => state.notification,
        getUsers: (state: AppStateModel) => state.users,
    },

};
