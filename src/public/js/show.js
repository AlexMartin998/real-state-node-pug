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

/***/ "./src/public/js/js/show.js":
/*!**********************************!*\
  !*** ./src/public/js/js/show.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nconst messageForm = document.querySelector('#message-form');\n\nmessageForm?.addEventListener('submit', e => {\n    const message = document.querySelector('#message').value.trim();\n    if (!message || message.length < 9) {\n        e.preventDefault();\n        const errorBox = document.querySelector('#error');\n        errorBox.classList.remove('hidden');\n        errorBox.textContent =\n            'El mensaje no puede estar vacio o ser muy corto.';\n        return;\n    }\n\n    alert('Acción no permitira en la Demo, clone el repo.');\n});\n\n\n//# sourceURL=webpack://a_bienesraices_mvc/./src/public/js/js/show.js?");

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
/******/ 	__webpack_modules__["./src/public/js/js/show.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;