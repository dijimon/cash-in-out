import { expect } from 'chai';
import { calculateCommissionFees } from '../src/calculateCommissionFees.js';

describe('Commission Fee Calculation', () => {
    it('should calculate correct fees for cash in operations', () => {
        const operations = [
            { date: '2016-01-05', user_id: 1, user_type: 'natural', type: 'cash_in', operation: { amount: 200.00, currency: 'EUR' } }
        ];
        const fees = calculateCommissionFees(operations);
        expect(fees).to.deep.equal(['0.06']);
    });

    it('should calculate correct fees for cash out operations for natural persons', () => {
        const operations = [
            { date: '2016-01-06', user_id: 1, user_type: 'natural', type: 'cash_out', operation: { amount: 300.00, currency: 'EUR' } }
        ];
        const fees = calculateCommissionFees(operations);
        expect(fees).to.deep.equal(['0.00']);
    });

    it('should calculate correct fees for cash out operations for juridical persons', () => {
        const operations = [
            { date: '2016-01-06', user_id: 2, user_type: 'juridical', type: 'cash_out', operation: { amount: 300.00, currency: 'EUR' } }
        ];
        const fees = calculateCommissionFees(operations);
        expect(fees).to.deep.equal(['0.90']);
    });
});
