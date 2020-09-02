import DateUntilDay from './DateUntilDay';

export default class DateTime extends DateUntilDay {

    constructor(dateStr?: string) {
        dateStr ? super(dateStr) : super();
    }

    public toString(): string {
        return `${this.getUntilDay()} ${this.getTime()}`;
    }

    private getTime(): string {
        const hours = this.d.getHours();
        const minutes = this.d.getMinutes();
        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }

}
