import { getWeekNumber } from './getWeekNumber.js';
import { roundUp } from './utils.js';

export function calculateCommissionFees(operations) {
    const fees = [];
    const weeklyCashOuts = {};

    operations.forEach(operation => {
        const { date, user_id, user_type, type, operation: { amount, currency } } = operation;
        let fee = 0;

        if (type === 'cash_in') {
            fee = Math.min(amount * 0.0003, 5.00);
        } else if (type === 'cash_out') {
            if (user_type === 'natural') {
                const weekNumber = getWeekNumber(date);
                const userKey = `${user_id}-${weekNumber}`;

                if (!weeklyCashOuts[userKey]) {
                    weeklyCashOuts[userKey] = 0;
                }

                const totalCashOutThisWeek = weeklyCashOuts[userKey];
                const freeAmount = Math.max(0, 1000.00 - totalCashOutThisWeek);
                const taxableAmount = Math.max(0, amount - freeAmount);

                fee = taxableAmount * 0.003;
                weeklyCashOuts[userKey] += amount;
            } else if (user_type === 'juridical') {
                fee = Math.max(amount * 0.003, 0.50);
            }
        }

        // Round fee to the nearest cent
        fee = roundUp(fee);
        fees.push(fee.toFixed(2));
    });

    return fees;
}
