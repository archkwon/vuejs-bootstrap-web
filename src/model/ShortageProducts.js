import {Model, Collection} from 'vue-mc'

export class ShortageProductsModel extends Model {
    constructor(response) {
        super();
        return {
            partCode: response.partCode, //상품코드
            partMngCode: response.partMngCode, //관리코드
            partName: response.partName, //상품명
            partStd: response.partStd, //상품규격
            inOrderCount: response.inOrderCount, //기간매입
            outOrderCount: response.outOrderCount, // 기간매출
            minStock: response.minStock, // 최소
            maxStock: response.maxStock, // 최대
            nowStock: response.nowStock, // 현재고
            orderStock: response.orderStock, // 발주량
            unitPrice: response.unitPrice, //단가
            totalPrice: response.totalPrice, //금액
            bigo: response.bigo //비고
        }
    }

    defaults() {
        return {
            partCode: '',
            partMngCode: '',
            partName: '',
            partStd: '',
            inOrderCount: '',
            outOrderCount: '',
            minStock: '',
            maxStock: '',
            nowStock: '',
            orderStock: '',
            unitPrice: '',
            totalPrice: '',
            bigo: '',
        }
    }
}

export class ShortageList extends Collection {
    model() {
        return ShortageProductsModel;
    }

    defaults() {
        return {
            orderBy: 'partCode',
        }
    }
}