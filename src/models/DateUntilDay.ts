export default class DateUntilDay {
    protected d: Date;

    constructor(dateStr?: string) {
        this.d = dateStr ? new Date(dateStr) : new Date();
    }

    public toString(): string {
        return this.getUntilDay();
    }

    protected getUntilDay(): string {
        const day = this.d.getDate();
        const month = this.d.getMonth() + 1;
        const year = this.d.getFullYear();
        return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
    }

}
