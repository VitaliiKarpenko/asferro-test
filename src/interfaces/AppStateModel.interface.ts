import UserModel from './UserModel.interface';
import NotificationModel from './NotificationModel.interface';

export default interface AppStateModel {
    users: UserModel[];
    notification: NotificationModel;
}
