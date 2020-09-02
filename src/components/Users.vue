<template>
    <div>
        <v-data-table :headers="headers"
                    :items="getUsers"
                    class="elevation-1"
                    hide-default-footer
                    :page.sync="page"
                    :items-per-page="itemsPerPage"
                    @page-count="pageCount = $event">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Users</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <AlertNotification></AlertNotification>
                    <v-spacer>
                    </v-spacer>
                    <AddEditUserDialog :item="itemForEdit" @close="onDialogClose">
                    </AddEditUserDialog>
                </v-toolbar>
            </template>

            <template v-slot:[`body.prepend`]>
                <tr class="filter-tr">
                    <td class="filter-td" >
                        <v-text-field v-model="nameFilter.value"
                                    type="text"
                                    label="Filter by name"
                                    outlined dense></v-text-field>
                    </td>
                    <td class="filter-td" >
                        <v-text-field v-model="surnameFilter.value"
                                    type="text"
                                    label="Filter by Surname"
                                    outlined dense></v-text-field>
                    </td>
                    <td class="filter-td" >
                        <v-text-field v-model="birthdayFilter.value"
                                    type="text"
                                    label="Filter by Date of Birthday"
                                    outlined dense></v-text-field>
                    </td>
                    <td class="filter-td" >
                        <v-text-field v-model="phoneFilter.value"
                                    type="text"
                                    label="Filter by Phone Number"
                                    outlined dense></v-text-field>
                    </td>
                    <td class="filter-td" >
                        <v-text-field v-model="emailFilter.value"
                                    type="text"
                                    label="Filter by E-mail"
                                    outlined dense></v-text-field>
                    </td>
                    <td class="filter-td" >
                        <v-text-field v-model="updateFilter.value"
                                    type="text"
                                    label="Filter by Create/Update Date"
                                    outlined dense></v-text-field>
                    </td>
                </tr>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small @click="confirmUserDelete(item)">mdi-delete</v-icon>
            </template>
        </v-data-table>

        <v-pagination v-model="page"
                      :length="pageCount"
                      prev-icon="mdi-menu-left"
                      next-icon="mdi-menu-right"></v-pagination>

        <v-dialog v-model="dialog" max-width="350px">
            <v-card>
                <v-card-title class="headline">Confirm to delete user.</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false; userToDelete = null">Cancel</v-btn>
                        <v-btn color="red darken-1" text @click="dialog = false; deleteItem(userToDelete)">Delete</v-btn>
                    </v-card-actions>
            </v-card>
        </v-dialog>
    </div>

</template>

<script lang="ts">
import Vue from 'vue';
import UserModel from '../interfaces/UserModel.interface';
import UserEditModel from '../interfaces/UserEditModel.interface';
import UserRequestModel from '../interfaces/UserRequestModel.interface';
import NotificationModel from '../interfaces/NotificationModel.interface';
import DateUntilDay from '../models/DateUntilDay';
import DateTime from '../models/DateTime';
import HttpService from '../services/HttpService';
import AddEditUserDialog from './AddEditUserDialog.vue';
import AlertNotification from './AlertNotification.vue';
import store from '../store';


export default Vue.extend({
    components: {
        AddEditUserDialog,
        AlertNotification,
    },

    data: () => ({
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        nameFilter: {value: ''},
        surnameFilter: {value: ''},
        birthdayFilter: {value: ''},
        phoneFilter: {value: ''},
        emailFilter: {value: ''},
        updateFilter: {value: ''},
        itemForEdit: null as UserEditModel | null,
        defaultItem: {
            name: '',
            surname: '',
            birthday: null,
            phone: '',
            email: '',
            update: new DateTime(),
        } as UserModel,
        dialog: false,
        userToDelete: null as UserModel | null,
    }),

    computed: {
        headers() {
            return [{
                text: 'Name',
                align: 'start',
                value: 'name',
                // @ts-ignore
                filter: this.getSearchFunc(this.nameFilter),
            },
            {
                text: 'Surname',
                value: 'surname',
                // @ts-ignore
                filter: this.getSearchFunc(this.surnameFilter),
            },
            {
                text: 'Date of Birthday',
                value: 'birthday',
                // @ts-ignore
                filter: this.getSearchFunc(this.birthdayFilter),
            },
            {
                text: 'Phone Number',
                value: 'phone',
                // @ts-ignore
                filter: this.getSearchFunc(this.phoneFilter),
            },
            {
                text: 'E-mail',
                value: 'email',
                // @ts-ignore
                filter: this.getSearchFunc(this.emailFilter),
            },
            {
                text: 'Create/Update Date',
                value: 'update',
                // @ts-ignore
                filter: this.getSearchFunc(this.updateFilter),
            },
            {
                text: 'Actions',
                value: 'actions',
                sortable: false,
            },
        ];
    },

        getUsers(): UserModel[] {
            return store.getters.getUsers;
        },

    },

    created(): void {
        store.dispatch('getUsers');
    },

    methods: {

        getSearchFunc: (filter: {value: string}): ((value: string) => boolean) => {
            return (value: string): boolean => {
                if (!value) {
                    return filter.value ? false : true;
                }
                const compareVal = value.toString === void 0 ? value : value.toString();
                return compareVal.toLowerCase().includes(filter.value.toLowerCase());
            };
        },

        editItem(item: UserModel): void {
            const {update, ...itemForEdit} = item;
            this.itemForEdit = itemForEdit;
        },

        confirmUserDelete(user: UserModel): void {
            this.userToDelete = user;
            this.dialog = true;
        },

        deleteItem(user: UserModel): void {
            store.dispatch('deleteUser', user._id);
        },

        onDialogClose(result: UserEditModel): void {
            if (result !== null) {
                if (result._id) {
                    store.dispatch('updateUser', result);
                } else {
                    store.dispatch('addUser', result);
                }
            }
            this.itemForEdit = null;
        },
     },
});
</script>

<style>
    .v-toolbar__title {
        width: 60px;
    }
    .filter-tr:hover {
        background-color: #fff !important;
    }
    .filter-td {
        padding-top: 5px !important;
        padding-bottom: 5px !important;
    }
    .filter-td:hover {
        background-color: #fff !important;
    }
    .v-input__slot {
        margin: 0;
    }
    .filter-td .v-text-field__details {
        display: none;
    }
</style>
