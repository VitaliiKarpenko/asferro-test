export default interface NotificationModel {
    status: 'success' | 'error' | null;
    message: string;
}
