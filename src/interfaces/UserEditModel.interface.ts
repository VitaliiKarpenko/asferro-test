import DateUntilDay from '@/models/DateUntilDay';
import UserBaseModel from './UserBaseModel.interface';

export default interface UserEditModel extends UserBaseModel {
    birthday: DateUntilDay | null;
}
