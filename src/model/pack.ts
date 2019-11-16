import { IQuery } from './query';

export class IPack { 
    _id: string;
    description: string;
    operatingStytem: string[];
    queries: IQuery[]
};
