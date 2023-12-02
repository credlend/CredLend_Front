export class LoanPlan {
    constructor() {
        this.id = '';
        this.valuePlan = 0;
        this.transactionWay = '';
        this.isActive = true;
        this.paymentTerm = undefined;
        this.interestRate = 0;
    }

    id!: any;
    valuePlan!: number;
    transactionWay!: string;
    isActive!: boolean;
    paymentTerm!: Date | undefined;
    interestRate!: number;
}