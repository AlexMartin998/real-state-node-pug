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

/***/ "./src/public/js/js/change-property-state.js":
/*!***************************************************!*\
  !*** ./src/public/js/js/change-property-state.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(() => {\n    const changeStateBtns = document.querySelectorAll('.change-state');\n    const token = document\n        .querySelector('meta[name=\"csrf-token\"]')\n        .getAttribute('content');\n\n    changeStateBtns.forEach(btn => {\n        btn.addEventListener('click', async e => {\n            const { propertyId: id } = e.target.dataset;\n\n            try {\n                const resp = await fetch(`/properties/state/${id}`, {\n                    method: 'PUT',\n                    headers: {\n                        'CSRF-Token': token, // csrfSurf lo espera de esta forma\n                    },\n                });\n                const { ok } = await resp.json();\n\n                if (ok) {\n                    if (e.target.classList.contains('bg-yellow-100')) {\n                        e.target.classList.add(\n                            'bg-green-100',\n                            'text-green-800'\n                        );\n                        e.target.classList.remove(\n                            'bg-yellow-100',\n                            'text-yellow-800'\n                        );\n                        e.target.textContent = 'Publicado';\n                    } else {\n                        e.target.classList.remove(\n                            'bg-green-100',\n                            'text-green-800'\n                        );\n                        e.target.classList.add(\n                            'bg-yellow-100',\n                            'text-yellow-800'\n                        );\n                        e.target.textContent = 'No Publicado';\n                    }\n                }\n            } catch (error) {\n                console.log(error);\n            }\n        });\n    });\n})();\n\n\n//# sourceURL=webpack://a_bienesraices_mvc/./src/public/js/js/change-property-state.js?");

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
/******/ 	__webpack_modules__["./src/public/js/js/change-property-state.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;