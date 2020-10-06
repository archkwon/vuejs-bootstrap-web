<template>
<div>
	<b-card title="" class="main-card mb-4">		
		<BreadCrumb></BreadCrumb>
		<DemoCardNoTitle ref="tabBox">
			<div class="orderInfoWrap">
				<div class="orderInfoInnerWrap">                    
					<div class="orderInfoTitle">고객문의 기본정보</div>					
                    <div class="orderInfoTableWrap">
						<table class="orderInfoTable">
							<colgroup>
								<col width="10%" />
								<col width="23%" />
								<col width="10%" />
								<col width="23%" />
								<col width="10%" />
								<col width="24%" />                                
							</colgroup>
							<tbody>								                                
                                <tr>
									<td>문의코드</td>
									<td>
                                        <v-text-field 
                                            :value="orderCode" 
                                            maxlength="20"
                                            readonly                                            
                                        ></v-text-field>                                        
									</td>      
									<td>거래처코드</td>
                                    <td>                                       
                                        <v-text-field 
                                            :value="custCode" 
                                            maxlength="20"                                            
                                            readonly                                            
                                        ></v-text-field>                                        
									</td>      
                                    <td>거래처명</td>
									<td>
                                        <div style="padding-right: 10%;">     
                                            <v-text-field 
                                                :value="custName" 
                                                maxlength="20"    
                                                readonly                                                                                            
                                            ></v-text-field>
                                        </div>    
									</td>                                    
								</tr>
                                <tr>
                                    <td>문의일자</td>    								
									<td>
										<v-text-field 
											:value="orderYmd" 
											maxlength="6"
                                            readonly											
										></v-text-field>
									</td>
                                    <td>차량번호</td>    								
									<td>
										<v-text-field 
											:value="carNo" 
											maxlength="100"	
                                            readonly										
										></v-text-field>
									</td>
									<td>연락처</td>    								
									<td>	
										<div  style="padding-right: 10%;">
											<v-text-field 
                                                :value="userMobileNo" 
                                                maxlength="100"		
                                                readonly									
                                            ></v-text-field>						
										</div>	
									</td>                                    
								</tr>     
                                <tr>
                                    <td>등록일자</td>    								
									<td>
										<v-text-field 
											:value="creDate" 
											maxlength="6"
                                            readonly											
										></v-text-field>
									</td>
                                    <td>처리자아이디</td>    								
									<td>
										<v-text-field 
											:value="uptId" 
											maxlength="100"	
                                            readonly										
										></v-text-field>
									</td>
									<td>진행상태</td>    								
									<td>	
										<div style="padding-right: 10%;">
											<v-select 
												v-model="stateCd"
												:items="STATE_CD_YN"
												item-value="codeValue"
												item-text="codeName"
												return-object
                                                readonly
											></v-select>										
										</div>	
									</td>                                    
								</tr>     
                                <tr>
                                    <td>문의내용</td>    								
									<td colspan="5">
                                        <div  style="padding-right: 3%;">
                                            <v-textarea
                                                :value="orderText"
                                                maxlength="1000"
                                                class="noteForm"
                                                height="150px"
                                                single-line
                                                outline
                                                no-resize
                                            ></v-textarea>
                                        </div>    
									</td>                                    
								</tr>								                                 
							</tbody>
						</table>
					</div>  
                </div>
			</div>            
            <div class="carInfoMemoWrap">
                <div class="carInfoMemoInnerWrap" style="">
                    <div class="carInfoMemoTitleBox">
                        <div class="fLeft carInfoMemoTitleIcon">□</div>
                        <div class="fLeft carInfoMemoTitleText">문의상품내역</div>
                        <div class="clear"></div>
                    </div>
                    <div>
                        <VuePerfectScrollbar class="app-sidebar-scroll">
                            <v-data-table 
                                class="carOrderListTable"
                                ref="carOrderListTable"
                                :headers="carOrderHeaders"
                                :items="carOrderList"
                                hide-actions
                            > 
                                <template v-slot:items="props">
                                    <tr class="memoListRow">
                                        <td class="text-xs-left carOrderListRowItem" style="width: 7%;">{{ props.item.orderSeq }}</td>                                                                                
                                        <td class="text-xs-left carOrderListRowItem" style="width: 31%;">{{ props.item.partInfo }}</td>
                                        <td class="text-xs-left carOrderListRowItem" style="width: 31%;">{{ props.item.partQty }}</td>
                                        <td class="text-xs-left carOrderListRowItem" style="width: 31%;">{{ props.item.partTypeName }}</td>
                                    </tr>
                                </template>	
                            </v-data-table>
                        </VuePerfectScrollbar>
                    </div>
                </div>
            </div>
            <div class="carInfoObtainWrap">  
                <div class="carInfoObtainInnerWrap" style=""> 
                    <div class="carInfoObtainTitleBox">
                        <div class="fLeft carInfoObtainTitleIcon">□</div>
						<div class="fLeft carInfoObtainTitleText">상품검색</div>
						<div class="clear"></div>
					</div>
                    <div class="carInfoObtainTableWrap">
						<VuePerfectScrollbar class="app-sidebar-scroll">
							<v-data-table
								class="obtainTable"
								ref="obtainTable"
								:headers="obtainHeaders"
								:items="obtainList"
								hide-actions
							>
								<template v-slot:items="props">
									<tr class="obtainTableRow">
										<td class="text-xs-left obtainTableRowItem" style="width: 5%;">{{ props.item.code }}</td>
										<td class="text-xs-left obtainTableRowItem" style="width: 5%;">{{ props.item.code2 }}</td>
										<td class="text-xs-left obtainTableRowItem" style="width: 15%;">
											<v-text-field
												:value="props.item.name"
												maxlength="40"
												v-on:keyup.enter="showPartSearchList(props.item)"
												v-on:change="event => obtainListModelUpdate(event, props.item, 'name')"
											></v-text-field>
										</td>
										<td class="text-xs-left obtainTableRowItem" style="width: 13%;">
											<v-text-field
												:value="props.item.norm"
												maxlength="40"
												v-on:change="event => obtainListModelUpdate(event, props.item, 'norm')"
											></v-text-field>
										</td>
										<td class="text-xs-left obtainTableRowItem" style="width: 5%;">
											<v-text-field
												:class="{'colorMinus': props.item.qty < 0, 'inputOnlyNumber': true}"
												:value="props.item.qty"
												maxlength="40"
												type="number"
												v-on:change="event => obtainListModelUpdate(event, props.item, 'qty')"
											></v-text-field>
										</td>
										<td class="text-xs-left obtainTableRowItem" style="width: 7%;">
											<v-text-field
												:class="{'colorMinus': props.item.price < 0, 'inputOnlyNumber': true}"
												:value="props.item.price"
												maxlength="40"
												class="inputOnlyNumber"
												type="number"
												v-on:change="event => obtainListModelUpdate(event, props.item, 'price')"
											></v-text-field>
										</td>
										<td class="text-xs-left obtainTableRowItem" style="width: 7%;">
											<v-text-field
												:class="{'colorMinus': props.item.amount < 0, 'inputOnlyNumber': true}"
												:value="props.item.amount"
												maxlength="40"
												class="inputOnlyNumber"
												type="number"
												v-on:change="event => obtainListModelUpdate(event, props.item, 'amount')"
											></v-text-field>
										</td>
										<td class="text-xs-left obtainTableRowItem" style="width: 7%;">
											<v-text-field
												:class="{'colorMinus': props.item.vat < 0, 'inputOnlyNumber': true}"
												:value="props.item.vat"
												maxlength="40"
												class="inputOnlyNumber"
												type="number"
												v-on:change="event => obtainListModelUpdate(event, props.item, 'vat')"
											></v-text-field>
										</td>
										<td class="text-xs-left obtainTableRowItem" style="width: 7%;">
											<v-text-field
												:class="{'colorMinus': props.item.sumamount < 0, 'inputOnlyNumber': true}"
												:value="props.item.sumamount"
												maxlength="40"
												class="inputOnlyNumber"
												type="number"
												v-on:change="event => obtainListModelUpdate(event, props.item, 'sumamount')"
											></v-text-field>
										</td>
										<td class="text-xs-left obtainTableRowItem" style="width: 8%;">
											<v-select												
												:value="props.item.partType"
												:items="PART_TYPE_CD"												
												placeholder="선택하세요" 
												item-value='codeValue'
												item-text='codeName' 						
												return-object
												v-on:change="event => obtainListModelUpdate(event, props.item, 'partType')"
											></v-select>											
										</td>
										<td class="text-xs-left obtainTableRowItem" style="width: 13%;">
											<v-text-field
												:value="props.item.p"
												maxlength="40"
												placeholder="비고를 입력하세요"
												v-on:change="event => obtainListModelUpdate(event, props.item, 'p')"
											></v-text-field>
										</td>
										<td class="text-xs-left obtainTableRowItem" style="width: 4%;">
											<v-btn v-if="props.item.specialprice" outline color="green darken-1" flat="flat" class="btnType1" @click="openSpecialPriceDialog(props.item)">{{ props.item.specialprice }}</v-btn>
										</td>
										<td class="text-xs-left obtainTableRowItem" style="width: 4%;">
											<v-icon :disabled="deleteBtnBoolean" @click="obtainDelete(props.item)">delete</v-icon>
										</td>
									</tr>
								</template>
							</v-data-table>
							<v-data-table
								class="obtainTotalTable"
								ref="obtainTotalTable"
								:items="obtainTotalList"
								hide-actions
								hide-headers
							>
								<template v-slot:items="props">
									<tr class="obtainTotalTableRow">
										<td class="text-xs-left obtainTotalTableRowItem" style="width: 5%;">합계</td>
										<td class="text-xs-left obtainTotalTableRowItem" style="width: 5%;">&nbsp;</td>
										<td class="text-xs-left obtainTotalTableRowItem" style="width: 15%;">&nbsp;</td>
										<td class="text-xs-left obtainTotalTableRowItem" style="width: 13%;">&nbsp;</td>
										<td class="text-xs-left obtainTotalTableRowItem" style="width: 5%;">
											<v-text-field
												:class="{'colorMinus': props.item.totalQty < 0, 'inputOnlyNumber': true}"
												v-model="props.item.totalQty"
												maxlength="40"
												readonly
											></v-text-field>
										</td>
										<td class="text-xs-left obtainTotalTableRowItem" style="width: 7%;">
											<v-text-field
												:class="{'colorMinus': props.item.totalPrice < 0, 'inputOnlyNumber': true}"
												v-model="props.item.totalPrice"
												maxlength="40"
												readonly
											></v-text-field>
										</td>
										<td class="text-xs-left obtainTotalTableRowItem" style="width: 7%;">
											<v-text-field
												:class="{'colorMinus': props.item.totalAmount < 0, 'inputOnlyNumber': true}"
												v-model="props.item.totalAmount"
												maxlength="40"
												readonly
											></v-text-field>
										</td>
										<td class="text-xs-left obtainTotalTableRowItem" style="width: 7%;">
											<v-text-field
												:class="{'colorMinus': props.item.totalVat < 0, 'inputOnlyNumber': true}"
												v-model="props.item.totalVat"
												maxlength="40"
												readonly
											></v-text-field>
										</td>
										<td class="text-xs-left obtainTotalTableRowItem" style="width: 7%;">
											<v-text-field
												:class="{'colorMinus': props.item.totalSumamount < 0, 'inputOnlyNumber': true}"
												v-model="props.item.totalSumamount"
												maxlength="40"
												readonly
											></v-text-field>
										</td>
										<td class="text-xs-left obtainTotalTableRowItem" style="width: 8%;">&nbsp;</td>
										<td class="text-xs-left obtainTotalTableRowItem" style="width: 13%;">&nbsp;</td>
										<td class="text-xs-left obtainTotalTableRowItem" style="width: 4%;">&nbsp;</td>
										<td class="text-xs-left obtainTotalTableRowItem" style="width: 4%;">&nbsp;</td>
									</tr>
								</template>
							</v-data-table>
						</VuePerfectScrollbar>

                        <div class="carInfoObtainTableBtnWrap">
							<v-btn :disabled="deleteBtnBoolean" class="ma-2 btnType1" flat outline color="primary darken-1" @click="addObtainListRow">
								<v-icon :disabled="deleteBtnBoolean" style="font-size: 17px">add</v-icon>부품추가
							</v-btn>
						</div>
                    </div>
				</div>
			</div>

			<div class="orderInfoWrap">
				<div class="orderInfoInnerWrap">                    
					<div class="orderInfoTitle"><span class="important">* </span> 고객문의 답변처리 <span class="important2">{{titleAnswerTxt}}</span></div>					
                    <div class="orderInfoTableWrap">
						<table class="orderInfoTable">
							<colgroup>
								<col width="7%" />
								<col width="12%" />
								<col width="7%" />
								<col width="12%" />
								<col width="7%" />
								<col width="12%" />
								<col width="7%" />
								<col width="12%" />
								<col width="8%" />
								<col width="16%" />
							</colgroup>
							<tbody>	
                                <tr>
                                    <td><span class="important">*</span> 차대번호</td>    								
									<td>
										<v-text-field 
											v-model="ansVin" 
											:value="ansVin" 
											maxlength="20"
                                            placeholder="차대번호를 입력하세요" 											
											required
										></v-text-field>
									</td>
                                    <td><span class="important">*</span> 차량번호</td>    								
									<td>
										<v-text-field 
											v-model="ansCarNo" 
											:value="ansCarNo" 
											maxlength="20"												
											required
                                            placeholder="차량번호를 입력하세요" 											
										></v-text-field>
									</td>
									<td><span class="important">*</span> 차량명</td>    								
									<td>	
										<div  style="padding-right: 10%;">
											<v-text-field 
												v-model="ansCarName" 
                                                :value="ansCarName" 
                                                maxlength="20"		                                                
												required				
												placeholder="차량명을 입력하세요" 												
                                            ></v-text-field>						
										</div>	
									</td>   
									<td>차량년식</td>    								
									<td>	
										<div style="padding-right: 10%;">
											<v-text-field 
												v-model="ansCarYear" 
                                                :value="ansCarYear" 
                                                maxlength="10"		                                                
												required						
												placeholder="차량년식을 입력하세요" 												
                                            ></v-text-field>
										</div>	
									</td>  
									<td><span class="important">*</span> 배송예정일자</td>    								
									<td>	
										<div style="padding-right: 18%; margin-top:-20px;">
											<v-menu
												v-model="menu1"
												:close-on-content-click="false"
												:nudge-right="40"
												transition="scale-transition"
												offset-y
												min-width="290px">
												<template v-slot:activator="{ on }">
													<v-text-field
														v-model="resvYmd"
														placeholder="배송예정일자"
														append-icon="event"
														hide-details
														readonly
														required
														v-on="on"/>
												</template>
												<v-date-picker
													v-model="resvYmd"
													@input="menu1 = false"
													class="flex-grow"													
													locale="ko"/>
											</v-menu>
										</div>	
									</td>                                        
								</tr>
                                <tr>
                                    <td><span class="important">*</span> 답변내용</td>    								
									<td colspan="9">
                                        <div  style="padding-right: 3%;">
                                            <v-textarea
                                                :value="ansOrderAnswerText"
												v-model="ansOrderAnswerText" 
                                                maxlength="1000"
                                                class="noteForm"
                                                height="150px"												
												required
                                                single-line
                                                outline
                                                no-resize
                                            ></v-textarea>
                                        </div>    
									</td>                                    
								</tr>								                                 
							</tbody>
						</table>						
					</div>  					
                </div>				
			</div> 
			<br/>
			<div class="carInfoObtainBtnWrap">
                        <v-btn outline color="green darken-1" flat="flat" class="btnType1" @click="gotoOrderList">목록</v-btn>                            
                        <v-btn :disabled="deleteBtnBoolean" outline color="green darken-1" flat="flat" class="btnType1" @click="saveOrderConfirm">처리완료</v-btn>                           
                    </div>
		</DemoCardNoTitle>
	</b-card>
    <v-dialog v-model="partSearchList">
		<div style="background-color: #fff; height: 80vh;">
			
			<div class="partSearchListHeaderWrap">
				<v-btn icon absolute right style="right: 0px; top: 7px;" @click="partSearchList=false">
					<v-icon>close</v-icon>
				</v-btn>
				<div class="fLeft">
					<v-checkbox 
						style="margin-top: 9px;"
						v-model="partDialogSearchAll"
						label="전체검색"
						color="indigo"
						hide-details
					></v-checkbox>
				</div>
				<div class="fLeft" style="margin-left: 20px;">
					<v-text-field
						style="margin-top: 3px;"
						:value="partDialogSearch"
						append-icon="search"
						placeholder="부품명/코드"
						single-line
						hide-details 
						id="partDialogSearch"
						ref="partDialogSearch" 
						class="partDialogSearch" 
						v-on:keyup.enter="searchPartListAction" 
						@click:append="searchPartListAction" 
						v-on:change="event => modelUpdate(event, 'partDialogSearch')"
					></v-text-field>
				</div>
				<div class="fLeft" style="margin-left: 20px;">
					<v-btn outline color="green darken-1" flat="flat" class="btnType1" @click="checkSpecialPrice">상품선택</v-btn>
				</div>		
				<div class="clear"></div>
			</div>
			<div class="partSearchListTableWrap">
				<VuePerfectScrollbar class="app-sidebar-scroll">
					
					<v-data-table 
						class="partDialogTable"
						ref="partDialogTable"
						:headers="partDialogHeaders"
						:items="partDialogList"
						hide-actions
					> 
						<template v-slot:items="props">
							<tr class="partDialogListRow">
								<td class="text-xs-left partDialogListRowItem" style="width: 5%;">
									<v-checkbox 
										style="margin-top: 1px;"
										v-model="props.item.select"
										color="indigo"
										hide-details
									></v-checkbox>
								</td>
								<td class="text-xs-left partDialogListRowItem"  style="width: 5%;">{{ props.item.code2 }}</td>
								<td class="text-xs-left partDialogListRowItem"  style="width: 20%;">{{ props.item.name }}</td>
								<td class="text-xs-left partDialogListRowItem"  style="width: 5%;">{{ props.item.c }}</td>
								<td class="text-xs-left partDialogListRowItem"  style="width: 20%;">{{ props.item.norm }}</td>
								<td class="text-xs-left partDialogListRowItem"  style="width: 5%; font-weight: 900;">{{ props.item.stockqty }}</td>
								<td class="text-xs-left partDialogListRowItem"  style="width: 5%; color:#ccccee;">{{ props.item.buyprice }}</td>
								<td class="text-xs-left partDialogListRowItem"  style="width: 5%;">{{ props.item.specialprice }}</td>
								<td class="text-xs-left partDialogListRowItem"  style="width: 5%; font-weight: 900;">{{ props.item.saleprice }}</td>
								<td class="text-xs-left partDialogListRowItem"  style="width: 10%;">{{ props.item.p }}</td>
								<td class="text-xs-left partDialogListRowItem"  style="width: 5%;">{{ props.item.ptnokr }}</td>								
							</tr>
						</template>	
					</v-data-table>					
				</VuePerfectScrollbar>
			</div>
		</div>
	</v-dialog>
	<Dialog1 ref="dialog1" v-bind="dialogProp"></Dialog1>
	<Dialog2 ref="dialog2" v-bind="dialogProp"></Dialog2>
