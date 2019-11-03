
export class RegisterUser { 

    public constructor(init?: Partial<RegisterUser>) {
        Object.assign(this, init);
    }    
    _id: String;
    name: String;
    password: String;
    enrollmentSecret: String;
};