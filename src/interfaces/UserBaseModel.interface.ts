export default interface UserBaseModel {
    _id: string;
    name: string;
    surname: string;
    phone: string | null;
    email: string | null;
}