</div>
</template>
<script>

import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import DemoCardNoTitle from '../../Layout/Components/DemoCardNoTitle';
import BreadCrumb from '../../Layout/Components/BreadCrumbs.vue';
import Dialog1 from '../../Layout/Components/Dialog1';
import Dialog2 from '../../Layout/Components/Dialog2';
export default {
	components: {
		VuePerfectScrollbar,
		DemoCardNoTitle,
		BreadCrumb,
		Dialog1,
		Dialog2,
	},
	data: () => ({
		userid: false,
		dialogProp: {
			title: '업데이트 완료',
			msg: '업데이트가 성공적으로 완료되었습니다.',
		},
		
		menu1: false,
		resvYmd: new Date().format("yyyy-MM-dd"),
		
		orderCode: '',
        custCode: '',
        custName: '',
        orderYmd: '',
		carNo: '',
		userId: '',
        userMobileNo: '',
        orderText: '',	
        creDate: '',
        uptId: '',
		stateCd: '',		
        STATE_CD_YN: [
			{codeValue: 'N', codeName: '미처리'},
			{codeValue: 'Y', codeName: '처리완료'}
		],			
		PART_TYPE_CD: [
			{codeValue: 'A', codeName: '정품'},
			{codeValue: 'B', codeName: '일반'},
			{codeValue: 'C', codeName: '재생'}
		],		    
                                   
        carOrderHeaders: [
            {text: '순번', value: 'orderSeq', align: 'left', sortable: false},            
			{text: '상품정보', value: 'partInfo', align: 'left', sortable: false},
			{text: '상품수량', value: 'partQty', align: 'left', sortable: false},
            {text: '상품타입', value: 'partTypeName', align: 'left', sortable: false}
		],
        carOrderList: [],

        obtainHeaders: [
			{text: '상품코드', value: 'code', align: 'left', sortable: false},
			{text: '관리코드', value: 'code2', align: 'left', sortable: false},
			{text: '상품명', value: 'name', align: 'left', sortable: false},
			{text: '규격', value: 'norm', align: 'left', sortable: false},
			{text: '수량', value: 'qty', align: 'left', sortable: false},
			{text: '단가', value: 'price', align: 'left', sortable: false},
			{text: '공급가', value: 'amount', align: 'left', sortable: false},
			{text: '부가세', value: 'vat', align: 'left', sortable: false},
			{text: '금액', value: 'sumamount', align: 'left', sortable: false},
			{text: '상품타입', value: 'partType', align: 'left', sortable: false},
			{text: '비고', value: 'p', align: 'left', sortable: false},
			{text: '특별단가', value: 1, align: 'left', sortable: false},
			{text: '', value: 1, align: 'left', sortable: false}
		],
		obtainList: [],
		obtainTotalList: [{totalPrice:0, totalQty:0, totalAmount:0, totalSumamount: 0, totalVat: 0}],

        partDialogHeaders: [
			{text: '선택', value: 1, align: 'left', sortable: false},
			{text: '관리코드', value: 'code2', align: 'left', sortable: true},
			{text: '상품명', value: 'name', align: 'left', sortable: true},
			{text: '차종', value: 'c' , align: 'left', sortable: false},
			{text: '규격', value: 'norm', align: 'left', sortable: false},
			{text: '재고', value: 'stockqty' , align: 'left', sortable: false},
			{text: '매입가(원)', value: 'buyprice', align: 'left', sortable: false},
			{text: '특별단가', value: 'specialprice' , align: 'left', sortable: false},
			{text: '매출가(원)', value: 'saleprice' , align: 'left', sortable: false},
			{text: '공식부품코드', value: 'ptnokr', align: 'left', sortable: true},
			{text: '비고', value: 'p' , align: 'left', sortable: false}
        ],
        
      	partDialogList: [],
        partSearchList: false,
        partDialogSearch: '',
        partDialogSearchAll: false,
        selectedPart: '',
        tempArr:[],
		obatinRowKey: -1,
		ansVin: '',
		ansCarNo: '',
		ansCarName: '',
		ansCarYear: '',		
		ansOrderAnswerText: '',	

		deleteBtnBoolean : false,				
		titleAnswerTxt : '',
		
		rules:{
			required: value => !!value || '필수 입력 항목 입니다.',
		}
	}),
	mounted(){
		this.userid			= this.$session.get('id');		
        this.orderCode		= this.$route.params.orderCode || false;        
        this.getTacarOrderMaster();     
        this.tempArr = [];
		this.checkObtainList();

		var resvYmd = new Date();
        resvYmd.setDate(resvYmd.getDate());
        resvYmd = resvYmd.format("yyyy-MM-dd");
        this.resvYmd = resvYmd;
	},
	methods:{
        saveOrderConfirm(){

			for(var i=0;i<this.obtainList.length;i++){
				
				if(this.obtainList[i].code == "" || this.obtainList[i].code == null){			
					this.dialogProp = {
						title: '필수입력',
						msg: '최소 1개의 상품정보를 입력해야 합니다.',
						callback: false,
					};
					this.$refs.dialog1.confirm = false;
					this.$refs.dialog1.confirm = true;
					return;
				}

				if(this.obtainList[i].partType == "" || this.obtainList[i].partType == null){			
					this.dialogProp = {
						title: '필수입력',
						msg: '['+(i+1)+']' + '행 상품타입은 필수입력 입니다.',
						callback: false,
					};
					this.$refs.dialog1.confirm = false;
					this.$refs.dialog1.confirm = true;
					return;
				}
			}

			if(this.ansVin == "" || this.ansVin == null){			
				this.dialogProp = {
					title: '필수입력',
					msg: '차대번호는 필수입력 입니다.',
					callback: false,
				};
				this.$refs.dialog1.confirm = false;
				this.$refs.dialog1.confirm = true;
				return;
			}
			if(this.ansCarNo == "" || this.ansCarNo == null){			
				this.dialogProp = {
					title: '필수입력',
					msg: '차량번호는 필수입력 입니다.',
					callback: false,
				};
				this.$refs.dialog1.confirm = false;
				this.$refs.dialog1.confirm = true;
				return;
			}
			if(this.ansCarName == "" || this.ansCarName == null){			
				this.dialogProp = {
					title: '필수입력',
					msg: '차량명은 필수입력 입니다.',
					callback: false,
				};
				this.$refs.dialog1.confirm = false;
				this.$refs.dialog1.confirm = true;
				return;
			}			
			if(this.resvYmd == "" || this.resvYmd == null){			
				this.dialogProp = {
					title: '필수입력',
					msg: '배송일자는 필수입력 입니다.',
					callback: false,
				};
				this.$refs.dialog1.confirm = false;
				this.$refs.dialog1.confirm = true;
				return;
			}
			if(this.ansOrderAnswerText == "" || this.ansOrderAnswerText == null){			
				this.dialogProp = {
					title: '필수입력',
					msg: '답변내용은 필수입력 입니다.',
					callback: false,
				};
				this.$refs.dialog1.confirm = false;
				this.$refs.dialog1.confirm = true;
				return;
			}			

			this.dialogProp = {
				title	: '처리완료',
				msg		: '처리완료 하시겠습니까?',
				callback: this.saveOrderAction
			};
			this.$refs.dialog2.confirm = true;
        },
        saveOrderAction(){
			this.$refs.dialog2.confirm = false;

			var data = [];
			for(var i=0;i<this.obtainList.length;i++){
				if(!this.obtainList[i].name){
					continue;
				}				
				
				var obj = {
					orderCode: this.orderCode,
					custCode: this.custCode,
					ansVin: this.ansVin,
					ansCarNo: this.ansCarNo,
					ansCarName: this.ansCarName,
					ansCarYear: this.ansCarYear,
					ansOrderAnswerText: this.ansOrderAnswerText,
					resvYmd: this.resvYmd.replaceAll('-',''),
					partSeq: i+1,
					partCode: this.obtainList[i].code,
					partName: this.obtainList[i].name,
					partMngCode: this.obtainList[i].code2,					
					partStd: this.obtainList[i].norm,	
					partType: this.obtainList[i].partType.codeValue,				
					partBigo:this.obtainList[i].p,					
					qty: parseInt(this.obtainList[i].qty) || 0,
					price: parseInt(this.obtainList[i].price) || 0,
					vat: parseInt(this.obtainList[i].vat) || 0,
					amount: parseInt(this.obtainList[i].amount) || 0,
					sumamount: parseInt(this.obtainList[i].sumamount) || 0,
					specialprice: parseInt(this.obtainList[i].specialprice),
					specialpriceyn: this.specialpriceyn,					
					userid: this.userid || 'admin',		
					userId: this.userId || ''			
				};
				
				data.push(obj);				
			}
			
			const headers = {headers: {'Content-Type': 'application/json'}};
			this.$http.put(`${Config.newAjaxUri}/tacar/v1.0/order/put`, JSON.stringify(data), headers)
				.then((response) => {				
						
					if(response.status == 200 && response.data.check == true){						
						this.dialogProp = {
							title: '답변처리 완료',
							msg: '답변처리가 정상적으로 완료되었습니다.',
							callback: this.setRefresh
						};                    							
						this.$refs.dialog1.confirm = true;                    
					}else if(response.status == 200 && response.data.check == false){						
						this.dialogProp = {
							title: '답변처리 실패',
							msg: '이미 답변처리가 완료되었습니다.',
							callback: false,
						};
						this.$refs.dialog1.confirm = false;
						this.$refs.dialog1.confirm = true;
					}else{
						this.dialogProp = {
							title: '오류발생 실패',
							msg: '오류가 발생하였습니다.',
							callback: false,
						};
						this.$refs.dialog1.confirm = false;
						this.$refs.dialog1.confirm = true;
					}
				});
							
		},
		setRefresh(){
			this.$refs.dialog1.confirm = false;					
			this.$router.go(0);
		},
		getTacarOrderMaster(){
			var params = new URLSearchParams();			            
            
            this.$http.get(`${Config.newAjaxUri}/tacar/v1.0/order/get/${this.orderCode}`, params)
			.then((response) => {			
			 	
				if(response.status == 200 && response.data.response){
                    this.orderCode    = response.data.response[0].orderCode;
                    this.custCode     = response.data.response[0].custCode;
                    this.custName     = response.data.response[0].custName;
                    var tempOrderYmd  = response.data.response[0].orderYmd
                    this.orderYmd     = tempOrderYmd.substring(0,4)+'-'+tempOrderYmd.substring(4,6)+'-'+tempOrderYmd.substring(6,8)
                    this.carNo        = response.data.response[0].carNo;
					this.userMobileNo = response.data.response[0].userMobileNo;
					this.userId 	  = response.data.response[0].userId;
                    this.orderText    = response.data.response[0].orderText;
                    this.stateCd      = response.data.response[0].stateCd;
                    this.creDate      = response.data.response[0].creDate;
                    this.uptId        = response.data.response[0].uptId;

                    this.getTacarOrderDetail();
				}    				
				
				if(this.stateCd == 'Y'){
					this.deleteBtnBoolean = true;
					this.titleAnswerTxt = "완료";
				}else{
					this.deleteBtnBoolean = false;
					this.titleAnswerTxt = "";
				}				                            
			});
        },		
        getTacarOrderDetail(){			
			var headers = {
                'Accept': 'application/json'
            };
			var params = {
                orderCode: this.orderCode,
                custCode: this.custCode
            };
            
            this.$http.get(`${Config.newAjaxUri}/tacar/v1.0/car/order`, {params, headers})
            
			.then((response) => {

				if(response.status == 200 && response.data.response){
					this.carOrderList = [];
					for(var i=0; i<response.data.response.length; i++){						
						
						var orderSeq  = response.data.response[i].orderSeq;                        
                        var partInfo  = response.data.response[i].partInfo;                        
                        var partQty   = response.data.response[i].partQty;
						var partType  = response.data.response[i].partType;                        
                        var partTypeName;
                        
                        if(partType == 'A'){
                            partTypeName = '정품'
                        }else if(partType == 'B'){
                            partTypeName = '일반'
                        }else{
                            partTypeName = '재생' 
                        }

                        this.carOrderList.push(
							{
								orderSeq	 : orderSeq,                                                                
								partInfo     : partInfo,
								partQty      : partQty,
								partTypeName : partTypeName
							}
						);
					}
					this.getTacarOrderPart();					
				}
			});
		},
		getTacarOrderPart(){
			this.obtainList = [];
			var headers = {
				'Accept': 'application/json'
			};
			
			var params = {
				orderCode: this.orderCode,
			};
			
			this.$http.get(`${Config.newAjaxUri}/tacar/v1.0/order/part`, {params, headers})
			.then((response) => {
				
				

				for(var i=0;i<response.data.response.length;i++){
					
					var price = response.data.response[i].price || 0;
					var specialprice = response.data.response[i].specialprice;

					var obj = {
						code			: response.data.response[i].partCode,
						code2			: response.data.response[i].partMngCode,
						name			: response.data.response[i].partName,
						norm			: response.data.response[i].partStd,
						seq				: response.data.response[i].partSeq,
						partType		: response.data.response[i].partType,
						price			: price,
						specialprice	: specialprice,
						qty				: response.data.response[i].qty,
						amount			: response.data.response[i].amount,
						sumamount		: response.data.response[i].sumamount,
						vat				: response.data.response[i].vat,
						p				: response.data.response[i].partBigo,
						specialpriceyn	: 'N'
					};
					
					this.obtainList.push(obj);
				}
				this.tempArr = [];
				this.checkObtainList();
				this.calculatorObtainList();
				this.getTacarOrderAnswer();
			});
        },
		getTacarOrderAnswer(){
			var headers = {
                'Accept': 'application/json'
            };
			var params = {
                orderCode: this.orderCode                
            };
            
            this.$http.get(`${Config.newAjaxUri}/tacar/v1.0/order/answer`, {params, headers})
			.then((response) => {			
			 	
				if(response.status == 200 && response.data.response){
					this.ansVin = response.data.response[0].vin;
					this.ansCarNo = response.data.response[0].carNo;
					this.ansCarName = response.data.response[0].carName;					
					this.ansCarYear = response.data.response[0].carYear;
					this.ansOrderAnswerText = response.data.response[0].orderAnswerText;		
					var tempResvYmd = response.data.response[0].resvYmd;			
					if(tempResvYmd != null && tempResvYmd != ''){
						this.resvYmd = tempResvYmd.substring(0,4)+'-'+tempResvYmd.substring(4,6)+'-'+tempResvYmd.substring(6,8);					
					}
                }                                
			});
		},        
        checkObtainList(){
			var key = -1;
			
			for(var i=0;i<this.obtainList.length;i++){
				if(!this.obtainList[i].name){
					key = i;
					break;
				}
			}
			if(key > -1){
				this.tempArr.push(this.obtainList[key]);

				this.obtainList.splice(key, 1);
				this.checkObtainList();
			}
			else{
				for(var i=0;i<this.tempArr.length;i++){
					this.obtainList.push(this.tempArr[i]);
				}
				if(this.obtainList.length < 1){
					this.addObtainListRow();
				}				
			}
        },
        
        addObtainListRow(){
			var obj = {
				code			: '',
				code2			: '',
				name			: '',
				norm			: '',
				price			: 0,
				specialprice	: 0,
				qty				: 0,
				amount			: 0,				
				p				: '',
				partType        : {codeValue: 'A', codeName: '정품'},
				specialpriceyn	: 'N',				
			};
			this.obtainList.push(obj);
		},
        showPartSearchList(item){
			const index = this.obtainList.indexOf(item);
			this.partDialogSearch = this.obtainList[index].name;
			this.obatinRowKey = index;
			this.searchPartList();
		},
		searchPartList(){
			if(this.custCode){
				this.partDialogSearchAll = false;
				this.selectedPart = "";
				this.searchPartListAction();
			}
			else{
				this.dialogProp = {
					title	: '거래처 정보 오류',
					msg		: '거래처를 선택하여 주세요.',
					callback: false
				};
				this.$refs.dialog1.confirm = true;
			}
			
		},
		searchPartListAction(){
			var headers = {
				'Accept': 'application/json'
			};
			
			var params = {
				keyword: this.partDialogSearch.trimLeft().trimRight(),
				custcode: this.custCode
			};
			
			var url = '/ptno/v1.0/ptnoOrderPopAllList';
			
			if(!this.partDialogSearchAll){
				url = '/ptno/v1.0/ptnoOrderPopList';
				params.vin = this.vin;
				params.ofdt	= this.ofdt;
				params.icd	= this.icd;
				params.bpno	= this.bpno;
			}
			
			this.$http.get(`${Config.newAjaxUri}${url}`, {params, headers})
			.then((response) => {

				if(response.status == 200 && response.data.response){
					this.partDialogList = [];
					
					for(var i=0;i<response.data.response.length;i++){
						var code		= response.data.response[i].code;
						var code2		= response.data.response[i].code2;
						var name		= response.data.response[i].name;
						var ptnokr		= response.data.response[i].ptnokr;
						var norm		= response.data.response[i].norm;
						var y			= response.data.response[i].y;
						var buyprice	= response.data.response[i].buyprice;
						var saleprice	= response.data.response[i].saleprice;
						var c			= response.data.response[i].c;
						var stockqty	= response.data.response[i].stockqty;
						var p			= response.data.response[i].p;

						var specialprice= response.data.response[i].specialprice;
						
						var obj = {
							code			: code,
							code2			: code2,
							name			: name,
							ptnokr			: ptnokr,
							norm			: norm,
							y				: y,
							buyprice		: buyprice,
							saleprice		: saleprice,
							c				: c,
							stockqty		: stockqty,
							p				: p,
							specialprice	: specialprice,
							specialpriceyn	: 'N',
							select			: false
						};
						if(obj.buyprice){
							obj.buyprice = numberStyle1(buyprice);
						}
						if(obj.saleprice){
							obj.saleprice = numberStyle1(saleprice);
						}
						if(obj.specialprice){
							obj.specialprice = numberStyle1(specialprice);
						}
						if(obj.stockqty){
							obj.stockqty = numberStyle1(stockqty);
						}
						

						this.partDialogList.push(obj);
					}
					this.$refs.dialog2.confirm = false;
					this.partSearchList = true;
					if(this.vin == '1111111111111'){
						this.partDialogSearchAll = true;
					}
				}
				else{					
					if(!response.data.check && response.data.message){
						this.dialogProp = {
							title	: '알림',
							msg		: response.data.message,
							callback: false
						};
						this.$refs.dialog1.confirm = true;
					}
					

					this.$refs.dialog2.confirm = false;
					this.partSearchList = true;
					if(this.vin == '1111111111111'){
						this.partDialogSearchAll = true;
					}
				}				
			});
        },
        // 매출 데이터 리스트에 셋팅 하는 함수
		checkSetData(codeParam){
			var headers = {
				'Accept': 'application/json'
			};
			var params = {
				custcode: this.custCode,
				code	: codeParam
			};
			this.$http.get(`${Config.newAjaxUri}/ptno/v1.0/get/ptnoOrderPopGetCode`, {params, headers})
			.then((response) => {

				if(response.status == 200 && response.data.response){
					if(this.obatinRowKey > -1){
						this.obtainList.splice(this.obatinRowKey, 1);
						this.obatinRowKey = -1;
					}
					for(var i=0;i<response.data.response.length;i++){
						
						var price = response.data.response[i].saleprice || 0;
						var specialprice = response.data.response[i].specialprice;

						var obj = {
							code			: response.data.response[i].code,
							code2			: response.data.response[i].code2,
							name			: response.data.response[i].name,
							norm			: response.data.response[i].norm,
							price			: price,
							specialprice	: specialprice,
							qty				: 1,
							amount			: 0,							
							p				: response.data.response[i].p,
							partType        : {codeValue: 'A', codeName: '정품'},
							specialpriceyn	: 'N',
							
						};
						this.obtainList.push(obj);
					}
					this.tempArr = [];
					this.checkObtainList();
					this.calculatorObtainList();
				}
			});
		},

		// 특별단가 체크 함수 
		checkSpecialPrice(){
				
			var checkedCount = 0;
			for(var i=0;i<this.partDialogList.length;i++){
				var select = this.partDialogList[i].select;
				if(select){
					checkedCount++;
				}
			}

			if(checkedCount > 0){
				var codeList = [];
				var codeParam = '';
				for(var i=0;i<this.partDialogList.length;i++){
					var select = this.partDialogList[i].select;
					if(select){
						var price = this.partDialogList[i].saleprice;
						var specialprice = this.partDialogList[i].specialprice;
						if($.inArray(this.partDialogList[i].code, codeList) == -1){
							codeList.push(this.partDialogList[i].code);
						}						
					}
				}
				
				for(var i=0;i<codeList.length;i++){
					if(i>0){
						codeParam += ",";
					}
					codeParam += codeList[i];
				}

				this.checkSetData(codeParam);
				this.partSearchList = false;
			}
			else{
				this.dialogProp = {
					title	: '상품 선택 오류',
					msg		: '상품을 선택하여 주세요.',
					callback: false
				};
				this.$refs.dialog1.confirm = true;
			}			
        },
        // 매출 목록에서 input value 모델로 업데이트 하는 함수
		obtainListModelUpdate(value, item, key){
			const index = this.obtainList.indexOf(item);
			this.obtainList[index][key] = value;

			if(key == 'qty' || key == 'price'){
				this.calculatorObtainList();
			}
			else if(key == 'amount' || key == 'sumamount' || key == 'vat'){
				this.calculatorObtainSummary();
			}
        },
        obtainDelete(item){
			const index = this.obtainList.indexOf(item);
			if(this.obtainCode && this.obtainList[index].seq){
				var params = new URLSearchParams();
				this.$http.delete(`${Config.newAjaxUri}/order/v1.0/delete/${this.obtainCode}/${this.obtainList[index].seq}/Y/${this.userid}`, params)
				.then((response) => {

					if(response.status == 200 && response.data.check){
						this.obtainList.splice(index, 1);
					}
					else{
						this.dialogProp = {
							title	: '삭제 실패',
							msg		: response.data.message || '오류로 인해 삭제에 실패하였습니다.',
							callback: false,
						};
						this.$refs.dialog1.confirm = true;
					}
				})
				.then(()=>{
					this.calculatorObtainList();
				});
			}
			else{
				this.obtainList.splice(index, 1);
				this.calculatorObtainList();
			}
		},
		
		// 특별단가 설정 팝업 뛰우는 함수 
		openSpecialPriceDialog(item){
			const index = this.obtainList.indexOf(item);
			var specialPrice = this.obtainList[index].specialprice; 
			this.dialogProp = {
				title	: '특별단가 설정',
				msg		: `특별단가 ${specialPrice}원 을 설정 하시겠습니까?`,
				callback: this.setSpecialPrice,
				callbackParam: {index: index}
			};
			this.$refs.dialog2.confirm = true;
		},
		// 특별단가 설정 함수 
		setSpecialPrice(param){
			this.obtainList[param.index].specialpriceyn = 'Y';
			this.obtainList[param.index].price = this.obtainList[param.index].specialprice;
			this.$refs.dialog2.confirm = false;
			this.calculatorObtainList();
		},

        calculatorObtainList(){
			
			
			for(var i=0;i<this.obtainList.length;i++){
				
				var qty = parseInt(this.obtainList[i].qty);
				var price = parseInt(this.obtainList[i].price);
				var vat = parseInt(this.obtainList[i].vat);
				var amount = parseInt(this.obtainList[i].amount);
				var sumamount = parseInt(this.obtainList[i].sumamount);

				this.obtainList[i].vat = parseInt((price/ 11) * qty);

				this.obtainList[i].amount = (price * qty) - this.obtainList[i].vat;
				
				this.obtainList[i].sumamount = qty*price;
			}
			this.calculatorObtainSummary();
		},
		calculatorObtainSummary(){
			this.obtainTotalList[0].totalQty = 0;
			this.obtainTotalList[0].totalPrice = 0;
			this.obtainTotalList[0].totalAmount = 0;
			this.obtainTotalList[0].totalSumamount = 0;
			this.obtainTotalList[0].totalVat = 0;

			for(var i=0;i<this.obtainList.length;i++){
				
				var qty = parseInt(this.obtainList[i].qty);
				var price = parseInt(this.obtainList[i].price);
				var vat = parseInt(this.obtainList[i].vat);
				var amount = parseInt(this.obtainList[i].amount);
				var sumamount = parseInt(this.obtainList[i].sumamount);

				this.obtainTotalList[0].totalQty = parseInt(this.obtainTotalList[0].totalQty) + parseInt(this.obtainList[i].qty);
				this.obtainTotalList[0].totalPrice = parseInt(this.obtainTotalList[0].totalPrice) + parseInt(this.obtainList[i].price);
				this.obtainTotalList[0].totalVat = parseInt(this.obtainTotalList[0].totalVat) + parseInt(this.obtainList[i].vat);
				this.obtainTotalList[0].totalAmount = parseInt(this.obtainTotalList[0].totalAmount) + parseInt(this.obtainList[i].amount);
				this.obtainTotalList[0].totalSumamount = parseInt(this.obtainTotalList[0].totalSumamount) + parseInt(this.obtainList[i].sumamount);
			}
        },
        modelUpdate(value, key){
			this[key] = value;
		},
		gotoOrderList(){
			this.movePage('Tacar/TacarOrderManagement');
		},
		movePage(pageName) {			
			var routeUrl = this.$session.get('routeUrl');			
			location.href = routeUrl+"#/"+pageName;
		}
	},
	watch: {		
		userid(){
			if(!this.userid){				
				this.movePage('Company/Login');
			}
		}
	}
}
</script>
<style>
.inputOnlyNumber input[type='number']{
    -moz-appearance:textfield;
}
.inputOnlyNumber input::-webkit-outer-spin-button,
.inputOnlyNumber input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
.fLeft{float: left;}
.clear{clear: both;}
.cuserInfoInnerWrap{
	padding: 0 20px;
}
.orderInfoTableWrap{
	margin-top: 20px;
}
.orderInfoTitle{
	text-align: center; border-bottom: 1px solid #cecece; font-size: 20px;
	height: 50px; line-height: 50px;
}
.orderInfoTable{
	width: 100%; text-align: center;
	border-collapse: collapse;
	padding: 0; margin: 0;  border: 1px solid #cecece;    
}
.orderInfoBtnRightWrap{
	text-align: right; margin-top: 10px;
}
.orderInfoBtnWrap{
	text-align: center; margin-top: 10px;
}
.btnType1{
	border-radius: 7px !important;
}
.searchItemBox{
	padding: 8px;
	cursor: pointer;
	
}
.searchItemBox:hover{
	background-color: #ecf6ff
}
.searchItemName{
	padding: 2px;
	color: rgb(57, 57, 57);
	font-size: 15px;
	
}
.searchItemAddress{
	padding: 2px;
	color: rgb(120, 120, 120);
	font-size: 13px;
}

