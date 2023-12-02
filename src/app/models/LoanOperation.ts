export class LoanOperation{
    constructor(){
        this.valuePlan = 0;
        this.transactionWay = '';
        this.userID = '';
        this.userName = '';
        this.email= '';
        this.isActive = true;
        this.paymentTerm = undefined;
        this.interestRate = 0;
    }

    id!: string;
    valuePlan!: number;
    transactionWay!: string;
    userID!: string;
    userName!: string;
    email!: string;
    isActive!: boolean;
    paymentTerm!: Date | undefined;
    interestRate!: number; 
}