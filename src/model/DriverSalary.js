import {Model, Collection} from 'vue-mc'

export class DriverSalaryModel extends Model {
    constructor(response) {
        super();
        return {
            stdMonth : response.stdMonth,
            driverNm : response.driverNm,
            totalWorkCnt : response.totalWorkCnt,
            totalDeliveryCnt : response.totalDeliveryCnt,
            basicTotalSum : response.basicTotalSum,
            extraTotalSum : response.extraTotalSum,
            supportSum : response.supportSum,
            csSum : response.csSum,
            penaltySum : response.penaltySum,
            minusSum : response.minusSum,
            driverTotalSum : response.driverTotalSum
        }
    }

    defaults() {
        return {
            stdMonth : '',
            driverNm : '',
            totalWorkCnt : '',
            totalDeliveryCnt : '',
            basicTotalSum : '',
            extraTotalSum : '',
            supportSum : '',
            csSum : '',
            penaltySum : '',
            minusSum : '',
            driverTotalSum : ''
        }
    }
}

export class DriverSalaryList extends Collection {

    model() {
        return DriverSalaryModel;
    }

    defaults() {
        return {
            orderBy: 'driverNm',
        }
    }
}