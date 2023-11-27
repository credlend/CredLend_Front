export class InvestmentOperation{
    constructor(){
        this.typePlan = '';
        this.valuePlan = 0;
        this.transactionWay = '';
        this.userID = '';
        this.userName = '';
        this.email= '';
        this.operationDate = undefined;
        this.isActive = true;
        this.returnRate = 0;
        this.returnDeadLine = undefined;
    }

    id!: string;
    typePlan!: string;
    valuePlan!: number;
    transactionWay!: string;
    userID!: string;
    userName!: string;
    email!: string;
    isActive!: boolean;
    returnDeadLine!: Date | undefined;
    operationDate!: Date | undefined;
    returnRate!: number; 
}