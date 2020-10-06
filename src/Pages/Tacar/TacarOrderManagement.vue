<template>
    <div>
        <b-card title="" class="main-card mb-4">
            <BreadCrumb></BreadCrumb>
            <div class="row">
                <div class="col-sm-12 col-md-12 col-xl-12">
                    <DemoCardNoTitle ref="tabBox">
                        <v-card-title style="border-bottom: 1px solid rgba(0,0,0,0.42);">
                            <v-menu
                                v-model="menu1"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="200px"
                                style="margin-right: 20px;">
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="startDate"
                                        label="문의일자"
                                        placeholder="시작일자"
                                        append-icon="event"
                                        hide-details
                                        readonly
                                        required
                                        v-on="on"/>
                                </template>
                                <v-date-picker
                                    v-model="startDate"
                                    @input="menu1 = false"
                                    @change='getOrderList'
                                    locale="ko"/>
                            </v-menu>
                            <div style="margin-right: 20px; margin-top: 20px;">~</div>
                            <v-menu
                                v-model="menu2"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="200px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="lastDate"
                                        placeholder="종료일자"
                                        append-icon="event"
                                        hide-details
                                        readonly
                                        required
                                        v-on="on"/>
                                </template>
                                <v-date-picker
                                    v-model="lastDate"
                                    @input="menu2 = false"
                                    class="flex-grow"
                                    @change='getOrderList'
                                    locale="ko"/>
                            </v-menu>
                            <v-spacer/>
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
                            <v-text-field
                                v-model="searchKeyword"
                                label="사용자성명 OR 차량번호"
                                placeholder="사용자성명 OR 차량번호"
                                hide-details
                                id="searchKeyword"
                                ref="searchKeyword"
                                style=""/>
                            <v-spacer/>                            
                            <v-select
                                v-model="searchYn"
                                :items="SEARCH_YN"
                                label="집계종류"
                                placeholder="선택하세요"
                                item-value='codeValue'
                                item-text='codeName'
                                @change="getOrderList"
                                required
                                return-object
                                style="width: 100px; height: 44px;"/>
                            <v-spacer/>
                            <v-btn class="ma-2 btnType1" flat outline color="primary darken-1" @click="getOrderList">
                                <v-icon>search</v-icon>조회
                            </v-btn>
                            <v-spacer/>
                        </v-card-title>
                        <VuePerfectScrollbar class="app-sidebar-scroll">
                            <v-data-table
                                ref="orderListTable"
                                :headers="orderListTableHeaders"
                                :items="orderList"
                                :search="search"
                                :pagination.sync="pagination"
                                hide-actions
                                group-by="code"
                                update:pagination
                                sortable="false"
                                style="max-height: 58vh;">
                                <template slot="items" slot-scope="props">
                                    <tr class="orderListRow">
                                        <td class="text-xs-left orderListRowItem" style="width: 15%;" v-html="props.item.orderCode"></td>                                            
                                        <td class="text-xs-left orderListRowItem" style="width: 10%;" v-html="props.item.orderYmd"></td>
                                        <td class="text-xs-left orderListRowItem" style="width: 10%;" v-html="props.item.custCode"></td>                                           
                                        <td class="text-xs-left orderListRowItem" style="width: 20%;" v-html="props.item.custName"></td>
                                        <td class="text-xs-left orderListRowItem" style="width: 10%;" v-html="props.item.userMobileNo"></td>                                        
                                        <td class="text-xs-left orderListRowItem" style="width: 7%;" v-html="props.item.totCnt"></td>                                        
                                        <td class="text-xs-left orderListRowItem" style="width: 13%;" v-html="props.item.creDate"></td>
                                        <td class="text-xs-left orderListRowItem" style="width: 8%;" v-html="props.item.stateCd"></td>
                                        <td class="text-xs-left orderListRowItem" style="position:relative; width: 7%;">
                                            <v-btn v-if="props.item.orderCode" :id="props.item.btnDetailMoveId"
                                                   class="btnDetailMove" outline color="indigo"
                                                   style="background-color: #ffffff !important; display: none;">
                                                <a @click="moveUpdatePage((pagination.page-1)*pagination.rowsPerPage + props.index)">상세보기</a>                                                    
                                            </v-btn>
                                            <v-icon v-if="props.item.orderCode" style="cursor: pointer;"
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
            rules: {
                required: value => !!value || '필수 입력 항목 입니다.',
            },
            search: '',
            pagination: {},
            orderListTableHeaders: [
                {text: '문의코드', value: 'orderCode', align: 'left', sortable: false},
                {text: '문의일자', value: 'orderYmd', align: 'left', sortable: false},                
                {text: '거래처코드', value: 'custCode', align: 'left', sortable: false},                
                {text: '거래처명', value: 'custName', align: 'left', sortable: false},
                {text: '연락처', value: 'userMobileNo', align: 'left', sortable: false},
                {text: '상품건수', value: 'totCnt', align: 'left', sortable: false},                                                
                {text: '등록일자', value: 'creDate', align: 'left', sortable: false},
                {text: '처리상태', value: 'stateCd', align: 'left', sortable: false},
                {text: '더보기', value: 1, align: 'left', sortable: false},
            ],
            
            orderList: [],
            customerCode: '',
            startDate: '',
            lastDate: new Date().format("yyyy-MM-dd"),
            menu1: false,
            menu2: false,
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
            searchYn: {codeValue: 'N', codeName: '미처리'},
            SEARCH_YN: [
                {codeValue: '', codeName: '전체'},
                {codeValue: 'Y', codeName: '처리완료'},
                {codeValue: 'N', codeName: '미처리'},                
            ],
        }),
        created(){},
        mounted() {
            this.Config = Config;
            var startDate = new Date();
            startDate.setDate(startDate.getDate() - 14);
            startDate = startDate.format("yyyy-MM-dd");
            this.userid = this.$session.get('id');
            this.startDate = startDate;
            var lastDate = new Date().format("yyyy-MM-dd");
            this.lastDate = lastDate;
            this.getOrderList();
        },
        methods: {
            customerSearchUpdate(value) {
                if (!value) {
                    this.customerCode = '';
                }
            },            
            moveUpdatePage(index) {
                var orderCode = this.orderList[index].orderCode;                
                this.movePage('Tacar/TacarOrderDetail/' + orderCode);
            },
            getOrderList() {
                var headers = {
                    'Accept': 'application/json'
                };

                var startDate = this.startDate.replaceAll('-', '');
                var lastDate = this.lastDate.replaceAll('-', '');
                var params = {
                    startdt: startDate,
                    lastdt: lastDate,
                    code: this.customerCode || '',
                    keyword: this.searchKeyword,
                    searchYn: this.searchYn.codeValue
                };

                this.$http.get(`${Config.newAjaxUri}/tacar/v1.0/order/list`, {params, headers})
                    .then((response) => {                        
                        this.orderList = [];                        
                        for (var i = 0; i < response.data.response.length; i++) {
                            var orderCode = response.data.response[i].orderCode;
                            var orderYmd = response.data.response[i].orderYmd;
                            var custCode = response.data.response[i].custCode;
                            var custName = response.data.response[i].custName;
                            var userMobileNo = response.data.response[i].userMobileNo;
                            var totCnt = response.data.response[i].totCnt;                            
                            var creDate = response.data.response[i].creDate;
                            var stateCd = response.data.response[i].stateCd;

                            var obj = {
                                orderCode: orderCode,
                                orderYmd: orderYmd.substring(0,4)+'-'+orderYmd.substring(4,6)+'-'+orderYmd.substring(6,8),
                                custCode: custCode,
                                custName : custName,
                                userMobileNo: userMobileNo,
                                totCnt: totCnt + '건',                                
                                creDate: creDate,            
                                stateCd: (stateCd == 'N') ? '<span style="color:red; font-weight:bold;">미처리</span>' : '처리완료',
                                keyindex: i,                                
                                btnDetailMoveId: 'btnDetailMove' + i
                            };                         
                             this.orderList.push(obj);
                        }
                        this.pagination.totalItems = this.orderList.length;
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
    .orderListRow{
        position: relative;
    }
    .orderListRowItem{
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