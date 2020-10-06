import {Model, Collection} from 'vue-mc'

export class CheckerModel extends Model {
    constructor(response){
        super();
        return{
            id: response.userId,
            name: response.userNm,
            tel: Config.parsePhoneNumber(response.mbtlNo.replaceAll("-", "")),
            disable: true
        }
    }

    defaults(){
        return {
            id : '',
            name : '',            
            tel : '',
            response : false,
        }
    }
}

export class CheckerList extends Collection {

    model(){
        return CheckerModel;
    }

    defaults(){
        return {
            orderBY : 'id',
        }
    }

}