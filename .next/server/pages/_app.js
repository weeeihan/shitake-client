/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./modules/websocket_provider.tsx":
/*!****************************************!*\
  !*** ./modules/websocket_provider.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WebsocketContext: () => (/* binding */ WebsocketContext),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst WebsocketContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({\n    conn: null,\n    setConn: ()=>{},\n    user: {\n        name: \"\",\n        roomID: \"\"\n    },\n    setUser: ()=>{}\n});\nconst WebSocketProvider = ({ children })=>{\n    const [conn, setConn] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        name: \"\",\n        roomID: \"\"\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(WebsocketContext.Provider, {\n        value: {\n            conn: conn,\n            setConn: setConn,\n            user: user,\n            setUser: setUser\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/modules/websocket_provider.tsx\",\n        lineNumber: 22,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WebSocketProvider);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9tb2R1bGVzL3dlYnNvY2tldF9wcm92aWRlci50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUF1RDtBQUloRCxNQUFNRyxpQ0FBbUJELG9EQUFhQSxDQUsxQztJQUNERSxNQUFNO0lBQ05DLFNBQVMsS0FBTztJQUNoQkMsTUFBTTtRQUFFQyxNQUFNO1FBQUlDLFFBQVE7SUFBRztJQUM3QkMsU0FBUyxLQUFPO0FBQ2xCLEdBQUc7QUFFSCxNQUFNQyxvQkFBb0IsQ0FBQyxFQUFFQyxRQUFRLEVBQWlDO0lBQ3BFLE1BQU0sQ0FBQ1AsTUFBTUMsUUFBUSxHQUFHSiwrQ0FBUUEsQ0FBTztJQUN2QyxNQUFNLENBQUNLLE1BQU1HLFFBQVEsR0FBR1IsK0NBQVFBLENBQVc7UUFBRU0sTUFBTTtRQUFJQyxRQUFRO0lBQUc7SUFFbEUscUJBQ0UsOERBQUNMLGlCQUFpQlMsUUFBUTtRQUN4QkMsT0FBTztZQUNMVCxNQUFNQTtZQUNOQyxTQUFTQTtZQUNUQyxNQUFNQTtZQUNORyxTQUFTQTtRQUNYO2tCQUVDRTs7Ozs7O0FBR1A7QUFFQSxpRUFBZUQsaUJBQWlCQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpZW50Ly4vbW9kdWxlcy93ZWJzb2NrZXRfcHJvdmlkZXIudHN4P2I2NWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCBjcmVhdGVDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBVc2VySW5mbyB9IGZyb20gXCJAL3N0cnVjdHMvc3RydWN0c1wiO1xudHlwZSBDb25uID0gV2ViU29ja2V0IHwgbnVsbDtcblxuZXhwb3J0IGNvbnN0IFdlYnNvY2tldENvbnRleHQgPSBjcmVhdGVDb250ZXh0PHtcbiAgY29ubjogQ29ubjtcbiAgc2V0Q29ubjogKGM6IENvbm4pID0+IHZvaWQ7XG4gIHVzZXI6IFVzZXJJbmZvO1xuICBzZXRVc2VyOiAodXNlcjogVXNlckluZm8pID0+IHZvaWQ7XG59Pih7XG4gIGNvbm46IG51bGwsXG4gIHNldENvbm46ICgpID0+IHt9LFxuICB1c2VyOiB7IG5hbWU6IFwiXCIsIHJvb21JRDogXCJcIiB9LFxuICBzZXRVc2VyOiAoKSA9PiB7fSxcbn0pO1xuXG5jb25zdCBXZWJTb2NrZXRQcm92aWRlciA9ICh7IGNoaWxkcmVuIH06IHsgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZSB9KSA9PiB7XG4gIGNvbnN0IFtjb25uLCBzZXRDb25uXSA9IHVzZVN0YXRlPENvbm4+KG51bGwpO1xuICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZTxVc2VySW5mbz4oeyBuYW1lOiBcIlwiLCByb29tSUQ6IFwiXCIgfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8V2Vic29ja2V0Q29udGV4dC5Qcm92aWRlclxuICAgICAgdmFsdWU9e3tcbiAgICAgICAgY29ubjogY29ubixcbiAgICAgICAgc2V0Q29ubjogc2V0Q29ubixcbiAgICAgICAgdXNlcjogdXNlcixcbiAgICAgICAgc2V0VXNlcjogc2V0VXNlcixcbiAgICAgIH19XG4gICAgPlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvV2Vic29ja2V0Q29udGV4dC5Qcm92aWRlcj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdlYlNvY2tldFByb3ZpZGVyO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJjcmVhdGVDb250ZXh0IiwiV2Vic29ja2V0Q29udGV4dCIsImNvbm4iLCJzZXRDb25uIiwidXNlciIsIm5hbWUiLCJyb29tSUQiLCJzZXRVc2VyIiwiV2ViU29ja2V0UHJvdmlkZXIiLCJjaGlsZHJlbiIsIlByb3ZpZGVyIiwidmFsdWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./modules/websocket_provider.tsx\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _modules_websocket_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/modules/websocket_provider */ \"./modules/websocket_provider.tsx\");\n\n\n\nfunction App({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_modules_websocket_provider__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/pages/_app.tsx\",\n                    lineNumber: 12,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/pages/_app.tsx\",\n                lineNumber: 11,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/pages/_app.tsx\",\n            lineNumber: 10,\n            columnNumber: 7\n        }, this)\n    }, void 0, false);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQThCO0FBRytCO0FBRTlDLFNBQVNDLElBQUksRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQVk7SUFDNUQscUJBQ0U7a0JBRUUsNEVBQUNILG1FQUFpQkE7c0JBQ2hCLDRFQUFDSTswQkFDQyw0RUFBQ0Y7b0JBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNbEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGllbnQvLi9wYWdlcy9fYXBwLnRzeD8yZmJlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIkAvc3R5bGVzL2dsb2JhbHMuY3NzXCI7XG5pbXBvcnQgdHlwZSB7IEFwcFByb3BzIH0gZnJvbSBcIm5leHQvYXBwXCI7XG5pbXBvcnQgQXV0aENvbnRleHRQcm92aWRlciBmcm9tIFwiQC9tb2R1bGVzL2F1dGhfcHJvdmlkZXJcIjtcbmltcG9ydCBXZWJTb2NrZXRQcm92aWRlciBmcm9tIFwiQC9tb2R1bGVzL3dlYnNvY2tldF9wcm92aWRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykge1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7LyogPEF1dGhDb250ZXh0UHJvdmlkZXI+ICovfVxuICAgICAgPFdlYlNvY2tldFByb3ZpZGVyPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L1dlYlNvY2tldFByb3ZpZGVyPlxuICAgICAgey8qIDwvQXV0aENvbnRleHRQcm92aWRlcj4gKi99XG4gICAgPC8+XG4gICk7XG59XG4iXSwibmFtZXMiOlsiV2ViU29ja2V0UHJvdmlkZXIiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJkaXYiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();