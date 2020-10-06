<template>
<div>
	<b-card title="" class="main-card mb-4">		
		<BreadCrumb></BreadCrumb>
		<DemoCardNoTitle ref="tabBox">
			<div class="userInfoWrap">
				<div class="userInfoInnerWrap">                    
					<div class="userInfoTitle">사용자 상세정보</div>					
                    <div class="userInfoTableWrap">
						<table class="userInfoTable">
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
									<td>사용자아이디</td>
									<td>
                                        <v-text-field 
                                            :value="userId" 
                                            maxlength="20"
                                            readonly
                                        ></v-text-field>                                        
									</td>      
									<td>사용자성명</td>
                                    <td>                                       
                                        <v-text-field 
                                            :value="userNm" 
                                            maxlength="20"
                                            readonly
                                        ></v-text-field>                                        
									</td>      
                                    <td>휴대폰번호</td>
									<td>
                                        <div style="padding-right: 5%;">     
                                            <v-text-field 
                                                :value="userMobileNo" 
                                                maxlength="20"
                                                readonly
                                            ></v-text-field>
                                        </div>    
									</td>                                    
								</tr>
                                <tr>
                                    <td>거래처코드</td>    								
									<td>
										<v-text-field 
											:value="custCode" 
											maxlength="6"
											readonly
										></v-text-field>
									</td>
                                    <td>거래처명</td>    								
									<td>
										<v-text-field 
											:value="custName" 
											maxlength="100"
											readonly
										></v-text-field>
									</td>
									<td>서비스동의여부</td>    								
									<td>	
										<div  style="padding-right: 5%;">
											<v-select 
												v-model="serviceAgree"
												:items="AGREE_YN"											
												placeholder="서비스동의여부" 
												item-value='codeValue'
												item-text='codeName' 						
												return-object
												readonly
											></v-select>							
										</div>	
									</td>                                    
								</tr>     
                                <tr>                                    
                                    <td>개인정보동의여부</td>    								
									<td>
										<v-select 
											v-model="personAgree"
											:items="AGREE_YN"											
											placeholder="개인정보동의여부" 
											item-value='codeValue'
											item-text='codeName' 						
											return-object
											readonly
										></v-select>
									</td>
                                    <td>위치정보수집여부</td>
									<td>
                                        <v-select 
											v-model="locationAgree"
											:items="AGREE_YN"											
											placeholder="위치정보수집여부" 
											item-value='codeValue'
											item-text='codeName' 						
											return-object
											readonly
										></v-select>                                        
									</td>
									<td>마케팅동의여부</td>    								
									<td>
										<div  style="padding-right: 5%;">
											<v-select 
												v-model="marketingAgree"
												:items="AGREE_YN"											
												placeholder="위치정보수집여부" 
												item-value='codeValue'
												item-text='codeName' 						
												return-object
												readonly
											></v-select>										
										</div>	
									</td>
								</tr>
								<tr>                                    
									<td>승인여부</td>
									<td>
                                        <div> 
											<v-select 
												v-model="approYn"
												:items="APPRO_YN"											
												placeholder="승인여부" 
												item-value='codeValue'
												item-text='codeName' 						
												return-object
												readonly
											></v-select>
                                        </div>    
									</td>
									<td>등록일자</td>    								
									<td>{{creDate}}</td>                                     
									<td>수정일자</td>    								
									<td>{{uptDate}}</td>                                
								</tr>                                  
							</tbody>
						</table>
					</div>                         
                    <div class="userInfoBtnRightWrap">
                        <v-btn outline color="green darken-1" flat="flat" class="btnType1" @click="gotoUserList">목록</v-btn>					                
					</div>   
				</div>
			</div>
		</DemoCardNoTitle>
	</b-card>	
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
		userId: '',        
		userNm: '',        
        userMobileNo: '',
        serviceAgree: '',
        personAgree: '',        
        locationAgree: '',
        marketingAgree: '',
        approYn: '',        
        custCode: '',
		custName: '',
		creDate: '',
		uptDate: '',	
		AGREE_YN: [
			{codeValue: 'Y', codeName: '동의'},
			{codeValue: 'N', codeName: '미동의'}
		],
		APPRO_YN: [
			{codeValue: 'Y', codeName: '승인'},
			{codeValue: 'N', codeName: '미승인'}
		],
	}),
	mounted(){
		this.userid			= this.$session.get('id');
        this.userId			= this.$route.params.userId || false;        
        this.getTacarUserInfo();        
	},
	methods:{
		
		getTacarUserInfo(){
			var params = new URLSearchParams();			            
            
            this.$http.get(`${Config.newAjaxUri}/tacar/v1.0/user/get/${this.userId}`, params)
			.then((response) => {			
			 	
				if(response.status == 200 && response.data.response){
					this.userId	          = response.data.response[0].userId;
					this.userNm	          = response.data.response[0].userNm;
					this.userMobileNo	  = response.data.response[0].userMobileNo;					
					this.serviceAgree	  = response.data.response[0].serviceAgree;
					this.personAgree	  = response.data.response[0].personAgree;
					this.locationAgree	  = response.data.response[0].locationAgree;
					this.marketingAgree	  = response.data.response[0].marketingAgree;					
					this.approYn	  	  = response.data.response[0].approYn;
					this.custCode	      = response.data.response[0].custCode;
					this.custName		  = response.data.response[0].custName;
					this.creDate		  = response.data.response[0].creDate;
					this.uptDate		  = response.data.response[0].uptDate;
                }                                
			});
        },		
		modelUpdate(value, key){
			this[key] = value;
		},
		
		gotoUserList(){
			this.movePage('Tacar/TacarUserManagement');
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
.userInfoTableWrap{
	margin-top: 20px;
}
.userInfoTitle{
	text-align: center; border-bottom: 1px solid #cecece; font-size: 20px;
	height: 50px; line-height: 50px;
}
.userInfoTable{
	width: 100%; text-align: center;
	border-collapse: collapse;
	padding: 0; margin: 0;  border: 1px solid #cecece;    
}
.userInfoBtnRightWrap{
	text-align: right; margin-top: 10px;
}
.userInfoBtnWrap{
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
</style>