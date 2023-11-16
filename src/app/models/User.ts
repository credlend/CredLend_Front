export class User{

    constructor() {
        this.id = 0;
        this.nome = '';
        this.sobrenome = '';
        this.sobrenome = '';
        this.cpf = '';
        this.dataNascimento = undefined;
        this.email = '';
        this.senha = '';
        this.confirmsenha = '';
    }

    id!: number;
    nome!: string;
    sobrenome!: string;
    cpf!: string;
    dataNascimento!: Date | undefined;
    email!: string;
    senha!: string;
    confirmsenha!: string;
}