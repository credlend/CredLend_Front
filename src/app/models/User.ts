export class User{

    constructor() {
        this.completeName = '';
        this.userName = '';
        this.cpf = '';
        this.birthDate = undefined;
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.isActive = true;
    }

    completeName!: string;
    userName!: string;
    cpf!: string;
    birthDate!: Date | undefined;
    email!: string;
    password!: string;
    confirmPassword!: string;
    isActive!: boolean;
}