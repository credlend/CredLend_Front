export class LoanOperation{
    constructor(){
        this.typePlan = '';
        this.valuePlan = 0;
        this.transactionWay = '';
        this.userID = '';
        this.userName = '';
        this.email= '';
        this.operationDate = undefined;
        this.isActive = true;
        this.paymentTerm = undefined;
        this.interestRate = 0;
    }

    id!: string;
    typePlan!: string;
    valuePlan!: number;
    transactionWay!: string;
    userID!: string;
    userName!: string;
    email!: string;
    isActive!: boolean;
    operationDate!: Date | undefined;
    paymentTerm!: Date | undefined;
    interestRate!: number; 
}