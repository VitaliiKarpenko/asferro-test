import UserBaseModel from './UserBaseModel.interface';

export default interface UserRequestModel extends UserBaseModel {
    birthday: string | null;
}
