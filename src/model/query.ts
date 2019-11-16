export class IQuery {
    _id: string;
    query: string;
    description: string;
    interval: Number;

    constructor(){
        this._id = "";
        this.query = "";
        this.description = "";
        this.interval = 300;
    }
}
