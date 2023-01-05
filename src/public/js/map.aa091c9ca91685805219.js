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

/***/ "./src/public/js/map.js":
/*!******************************!*\
  !*** ./src/public/js/map.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* eslint-disable no-undef */\n\n(function () {\n    // maps/@-0.176701,-78.4815577,3a,75y,151.98h,85.24t/   <- google maps\n    const lat = -0.176701;\n    const lng = -78.4815577;\n    const mapa = L.map('map').setView([lat, lng], 16);\n\n    // Provider & Geocoder\n    const geocodeService = L.esri.Geocoding.geocodeService();\n\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution:\n            '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',\n    }).addTo(mapa);\n\n    // Pin\n    marker = new L.marker([lat, lng], {\n        draggable: true,\n        autoPan: true,\n    }).addTo(mapa);\n\n    marker.on('moveend', function (e) {\n        marker = e.target;\n        const position = marker.getLatLng();\n\n        // center map when releasing the pin\n        mapa.panTo(new L.LatLng(position.lat, position.lng));\n\n        // get streets info when releasing the pin: https://leafletjs.com/examples/quick-start/\n        geocodeService\n            .reverse()\n            .latlng(position, 13)\n            .run(function (error, result) {\n                marker.bindPopup(result.address.LongLabel).openPopup();\n            });\n    });\n})();\n\n\n//# sourceURL=webpack://a_bienesraices_mvc/./src/public/js/map.js?");

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
/******/ 	__webpack_modules__["./src/public/js/map.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;