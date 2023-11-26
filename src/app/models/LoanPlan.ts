export class LoanPlan {
    constructor() {
        this.id = '';
        this.typePlan = '';
        this.valuePlan = 0;
        this.transactionWay = '';
        this.isActive = true;
        this.paymentTerm = undefined;
        this.interestRate = 0;
    }

    id!: string;
    typePlan!: string;
    valuePlan!: number;
    transactionWay!: string;
    isActive!: boolean;
    paymentTerm!: Date | undefined;
    interestRate!: number;
}