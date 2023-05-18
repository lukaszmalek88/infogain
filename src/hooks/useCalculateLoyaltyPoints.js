import { useMemo } from "react"
import moment from 'moment'

const dateFormat = 'MM/DD/YYYY'
const hundred = 100
const pointsOverHundred = 2
const minimalAmountForPoints = 50
const threeMonthsBack = 3
const twoMonthsBack = 2
const oneMonthBack = 1
const dateThreeMonthsBack = moment().subtract(threeMonthsBack, 'month').format(dateFormat)
console.log(dateThreeMonthsBack)

const calculatePoinstPerTransaction = (amount) => {
    let points = 0;
    const floorAmount = Math.floor(amount)
    if (floorAmount <= 100 && floorAmount > 50) {
        points = floorAmount - minimalAmountForPoints
    } else if (floorAmount > 100) {
        points = (floorAmount - hundred) * pointsOverHundred + minimalAmountForPoints
    }

    return points
}

const minimalDate = (backMonth) => moment().subtract(backMonth, 'months').format(dateFormat);
const maximumDate = (backMonth) => moment().subtract((backMonth - oneMonthBack), 'months').format(dateFormat);

export const useCalculateLoyaltyPoints = ({ data }) => {
    const transactionsFromThreeMonths = useMemo(() => {
        const preparedTransactions = data?.filter(el => {
            const elDate = moment(el.date, dateFormat)
            return elDate.isSameOrAfter(dateThreeMonthsBack)
        })

        return preparedTransactions
    }, [data])

    const pointsArr = useMemo(() => {
        let calculatedPointsArr = []
        for (let i = 0; i < transactionsFromThreeMonths?.length; i++) {
            const { customerId, name, date, amount } = transactionsFromThreeMonths[i]
            calculatedPointsArr.push({
                customerId: customerId,
                name: name,
                date: date,
                points: calculatePoinstPerTransaction(amount)
            })
        }

        return calculatedPointsArr;
    }, [transactionsFromThreeMonths])

    const summedPoints = useMemo(() => {
        const summedPoints = {}

        for (let i = 0; i < pointsArr.length; i++) {
            const element = pointsArr[i]
            const { customerId, points, name, date } = element

            if (summedPoints[customerId]) {
                summedPoints[customerId].totalPoints += points;
                summedPoints[customerId].threeMonthsBack = moment(date, dateFormat).isBetween(minimalDate(threeMonthsBack), maximumDate(threeMonthsBack), null, '[)') ? summedPoints[customerId].threeMonthsBack += points : summedPoints[customerId].threeMonthsBack;
                summedPoints[customerId].twoMonthsBack = moment(date, dateFormat).isBetween(minimalDate(twoMonthsBack), maximumDate(twoMonthsBack), null, '[)') ? summedPoints[customerId].twoMonthsBack += points : summedPoints[customerId].twoMonthsBack;
                summedPoints[customerId].monthBack = moment(date, dateFormat).isSameOrAfter(minimalDate(oneMonthBack)) ? summedPoints[customerId].monthBack += points : summedPoints[customerId].monthBack;
            } else {
                summedPoints[customerId] = {
                    name: name,
                    totalPoints: points,
                    customerId: customerId,
                    threeMonthsBack: moment(date, dateFormat).isBetween(minimalDate(threeMonthsBack), maximumDate(threeMonthsBack)) ? points : 0,
                    twoMonthsBack: moment(date, dateFormat).isBetween(minimalDate(twoMonthsBack), maximumDate(twoMonthsBack)) ? points : 0,
                    monthBack: moment(date, dateFormat).isSameOrAfter(minimalDate(oneMonthBack)) ? points : 0,
                }
            }
        }

        const summedPointsArray = Object.entries(summedPoints).map(([customerId, obj]) => {
            return {
                customerId: parseInt(customerId),
                name: obj.name,
                totalPoinst: obj.totalPoints,
                threeMonthsBack: obj.threeMonthsBack,
                twoMonthsBack: obj.twoMonthsBack,
                monthBack: obj.monthBack
            };
        });

        return summedPointsArray
    }, [pointsArr])

    return { summedPoints }
}