import { IQuery } from './query';

export class IPack { 
    _id: String;
    description: String;
    operatingStytem: String[];
    queries: IQuery[]
};