
export class RegisterUser { 

    public constructor(init?: Partial<RegisterUser>) {
        Object.assign(this, init);
    }    
    _id: string;
    name: string;
    password: string;
    enrollmentSecret: string;
    isAdmin: Boolean;
};
