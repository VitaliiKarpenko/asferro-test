<template>
    <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New User</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">{{item === null ? 'New' : 'Edit'}} User</span>
            </v-card-title>

            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="12">
                                <v-text-field v-model="editedItem.name" 
                                              label="Name"
                                              :rules="nameRules"
                                              outlined dense></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="12">
                                <v-text-field v-model="editedItem.surname"
                                              label="Surname"
                                              :rules="surnameRules"
                                              outlined dense></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="12">
                                <v-text-field v-model="editedItem.birthday"
                                              label="Date of Birthday"
                                              :rules="birthdayRules"
                                              validate-on-blur
                                              outlined dense
                                              placeholder="DD.MM.YYYY"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="12">
                                <v-text-field v-model="editedItem.phone"
                                                label="Phone Number"
                                                :rules="phoneRules"
                                                validate-on-blur
                                                outlined dense
                                                placeholder="0XXYYYYYYY"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="12">
                                <v-text-field v-model="editedItem.email"
                                              label="E-mail"
                                              :rules="emailRules"
                                              validate-on-blur
                                              outlined dense></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="onCancel()">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="saveForm()" :disabled="!valid">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import UserEditModel from '../interfaces/UserEditModel.interface';


const defaultEditedItem: UserEditModel = {
    _id: '',
    name: '',
    surname: '',
    birthday: null,
    phone: '',
    email: '',
};

export default Vue.extend({

    props: {
        item: Object,
    },

    data: () => ({
        // dialog data:
        editedItem: {...defaultEditedItem} as UserEditModel,
        dialog: false as boolean,

        // form data:
        valid: false as boolean,
        nameRules: [
            (value: string) => !!value || 'Required.',
            (value: string) => (value || '').length <= 60 || 'Max 60 characters',
        ] as Array<(value: string) => boolean | string>,
        surnameRules: [
            (value: string) => !!value || 'Required.',
            (value: string) => (value || '').length <= 60 || 'Max 60 characters',
        ] as Array<(value: string) => boolean | string>,
        birthdayRules: [
            (value: string) => (!value ||
                                /^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.]\d\d\d\d$/.test(value)) ||
                                'Invalid date format',
        ] as Array<(value: string) => boolean | string>,
        phoneRules: [
            (value: string) => (!value || /^[0][0-9]{9}$/.test(value)) || 'Invalid phone number format',
        ] as Array<(value: string) => boolean | string>,
        emailRules: [
            (value: string) => (!value || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) ||
                                'E-mail invalid',
        ] as Array<(value: string) => boolean | string>,
    }),

    watch: {
        item(val: UserEditModel): void {
            if (val !== null) {
                this.openDialog(val);
            }
        },
        dialog(val): void {
            if (!val) {
                this.onCancel();
            }
        },
    },

    methods: {
        openDialog(val: UserEditModel): void {
            this.editedItem = {...val};
            this.dialog = true;
        },

        onCancel(): void {
            this.closeDialog();
            this.editedItem = {...defaultEditedItem};
            if (this.item !== null) {
                this.$emit('close', null);
            }
        },

        saveForm(): void {
            this.closeDialog();
            this.$emit('close', this.editedItem);
            this.editedItem = {...defaultEditedItem};
        },

        closeDialog(): void {
            this.dialog = false;
            this.$nextTick(() => {
                // @ts-ignore
                this.$refs.form.resetValidation();
            });
        },

    },
});
</script>

<style scoped>
    .col-sm-6.col-md-12.col-12 {
        padding: 5px;
    }
</style>
