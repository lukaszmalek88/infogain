import React from 'react';
import { renderHook } from '@testing-library/react';
import { useCalculateLoyaltyPoints } from '../hooks/useCalculateLoyaltyPoints';

describe('useCalculateLoyaltyPoints', () => {
    test('should calculate loyalty points correctly', () => {
        const data = [
            {
                customerId: 1,
                name: 'John',
                date: '05/01/2023',
                amount: 75
            },
            {
                customerId: 2,
                name: 'Jane',
                date: '04/11/2023',
                amount: 125
            },
            {
                customerId: 3,
                name: 'Test',
                date: '03/11/2023',
                amount: 125
            },
            {
                customerId: 1,
                name: 'John',
                date: '02/01/2023',
                amount: 75
            },
            {
                customerId: 2,
                name: 'Jane',
                date: '01/15/2023',
                amount: 125
            },
        ];

        const { result } = renderHook(() => useCalculateLoyaltyPoints({ data }));
        const { summedPoints } = result.current;
        console.log(summedPoints)

        expect(summedPoints.length).toBe(3); // Adjust the expected length based on your test data

        // Example assertions for the calculated loyalty points
        expect(summedPoints[0].totalPoinst).toBe(25);
        expect(summedPoints[0].threeMonthsBack).toBe(0);
        expect(summedPoints[0].twoMonthsBack).toBe(0);
        expect(summedPoints[0].monthBack).toBe(25);

        expect(summedPoints[1].totalPoinst).toBe(100);
        expect(summedPoints[1].threeMonthsBack).toBe(0);
        expect(summedPoints[1].twoMonthsBack).toBe(100);
        expect(summedPoints[1].monthBack).toBe(0);
    });
});