.v-datatable__expand-content .v-datatable{
	width: 100%; max-width: 100%;
}

table.v-table {
    margin:0 auto;
    width: 100%;
    max-width: 100%;
}
.v-datatable thead tr th{
	padding: 0 5px !important;
}
.theme--light.v-table tbody tr{
	border-bottom: 1px solid rgba(0,0,0,0.12);
}
.noteForm .v-input__slot{
	border: 1px solid rgba(0,0,0,0.42) !important;
}
.noteForm.v-input--is-focused .v-input__slot{
	border: 2px solid !important;
	border-color: var(--v-primary-base) !important;
	caret-color: var(--v-primary-base) !important;
}
.customerNote{
	color: #ff0000; font-size: 18px; margin-top: 20px; margin-left: 20px;
}
.colorMinus input{
	color: #ff0000 !important;
}
.carInfoObtainTableBtnWrap{
	text-align: right;
}
.carInfoObtainBtnWrap{
	text-align: center;
}
.carInfoMemoInnerWrap, .carInfoObtainInnerWrap, .carInfoPartInnerWrap{
	padding: 20px;
}
.carInfoMemoTitleBox, .carInfoObtainTitleBox, .carInfoPartTitleBox{
	height: 30px; line-height: 30px; font-size: 16px;
}
.carInfoMemoTitleIcon, .carInfoObtainTitleIcon, .carInfoPartTitleIcon{
	margin-top: -1px
}
.carInfoMemoTitleText, .carInfoObtainTitleText, .carInfoPartTitleText{
	margin-left: 5px;
}
.carOrderListTable{
	max-height: 38vh; font-size: 15px !important;
}
.carInfoObtainSelectWrap{
	width: 100%; margin-top: 5px;
}
.carInfoPartSearchWrap{
	width: 50%; margin-top: 5px;
}
.carInfoPartSearch, .partDialogSearch{
	padding-top: 0px; margin-top: 0px; height: 30px; flex-grow: 0.2;
}
.carInfoPartTableWrap{
	margin-top: 5px;
}
.carInfoObtainTableWrap{
	margin-top: 5px;
}
.partListRow, partDialogListRow, carOrderListRow{
	position: relative;
}
.partListRowItem, .partDialogListRowItem, .carOrderListRowItem{
	cursor: pointer; word-break: break-all !important; position: relative;
	padding: 0 5px !important;
}
.obtainTableRow{
	position: relative;
}
.obtainTableRowItem{
	cursor: pointer; word-break: break-all !important; position: relative;
	padding: 0 5px !important;
}
.obtainTotalTableRow{
	position: relative;
}
.obtainTotalTableRowItem{
	cursor: pointer; word-break: break-all !important; position: relative;
	padding: 0 5px !important;
}
.obtainTable thead tr th{
	padding: 0 5px !important;
}
.obtainTotalTable thead tr th{
	padding: 0 5px !important;
}

.partSearchListHeaderWrap{
	background-color: #fff; border-bottom: 1px solid rgba(0,0,0,0.38);
	position: relative;
}
.partSearchListHeaderWrap{
	padding: 20px 20px 20px 20px;
}
.partSearchListTableWrap{
	padding: 0 20px;
}
.bookMarkDialogWrap{
	background-color: #fff;
}

.partListRow, partDialogListRow, memoListRow{
	position: relative;
}
.partListRowItem, .partDialogListRowItem, .memoListRowItem{
	cursor: pointer; word-break: break-all !important; position: relative;
	padding: 0 5px !important;
}
.important{
	color:red; font-weight:bold;
}
.important2{
	color:red;
}

</style>