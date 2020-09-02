import DateTime from '@/models/DateTime';
import UserEditModel from './UserEditModel.interface';

export default interface UserModel extends UserEditModel {
    update: DateTime;
}
