export class InvestmentPlan{
    constructor(){
        this.id = '';
        this.typePlan = '';
        this.valuePlan = 0;
        this.transactionWay = '';
        this.isActive = true;
        this.returnDeadLine = undefined;
        this.returnRate = 0;
    }

    id!: string;
    typePlan!: string;
    valuePlan!: number;
    transactionWay!: string;
    isActive!: boolean;
    returnDeadLine!: Date | undefined;
    returnRate!: number; 
}