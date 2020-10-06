import 'es6-promise/auto'
import Vue from 'vue'
import './plugins/vuetify'
import router from './router'
import jquery from 'jquery'
import BootstrapVue from "bootstrap-vue"
import App from './App'
import VueSession from 'vue-session'
import Default from './Layout/Wrappers/baseLayout.vue';
import Pages from './Layout/Wrappers/pagesLayout.vue';
import Apps from './Layout/Wrappers/appLayout.vue';
import axios from 'axios';
import Config from './plugins/user.js';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(BootstrapVue);
Vue.use(VueSession);
Vue.component('default-layout', Default);
Vue.component('userpages-layout', Pages);
Vue.component('apps-layout', Apps);

window.Config = Config;
window.$ = jquery;
window.jQuery = jquery;
window.Router = router;

router.addRoutes([
		// 기본정보관리
		{
			path: '/Basic/CompanyList',
			name: '기본정보관리/사업장관리/사업장목록',
			component: () => import('./Pages/Basic/CompanyList.vue'),
		},
		{
			path: '/Basic/CompanyRegister',
			name: '기본정보관리/사업장관리/사업장등록',
			component: () => import('./Pages/Basic/CompanyRegister.vue'),
			children: [
				{
					path: ':companyCode',
					name: '기본정보관리/사업장관리/사업장수정',
					component: () => import('./Pages/Basic/CompanyRegister.vue'),
					props: true
				},
			]
		},
		{
			path: '/Basic/SystemCompanyList',
			name: '기본정보관리/거래처관리/사업장리스트',
			component: () => import('./Pages/Basic/SystemCompanyList.vue'),
		},
		{
			path: '/Basic/CustomerList/:companyCode',
			name: '기본정보관리/거래처관리/거래처목록',
			component: () => import('./Pages/Basic/CustomerList.vue'),
		},
		{
			path: '/Basic/PartManageMaster',
			name: '기본정보관리/부품관리(마스터정보)/분류관리',
			component: () => import('./Pages/Basic/PartManageMaster.vue'),
		},
		{
			path: '/Basic/PartListMaster',
			name: '기본정보관리/부품관리(마스터정보)/부품목록',
			component: () => import('./Pages/Basic/PartListMaster.vue'),
		},
		{
			path: '/Basic/PartRegisterMaster',
			name: '기본정보관리/부품관리(마스터정보)/부품등록',
			component: () => import('./Pages/Basic/PartRegisterMaster.vue'),
			children: [
				{
					path: ':partCode',
					name: '기본정보관리/부품관리(마스터정보)/부품수정',
					component: () => import('./Pages/Basic/PartRegisterMaster.vue'),
					props: true
				},
			]
		},
		
		{
			path: '/Basic/PartListCompany',
			name: '부품목록',
			component: () => import('./Pages/Basic/PartListCompany.vue'),
		},
		{
			path: '/Basic/PartRegisterCompany',
			name: '부품등록',
			component: () => import('./Pages/Basic/PartRegisterCompany.vue'),
			children: [
				{
					path: ':partCode',
					name: '부품수정',
					component: () => import('./Pages/Basic/PartRegisterCompany.vue'),
					props: true
				},
			]
		},
		{
			path: '/Basic/UnitCostSales',
			name: '매출단가',
			component: () => import('./Pages/Basic/UnitCostSales.vue'),
		},
		{
			path: '/Basic/UnitCostBuy',
			name: '매입단가',
			component: () => import('./Pages/Basic/UnitCostBuy.vue'),
		},
		{
			path: '/Basic/UnitCostCustomer',
			name: '거래처별단가',
			component: () => import('./Pages/Basic/UnitCostCustomer.vue'),
		},
		
		{
			path: '/Basic/SpecialUnitCostCustomer',
			name: '거래처특별단가',
			component: () => import('./Pages/Basic/SpecialUnitCostCustomer.vue'),
		},
		{
			path: '/Basic/SpecialUnitCostParts',
			name: '부품특별단가',
			component: () => import('./Pages/Basic/SpecialUnitCostParts.vue'),
		},
		
		// 매출관리
		{
			path: '/Company/UserManage',
			name: '기본정보관리/사용자관리',
			component: () => import('./Pages/Company/UserManage.vue'),
			
		},
		{
			path: '/Company/SecureManage',
			name: '기본정보관리/보안관리',
			component: () => import('./Pages/Company/SecureManage.vue'),
			
		},
        {
            path: '/Company/StatementOfAccountManage',
            name: '기본정보관리/명세표관리',
            component: () => import('./Pages/Company/StatementOfAccountManage.vue'),
        },
		{
			path: '/Company/CustomerList',
			name: '기본정보관리/거래처관리/거래처목록',
			component: () => import('./Pages/Company/CustomerList.vue'),
			
		},
		{
			path: '/Company/Customer/CustomerRegister',
			name: '기본정보관리/거래처관리/거래처등록',
			component: () => import('./Pages/Company/Customer/CustomerRegister.vue'),
			children: [
				{
					path: ':code',
					name: '기본정보관리/거래처관리/거래처수정',
					component: () => import('./Pages/Company/Customer/CustomerRegister.vue'),
					props: true
				},
			]
		},
		
		{
			path: '/Company/PartList',
			name: '기본정보관리/상품관리/상품목록',
			component: () => import('./Pages/Company/Part/PartList.vue'),
			
		},
		{
			path: '/Company/PartRegister',
			name: '기본정보관리/상품관리/상품등록',
			component: () => import('./Pages/Company/Part/PartRegister.vue'),
			children: [
				{
					path: ':code',
					name: '기본정보관리/상품관리/상품수정',
					component: () => import('./Pages/Company/Part/PartRegister.vue'),
					props: true
				},
			]
		},
		{
			path: '/Company/PartSetList',
			name: '기본정보관리/상품관리/세트상품목록',
			component: () => import('./Pages/Company/Part/PartSetList.vue'),
		},
		{
			path: '/Company/Favorite',
			name: '기본정보관리/상품관리/즐겨찾기등록(옵션)',
			component: () => import('./Pages/Company/Part/Favorite.vue'),
		},
		{
			path: '/Company/ObtainMemo',
			name: '매출관리/메모',
			component: () => import('./Pages/Company/ObtainMemo.vue'),
			
		},
		// name 이 같을 경우 props 를 반드시 false로 셋팅;
		{
			path: '/Company/ObtainRegister/:vin',
			name: '매출관리/차량조회',
			component: () => import('./Pages/Company/ObtainRegister.vue'),
			props: false,
			children: [
				{
					path: ':customerCode',
					name: '매출관리/매출등록',
					component: () => import('./Pages/Company/ObtainRegister.vue'),
					props: false,
					children: [
						{
							path: ':obtainCode',
							name: '매출관리/매출수정',
							component: () => import('./Pages/Company/ObtainRegister.vue'),
							props: false,

						},
					]
				},
			]
		},
		{
			path: '/Company/ObtainList',
			name: '매출관리/매출목록',
			component: () => import('./Pages/Company/ObtainList.vue'),
			
		},
		{
			path: '/Company/StatementOfAccount/:code',
			name: '매출관리/거래명세표',
			component: () => import('./Pages/Company/StatementOfAccount.vue'),
		},
		{
			path: '/Company/CustomerLedger',
			name: '매출관리/매출처별원장',
			component: () => import('./Pages/Company/CustomerLedger.vue'),
		},
        {
            path: '/PurchaseManager/PurchaseManagement',
            name: '매입관리/매입',
            component: () => import('./Pages/PurchaseManager/PurchaseManagement.vue'),
        },
        {
            path: '/PurchaseManager/PurchaseList',
            name: '매입관리/매입목록',
            component: () => import('./Pages/PurchaseManager/PurchaseList.vue'),
        },
        {
            path: '/PurchaseManager/BillListPerSupplier',
            name: '매입관리/매입처별원장',
            component: () => import('./Pages/PurchaseManager/BillListPerSupplier.vue'),
        },
        {
            path: '/PurchaseManager/ShortageStock',
            name: '매입관리/부족재고',
            component: () => import('./Pages/PurchaseManager/ShortageStock.vue'),
        },
		{
			path: '/PurchaseManager/BuyRegister',
			name: '매입관리/재고등록',
			component: () => import('./Pages/PurchaseManager/BuyRegister.vue'),
		},
        {
            path: '/PurchaseManager/PurchaseRegister',
            name: '매입관리/매입등록',
            component: () => import('./Pages/PurchaseManager/PurchaseRegister.vue'),
        },
        {
            path: '/PurchaseManager/PurchaseDetail/:masterSeq',
            name: '매입관리/매입수정',
            component: () => import('./Pages/PurchaseManager/PurchaseDetail.vue'),
        },
		// 배차관리
		{
			path: '/DeliveryManager/CheckerManagement',
			name: '배차관리시스템/확인자관리',
			component: () => import('./Pages/DeliveryManager/CheckerManagement.vue'),
		},
		{
			path: '/DeliveryManager/DriverManagement',
			name: '배차관리시스템/기사관리',
			component: () => import('./Pages/DeliveryManager/DriverManagement.vue'),
		},
		{
			path: '/DeliveryManager/DriverSettlementManagement',
			name: '배차관리시스템/기사정산관리',
			component: () => import('./Pages/DeliveryManager/DriverSettlementManagement.vue'),
		},
        {
			path: '/DeliveryManager/DriverPerBalanceAccount',
			name: '배차관리시스템/기사별정산',
			component: () => import('./Pages/DeliveryManager/DriverPerBalanceAccount.vue'),
		},
        {
            path: '/DeliveryManager/DriverPartsRegister',
            name: '배차기록관리/기사수거상품관리',
            component: () => import('./Pages/DeliveryManager/DriverPartsRegister.vue'),
        },
        {
			path: '/DeliveryManager/DriverPartsRecoveryList',
			name: '배차기록관리/기사수거목록',
			component: () => import('./Pages/DeliveryManager/DriverPartsRecoveryList.vue'),
		},
        {
            path: '/DeliveryManager/BachaSiteReDirection',
            name: '배차관리/배차관리',
            component: () => import('./Pages/DeliveryManager/BachaSiteReDirection.vue'),
		},
		{
			path: '/Tacar/TacarUserManagement',
			name: '카센터관리/사용자관리',
			component: () => import('./Pages/Tacar/TacarUserManagement.vue'),
		},
		{
            path: '/Tacar/TacarUserDetail/:userId',
            name: '사용자관리/사용자상세',
            component: () => import('./Pages/Tacar/TacarUserDetail.vue'),
		},
		{
			path: '/Tacar/TacarOrderManagement',
			name: '카센터관리/고객문의관리',
			component: () => import('./Pages/Tacar/TacarOrderManagement.vue'),
		},
		{
			path: '/Tacar/TacarOrderDetail/:orderCode',
			name: '카센터관리/고객문의상세',
			component: () => import('./Pages/Tacar/TacarOrderDetail.vue'),
		},
		// Pages
        {
            path: '/Company/Login',
            name: 'login',
            meta: {layout: 'userpages'},
            component: () => import('./Pages/Company/Login.vue'),
        },

]);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});