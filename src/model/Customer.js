import {Model, Collection} from 'vue-mc'

export class CustomerModel extends Model {
    constructor(response) {
        super();
        return {
            code: response.code,
            code2: response.code2,
            compname: response.compname,
            compalias: response.compalias,
            dong: response.dong,
            ceoname: response.ceoname,
            ceoname2: response.ceoname2,
            telno1: response.telno1,
            hpno: response.hpno,
            fax: response.fax,
            compsn: response.compsn,
            delyn: (response.delyn === 'N') ? '관리함' : '관리안함',
            vatyn: response.vatyn,
            note: response.note,
            btnDetailMoveId: 'btnDetailMove' + response.code
        }
    }

    defaults() {
        return {
            code: '',
            code2: '',
            compname: '',
            compalias: '',
            dong: '',
            ceoname: '',
            ceoname2: '',
            telno1: '',
            hpno: '',
            fax: '',
            compsn: ''
        }
    }
}

export class CustomerList extends Collection {
    model() {
        return CustomerModel;
    }

    defaults() {
        return {
            orderBy: 'id',
        }
    }
}