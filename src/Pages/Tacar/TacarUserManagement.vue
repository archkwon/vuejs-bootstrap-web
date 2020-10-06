<template>
    <div>
        <b-card title="" class="main-card mb-4">
            <BreadCrumb></BreadCrumb>
            <div class="row">
                <div class="col-sm-12 col-md-12 col-xl-12">
                    <DemoCardNoTitle ref="tabBox">
                        <v-card-title style="border-bottom: 1px solid rgba(0,0,0,0.42);">                            
                            <div style="width: 20%;">
                                <v-text-field
                                    v-model="customerSearch"
                                    append-icon="search"
                                    label="거래처"
                                    autocomplete="off"
                                    placeholder="검색할 거래처 이름을 입력하세요"
                                    hide-details
                                    id="customerSearch"
                                    ref="customerSearch"
                                    v-on:keyup.enter="getCustomerList"
                                    @click:append="getCustomerList"
                                    v-on:change="event => customerSearchUpdate(event)"/>
                                <div id="searchedCustomerList" style="display: none;"></div>
                            </div>
                            <v-spacer/>
                            <div style="width: 20%;">
                                <v-text-field
                                    v-model="searchKeyword"
                                    label="사용자성명 OR 연락처"
                                    placeholder="사용자성명 OR 연락처"
                                    hide-details
                                    id="searchKeyword"
                                    ref="searchKeyword"
                                    style=""/>                                
                            </div>    
                            <v-spacer/>
                            <div style="width: 20%;">
                                <v-select 
                                    v-model="searchKind"
                                    :items="SEARCHKIND"
                                    label="승인여부"
                                    placeholder="선택하세요" 
                                    item-value='codeValue'
                                    item-text='codeName' 
                                    @change="getUserList"
                                    required
                                    return-object 
                                    style="width: 200px; height: 44px;"
                                ></v-select>
                            </div>
							<v-spacer/>
                            <v-btn class="ma-2 btnType1" flat outline color="primary darken-1" @click="getUserList">
                                <v-icon>search</v-icon>조회
                            </v-btn>
                            <v-spacer/>
                        </v-card-title>
                        <VuePerfectScrollbar class="app-sidebar-scroll">
                            <v-data-table
                                ref="userListTable"
                                :headers="userListTableHeaders"
                                :items="userList"
                                :search="search"
                                :pagination.sync="pagination"
                                hide-actions
                                group-by="code"
                                update:pagination
                                sortable="false"
                                style="max-height: 58vh;">
                                <template slot="items" slot-scope="props">
                                    <tr class="userListRow">
                                        <td class="text-xs-left userListRowItem" style="width: 10%;" v-html="props.item.custCode"></td>                                            
                                        <td class="text-xs-left userListRowItem" style="width: 20%;" v-html="props.item.custName"></td>                                           
                                        <td class="text-xs-left userListRowItem" style="width: 10%;" v-html="props.item.userId"></td>
                                        <td class="text-xs-left userListRowItem" style="width: 10%;" v-html="props.item.userNm"></td>
                                        <td class="text-xs-left userListRowItem" style="width: 10%;" v-html="props.item.originUserPw"></td>
                                        <td class="text-xs-left userListRowItem" style="width: 10%;" v-html="props.item.userMobileNo"></td>                                        
                                        <td class="text-xs-left userListRowItem" style="width: 13%;" v-html="props.item.creDate"></td>
                                        <td class="text-xs-left userListRowItem" style="width: 10%;">                                            
                                            <toggle-button                                                
                                                v-model="props.item.approYn"
                                                :color="approYnBtnColor"
                                                :sync="true"
                                                :labels="{checked:'승인', unchecked: '대기'}"
                                                :width="80"
                                                :height="35"
                                                :key="(pagination.page-1)*pagination.rowsPerPage + props.index"
                                                style="font-size: 16px; margin-bottom: 0;"
                                                @input="openApproYnDialog(props.item)"
                                            />
                                        </td>
                                        <td class="text-xs-left userListRowItem" style="position:relative; width: 7%;">
                                            <v-btn v-if="props.item.userId" :id="props.item.btnDetailMoveId"
                                                   class="btnDetailMove" outline color="indigo"
                                                   style="background-color: #ffffff !important; display: none;">
                                                <a @click="moveUpdatePage((pagination.page-1)*pagination.rowsPerPage + props.index)">상세보기</a>                                                    
                                            </v-btn>
                                            <v-icon v-if="props.item.userId" style="cursor: pointer;"
                                                    @click.stop="showUpdateBtn(props.item.keyindex)">more_vert
                                            </v-icon>
                                        </td>
                                    </tr>
                                </template>
                                <v-alert v-slot:no-results :value="true" color="error" icon="warning">Your search for "{{ search }}" found no results.</v-alert>
                            </v-data-table>
                        </VuePerfectScrollbar>
                        <div class="text-xs-center pt-2" style="margin-top: 10px;">
                            <v-pagination v-model="pagination.page" :length="pages" total-visible="10"></v-pagination>
                        </div>                        
                    </DemoCardNoTitle>
                </div>
            </div>            
        </b-card>
        <Dialog1 ref="dialog1" v-bind="dialog1Prop"></Dialog1>
        <Dialog2 ref="dialog2" v-bind="dialog2Prop"></Dialog2>
    </div>
