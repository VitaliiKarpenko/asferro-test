import UserRequestModel from './UserRequestModel.interface';

export default interface UserResponseModel extends UserRequestModel {
    _createdOn: string;
    _updatedOn?: string;
}
