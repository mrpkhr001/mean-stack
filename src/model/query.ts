export class IQuery {
    _id: String;
    query: String;
    description: String;
    interval: Number;

    constructor(){
        this._id = "";
        this.query = "";
        this.description = "";
        this.interval = 300;
    }
}