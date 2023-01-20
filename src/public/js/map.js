/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/public/js/js/map.js":
/*!*********************************!*\
  !*** ./src/public/js/js/map.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* eslint-disable no-undef */\n\n(function () {\n    // maps/@-0.176701,-78.4815577,3a,75y,151.98h,85.24t/   <- google maps\n    const lat = +document.querySelector('#lat').value || -0.176701;\n    const lng = +document.querySelector('#lng').value || -78.4815577;\n    const mapa = L.map('map').setView([lat, lng], 16);\n    const editBtn = document.querySelector('#edit-property');\n\n    // Provider & Geocoder\n    const geocodeService = L.esri.Geocoding.geocodeService();\n\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution:\n            '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',\n    }).addTo(mapa);\n\n    // Pin\n    let marker = new L.marker([lat, lng], {\n        draggable: true,\n        autoPan: true,\n    }).addTo(mapa);\n\n    // TODO: Refactor\n    const position = marker.getLatLng();\n    geocodeService\n        .reverse()\n        .latlng(position, 13)\n        .run(function (error, result) {\n            // fill hidden inputs\n            let street = document.querySelector('.street');\n            street.textContent =\n                street.textContent || (result?.address?.Address ?? '');\n            // document.querySelector('.street').textContent = result?.address?.Address ?? '';\n        });\n\n    marker.on('moveend', function (e) {\n        marker = e.target;\n        const position = marker.getLatLng();\n\n        // center map when releasing the pin\n        mapa.panTo(new L.LatLng(position.lat, position.lng));\n\n        // get streets info when releasing the pin: https://leafletjs.com/examples/quick-start/\n        geocodeService\n            .reverse()\n            .latlng(position, 13)\n            .run(function (error, result) {\n                marker.bindPopup(result.address.LongLabel).openPopup();\n\n                // fill hidden inputs\n                document.querySelector('.street').textContent =\n                    result?.address?.Address ?? '';\n                document.querySelector('#street').value =\n                    result?.address?.Address ?? '';\n                document.querySelector('#lat').value =\n                    result?.latlng?.lat ?? '';\n                document.querySelector('#lng').value =\n                    result?.latlng?.lng ?? '';\n            });\n    });\n\n    editBtn.onclick = () => {\n        alert('Acción no permitira en la Demo, clone el repo.');\n    };\n})();\n\n\n//# sourceURL=webpack://a_bienesraices_mvc/./src/public/js/js/map.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/public/js/js/map.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;