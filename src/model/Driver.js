import {Model, Collection} from 'vue-mc'

export class DriverModel extends Model {
    constructor(response) {
        super();
        return {
            id: response.userId,
            name: response.userNm,
            pwd: response.userPw,
            tel: Config.parsePhoneNumber(response.mbtlNo.replaceAll("-", "")),
            userid: response.userid,
            disable: true
        }
    }

    defaults() {
        return {
            id: '',
            name: '',
            pwd: '',
            tel: '',
            userid: '',
        }
    }
}

export class DriverList extends Collection {

    model() {
        return DriverModel;
    }

    defaults() {
        return {
            orderBy: 'id',
        }
    }
}

export class DriverRecoveryModel extends Model {
    constructor(response) {
        super();
        return {
            driverNm : response.driverNm,
            driverId : response.driverId,
            ymd : response.ymd,
            goCount : response.goCount,
            maeCount : response.maeCount,
            bulCount : response.bulCount,
            banCount : response.banCount
        }
    }

    defaults() {
        return {
            driverNm : '',
            driverId : '',
            ymd : '',
            goCount : '',
            maeCount : '',
            bulCount : '',
            banCount : ''
        }
    }
}

export class DriverRecoveryList extends Collection {

    model() {
        return DriverRecoveryModel;
    }

    defaults() {
        return {
            orderBy: 'id',
        }
    }
}