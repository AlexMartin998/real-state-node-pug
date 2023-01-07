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

/***/ "./src/public/js/js/map-home.js":
/*!**************************************!*\
  !*** ./src/public/js/js/map-home.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* eslint-disable no-undef */\n(() => {\n    const lat = -0.176701;\n    const lng = -78.4815577;\n    const map = L.map('map-home').setView([lat, lng], 15);\n\n    const categoriesSelect = document.querySelector('#categories');\n    const pricesSelect = document.querySelector('#prices');\n\n    let markers = new L.FeatureGroup().addTo(map);\n    let properties = [];\n\n    // Filters\n    const filters = { category: 0, price: 0 };\n\n    // Provider\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution:\n            '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',\n    }).addTo(map);\n\n    // Filtering\n    categoriesSelect.addEventListener('change', e => {\n        const categoryId = +e.target.value;\n        filters.category = categoryId;\n\n        // categoryId > 0 && getFilteredProperties();\n        getFilteredProperties();\n    });\n    pricesSelect.addEventListener('change', e => {\n        filters.price = +e.target.value;\n\n        getFilteredProperties();\n    });\n\n    const getProperties = async () => {\n        try {\n            const url = '/api/v1/properties';\n            const resp = await fetch(url);\n            const { properties: propertiesData } = await resp.json();\n            properties = propertiesData;\n            properties.length && showProperties(properties);\n        } catch (error) {\n            console.log(error);\n        }\n    };\n    getProperties();\n\n    const showProperties = properties => {\n        markers.clearLayers();\n\n        properties.forEach(\n            ({ id, lat, lng, title, image, price, category }) => {\n                const marker = new L.marker([lat, lng], {\n                    autoPan: true,\n                })\n                    .addTo(map)\n                    .bindPopup(\n                        `\n                        <p class=\"text-indigo-600 font-bold\">${category?.name}</p>\n                        <h1 class=\"text-xs font-extrabold uppercase mb-3\">${title}</h1>\n                        <img src=\"/uploads/${image}\" alt=\"Imagen de la propiedad ${title}\"/>\n                        <p class=\"text-gray-600 font-bold\">${price?.name}</p>\n                        <a href=\"/properties/${id}\" class=\"text-btn-popup bg-indigo-600 block p-2 text-center font-bold uppercase text-white\" >Ver Propiedad</a>\n                        `\n                    );\n\n                markers.addLayer(marker);\n            }\n        );\n    };\n\n    const getFilteredProperties = () => {\n        const result = properties\n            .filter(p =>\n                filters.category ? +p.category_id === +filters.category : p\n            )\n            .filter(fp =>\n                filters.price ? +fp.price_id === +filters.price : fp\n            );\n\n        showProperties(result);\n    };\n})();\n\n\n//# sourceURL=webpack://a_bienesraices_mvc/./src/public/js/js/map-home.js?");

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
/******/ 	__webpack_modules__["./src/public/js/js/map-home.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;