</template>

<script>
    import {CustomerModel} from "../../model/Customer";
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    import BreadCrumb from '../../Layout/Components/BreadCrumbs.vue';
    import DemoCardNoTitle from '../../Layout/Components/DemoCardNoTitle';
    import Dialog1 from '../../Layout/Components/Dialog1';
    import Dialog2 from '../../Layout/Components/Dialog2';
    import {ToggleButton} from 'vue-js-toggle-button'
    import {library} from '@fortawesome/fontawesome-svg-core'
    import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons'

    library.add(faCheck, faTimes);

    export default {
        components: {
            BreadCrumb,
            DemoCardNoTitle,
            ToggleButton,
            Dialog1,
            Dialog2,
            VuePerfectScrollbar
        },
        data: () => ({
            btnXSrc: `${Config.baseURI}/fs/images/icons/photo_del.png`,
            userid: false,
            Config: null,
            approYnBtnColor: 'var(--success)',
            rules: {
                required: value => !!value || '필수 입력 항목 입니다.',
            },
            search: '',
            pagination: {},
            userListTableHeaders: [
                {text: '거래처코드', value: 'custCode', align: 'left', sortable: true},
                {text: '거래처명', value: 'custName', align: 'left', sortable: true},                
                {text: '아이디', value: 'userId', align: 'left', sortable: true},                
                {text: '성명', value: 'userNm', align: 'left', sortable: true},
                {text: '비밀번호', value: 'originUserPw', align: 'left', sortable: true},
                {text: '연락처', value: 'userMobileNo', align: 'left', sortable: true},                
                {text: '가입일시', value: 'creDate', align: 'left', sortable: true},
                {text: '승인여부', value: 'approYn', align: 'left', sortable: false},
                {text: '더보기', value: 1, align: 'left', sortable: false},
            ],
            
            userList: [],
            customerCode: '',            
            customerSearch: '',
            searchKeyword: '',            
            customerList: [],            
            dialog1Prop: {
                title: '',
                msg: '',
            },
            dialog2Prop: {
                title: '',
                msg: '',
            },            

            searchKind: {codeValue: '', codeName: '전체'},
            SEARCHKIND:[
                {codeValue: '', codeName: '전체'},
                {codeValue: 'Y', codeName: '승인'},
                {codeValue: 'N', codeName: '미승인'},                
            ],
        }),
        created(){},
        mounted() {
            this.Config = Config;           
            this.getUserList();
        },
        methods: {
            customerSearchUpdate(value) {
                if (!value) {
                    this.customerCode = '';
                }
            },
            openApproYnDialog(item) {
                const index = this.userList.indexOf(item);
                setTimeout(() => {
                    if (this.userList[index].approYn) {
                        this.userList[index].approYn = false;
                    } else {
                        this.userList[index].approYn = true;
                    }
                    this.dialog2Prop = {
                        title: '승인처리',
                        msg: '승인상태를 변경하시겠습니까?',
                        callback: this.userApproAction,
                        callbackParam: {index: index}
                    };
                    this.$refs.dialog2.confirm = true;
                }, 1);
            },
            userApproAction(param) {
                var index = param.index;

                const headers = {headers: {'Content-Type': 'application/json'}};
                var data = {
                    userId: this.userList[index].userId,
                    approYn: (!this.userList[index].approYn) ? 'Y' : 'N',                    
                };

                this.$http.put(`${Config.newAjaxUri}/tacar/v1.0/user/put/approYn`, JSON.stringify(data), headers)
                    .then((response) => {                        
                        if (response.status === 200) {
                            this.userList[index].approYn = !this.userList[index].approYn;
                            this.$refs.dialog2.confirm = false;
                        }
                    }).then(() => {
                });
            },           
            moveUpdatePage(index) {
                var userId = this.userList[index].userId;                
                this.movePage('Tacar/TacarUserDetail/' + userId);
            },
            getUserList() {
                var headers = {
                    'Accept': 'application/json'
                };
                
                var params = {                    
                    kind: this.searchKind.codeValue,
                    code: this.customerCode || '',
                    keyword: this.searchKeyword
                };

                this.$http.get(`${Config.newAjaxUri}/tacar/v1.0/user/list`, {params, headers})
                    .then((response) => {                        
                        this.userList = [];                        
                        for (var i = 0; i < response.data.response.length; i++) {
                            var userId = response.data.response[i].userId;
                            var userNm = response.data.response[i].userNm;
                            var originUserPw = response.data.response[i].originUserPw;
                            var userMobileNo = response.data.response[i].userMobileNo;
                            var custCode = response.data.response[i].custCode;
                            var custName = response.data.response[i].custName;                            
                            var approYn = response.data.response[i].approYn;
                            var creDate = response.data.response[i].creDate;

                            var obj = {
                                userId: userId,
                                userNm: userNm,
                                originUserPw: originUserPw,
                                userMobileNo : userMobileNo,
                                custCode: custCode,
                                custName: custName,                                
                                creDate: creDate,                                                           
                                approYn: (approYn == 'Y') ? true : false,                                
                                keyindex: i,                                
                                btnDetailMoveId: 'btnDetailMove' + i
                            };                         
                             this.userList.push(obj);
                        }
                        this.pagination.totalItems = this.userList.length;
                    });
            },
            getCustomerList() {
                $('#searchedCustomerList').empty().hide();
                $('#searchedCustomerList').parent().css({position: 'relative'});

                var headers = {
                    'Accept': 'application/json'
                };
                var params = {
                    keyword: this.customerSearch
                };
                this.$http.get(`${Config.newAjaxUri}/cust/v1.0/get`, {params, headers})
                    .then((response) => {
                        console.log(response);
                        if (!response.data.check) {
                            this.dialog2Prop = {
                                title: '검색한 매입처가 없습니다.',
                                msg: '매입처 등록을 진행하시겠습니까?',
                                callback: this.registerCustomer
                            };
                            this.$refs.dialog2.confirm = true;
                            return;
                        }
                        this.customerList = [];
                        if (response.status === 200) {
                            this.customerList = response.data.response.map(data => new CustomerModel(data));
                            this.makeSearchedCustomerList();
                        }
                    });
            },
            registerCustomer() {
                this.$refs.dialog2.confirm = false;
                this.movePage("Company/Customer/CustomerRegister");
            },
            makeSearchedCustomerList() {
                var listBox = $('#searchedCustomerList');
                if (this.customerList.length > 0) {
                    this.setSearchedCustomerEvent(true);
                }
                for (var i = 0; i < this.customerList.length; i++) {
                    var compname = this.customerList[i].compname;
                    var ceoname = this.customerList[i].ceoname;
                    var itemBox = $('<div>', {'class': 'searchItemBox'}).appendTo(listBox);
                    if (i > 0) {
                        itemBox.css({borderTop: '1px solid #bdd2e6'})
                    }
                    var itemName = $('<div>', {'class': 'searchItemName'}).html(compname + " (" + ceoname + ")").appendTo(itemBox);
                    this.setCustomerItemClick(itemBox, i);
                }
                listBox.show();
            },
            setCustomerItemClick(itemBox, index) {
                var _this = this;
                itemBox.on('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $('#searchedCustomerList').empty().hide();
                    _this.setSearchedCustomerEvent(false);
                    _this.setCustomerItemData(index);
                });
            },
            setCustomerItemData(index) {
                var compname = this.customerList[index].compname;
                this.customerSearch = compname;
                this.customerCode = this.customerList[index].code;
            },
            setSearchedCustomerEvent(bool) {
                if (bool) {
                    $(window).on('click', function () {
                        $('#searchedCustomerList').empty().hide();
                    });
                } else {
                    $(window).off('click');
                }
            },
            searchUpdate(value, key) {
                this[key] = value;
            },
            setListBtnEvent(bool) {
                if (bool) {
                    $(window).on('click', function () {
                        $('.btnDetailMove').hide();
                    });
                } else {
                    $(window).off('click');
                }
            },
            showUpdateBtn(keyindex) {
                if ($('#btnDetailMove' + keyindex).css('display') == 'none') {
                    $('.btnDetailMove').hide();
                    $('#btnDetailMove' + keyindex).css({'display': 'block'});
                    this.setListBtnEvent(true);
                } else {
                    $('#btnDetailMove' + keyindex).css({'display': 'none'});
                    this.setListBtnEvent(false);
                }
            },            
            movePage(pageName) {
                var routeUrl = this.$session.get('routeUrl');
                location.href = routeUrl + "#/" + pageName;
            }
        },
        computed: {
            pages() {
                if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) {
                    return 0
                }
                this.pagination.rowsPerPage = 20;
                return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
            }
        },
        watch: {
            orderList: {
                deep: true,
                handler() {
                }
            },
            userid() {
                if (!this.userid) {
                    console.log("유저세션없음");
                    this.movePage('Company/Login');
                }
            }
        }
    }
</script>
<style>
    .btnDetailMove{
        border-radius: 7px;
        position: absolute !important; left: -90px; top: 0;
        z-index: 30;
    }
    .userListRow{
        position: relative;
    }
    .userListRowItem{
        cursor: pointer; word-break: break-all !important; position: relative;
        padding: 0 5px !important;
    }
    table.v-table {
        margin:0 auto;
        width: 100%;
        max-width: 100%;
    }
    .v-datatable thead tr th{
        padding: 0 5px !important;
    }
    .btnType1{
        border-radius: 7px !important;
    }
    #searchedCustomerList {
        width: 100%;
        position: absolute;
        left: 0px;
        top: 50px;
        z-index: 20;
        border: 1px solid #bdd2e6;
        background-color: #ffffff;
        max-height: 300px;
        overflow-y: scroll;
    }
    .searchItemBox {
        padding: 8px;
        cursor: pointer;

    }
    .searchItemBox:hover{
        background-color: #ecf6ff
    }
    .theme--light.v-table tbody tr{
        border-bottom: 1px solid rgba(0,0,0,0.12);
    }
    .listsum{
        font-weight: 900;
    }
</style>