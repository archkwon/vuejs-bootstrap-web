module.exports = {
	GDATA: {
		naviData: []
	},
	mode: false,
	baseURI: 'http://localhost',
    newAjaxUri: 'http://localhost:9091',

	TMAP_API: {
		tmapKey: 'xxx',
		geo: {
			fullAddrGeo: 'https://apis.openapi.sk.com/tmap/geo/fullAddrGeo',
		},
		routes: {
			routes: 'https://apis.openapi.sk.com/tmap/routes?version=1&format=json', // 자동차 길찾기
			pedestrian: 'https://api2.sktelecom.com/tmap/routes/pedestrian?version=1&format=json',  // 도보 길찾기
			routeSequential30: 'https://api2.sktelecom.com/tmap/routes/routeSequential30',
			routeOptimization10: 'https://api2.sktelecom.com/tmap/routes/routeOptimization10',
			routeOptimization20: 'https://api2.sktelecom.com/tmap/routes/routeOptimization20',
			routeOptimization30: 'https://api2.sktelecom.com/tmap/routes/routeOptimization30',
			routeOptimization100: 'https://api2.sktelecom.com/tmap/routes/routeOptimization100',
		},
		pois: 'https://apis.openapi.sk.com/tmap/pois', // 주소및 상호 검색
	},
	ADDRESS_API: {
		addressApiKey: 'U01TX0FVVEgyMDE5MDgwNTExMDUzODEwODkyODM=', //행정안전부 도로명 주 www.juso.go.kr
		addressApi: 'http://www.juso.go.kr/addrlink/addrLinkApi.do',
	},
	parseLicenseNumber: function (license_number) {
		var new_license_number = '';
		if (license_number.length == 10) {
			new_license_number = license_number.substr(0, 3) + "-" + license_number.substr(3, 2) + "-" + license_number.substr(5, 5);
		}
		return new_license_number;
	},
	parseMobileNumber: function (mobile_number) {
		var mobile_code_list = ['010', '011', '012', '015', '016', '017', '018', '019'];
		var mobile_code = mobile_number.substr(0, 3);

		var sw = false;
		var fixed_number = '';

		for (var i = 0; i < mobile_code_list.length; i++) {
			if (mobile_code == mobile_code_list[i]) {
				sw = true;
				break;
			}
		}

		if (sw) {
			if (mobile_number.length == 10) {
				fixed_number = mobile_code + '-' + mobile_number.substr(3, 3) + '-' + mobile_number.substr(6, 4);
			}
			else if (mobile_number.length == 11) {
				fixed_number = mobile_code + '-' + mobile_number.substr(3, 4) + '-' + mobile_number.substr(7, 4);
			}
			else {
				fixed_number = mobile_code + '-' + mobile_number.substr(3, mobile_number.length - 3);
			}
		}
		else {
			fixed_number = mobile_number;
		}
		return fixed_number;
	},
	parsePhoneNumber: function (phone_number) {
		var location_number_table =
			[
				'02',
				'031', '032', '033',
				'041', '042', '043', '044',
				'051', '052', '053', '054', '055',
				'061', '062', '063', '064',
				'070',
				'010', '011', '012', '015', '016', '017', '018', '019'
			];

		var location_number1 = phone_number.substr(0, 2);
		var location_number2 = phone_number.substr(0, 3);

		var sw = false;
		var fixed_number = '';

		for (var i = 0; i < location_number_table.length; i++) {
			if (location_number1 == location_number_table[i] || location_number2 == location_number_table[i]) {
				sw = true;
				break;
			}
		}
		if (location_number1 == '02') {
			if (phone_number.length == 9) {
				fixed_number = location_number1 + '-' + phone_number.substr(2, 3) + '-' + phone_number.substr(5, 4);
			}
			else if (phone_number.length == 10) {
				fixed_number = location_number1 + '-' + phone_number.substr(2, 4) + '-' + phone_number.substr(6, 4);
			}
			else {
				fixed_number = location_number1 + '-' + phone_number.substr(2, phone_number.length - 2);
			}
		}
		else {
			if (sw) {
				if (phone_number.length == 10) {
					fixed_number = location_number2 + '-' + phone_number.substr(3, 3) + '-' + phone_number.substr(6, 4);
				}
				else if (phone_number.length == 11) {
					fixed_number = location_number2 + '-' + phone_number.substr(3, 4) + '-' + phone_number.substr(7, 4);
				}
				else {
					fixed_number = location_number2 + '-' + phone_number.substr(3, phone_number.length - 3);
				}
			}
			else {
				fixed_number = phone_number;
			}
		}
		return fixed_number;

	},

	isFullscreen() {
		var fullscreenElement = null;
		if (document.fullscreenElement) {
			fullscreenElement = document.fullscreenElement;
		}
		else if (document.msFullscreenElement) {
			fullscreenElement = document.msFullscreenElement;
		}
		else if (document.webkitFullscreenElement) {
			fullscreenElement = document.webkitFullscreenElement;
		}
		return fullscreenElement != null && fullscreenElement != undefined;
	},
	exitFullScreen() {
		var exitFullScreen = function () {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
			else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
			else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			}
			else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		}
		if (this.isFullscreen()) {
			exitFullScreen();
		}
	},
	onfullscreenchange(callBackFuncion) {
		callBackFuncion.call(this);
	},
	reqFullScreen(id, callBackFuncion) {
		if ("onfullscreenchange" in document) {
			document.onfullscreenchange = this.onfullscreenchange(callBackFuncion);
		}
		else if ("onmsfullscreenchange" in document) {
			document.onmsfullscreenchange = this.onfullscreenchange(callBackFuncion);
		}
		else if ("onmozfullscreenchange" in document) {
			document.onmozfullscreenchange = this.onfullscreenchange(callBackFuncion);
		}
		else if ("onwebkitfullscreenchange" in document) {
			document.onwebkitfullscreenchange = this.onfullscreenchange(callBackFuncion);
		}

		if (this.isFullscreen()) {
			this.exitFullScreen();
		}
		else {
			if (document.getElementById(id).requestFullscreen) {
				document.getElementById(id).requestFullscreen();
			}
			else if (document.getElementById(id).mozRequestFullScreen) {
				document.getElementById(id).mozRequestFullScreen();
			}
			else if (document.getElementById(id).webkitRequestFullscreen) {
				document.getElementById(id).webkitRequestFullscreen();
			}
			else if (document.getElementById(id).msRequestFullscreen) {
				document.getElementById(id).msRequestFullscreen();
			}
		}
	},

	is_ie() {
		if (navigator.userAgent.toLowerCase().indexOf("chrome") != -1) return false;
		if (navigator.userAgent.toLowerCase().indexOf("msie") != -1) return true;
		if (navigator.userAgent.toLowerCase().indexOf("windows nt") != -1) return true;
		return false;
	}

} 
