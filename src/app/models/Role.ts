export class Role{
    constructor() {
        this.email = '';
        this.role = 'User';
        this.delete = false;
    }

    email!: string;
    role!: string;
    delete!: boolean;
}