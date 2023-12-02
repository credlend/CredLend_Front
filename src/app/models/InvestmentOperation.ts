export class InvestmentOperation{
    constructor(){
        this.valuePlan = 0;
        this.transactionWay = '';
        this.userID = '';
        this.userName = '';
        this.email= '';
        this.isActive = true;
        this.returnRate = 0;
        this.returnDeadLine = undefined;
    }

    id!: string;
    valuePlan!: number;
    transactionWay!: string;
    userID!: string;
    userName!: string;
    email!: string;
    isActive!: boolean;
    returnDeadLine!: Date | undefined;
    returnRate!: number; 
}