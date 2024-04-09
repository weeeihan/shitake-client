"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/lobby",{

/***/ "./components/lobby.tsx":
/*!******************************!*\
  !*** ./components/lobby.tsx ***!
  \******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_images_images__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/images/images */ \"./components/images/images.ts\");\n/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/utils */ \"./utils/utils.ts\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n\nvar _s = $RefreshSig$();\n\n\n\n\nconst Lobby = (param)=>{\n    let { player, roomData, readyHandler, leaveRoomHandler, isAlready } = param;\n    _s();\n    const [over, setOver] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);\n    const [onLeave, setOnLeave] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);\n    const players = _utils_utils__WEBPACK_IMPORTED_MODULE_3__.SortPlayers(roomData.players);\n    const onLeaveHandler = (e)=>{\n        if (!onLeave) {\n            e.preventDefault();\n            setOnLeave(true);\n        }\n    };\n    const notLeaveHandler = (e)=>{\n        e.preventDefault();\n        setOnLeave(false);\n        setOver(false);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"text-2xl font-reenie text-center mt-5\",\n                children: \"Shitake by Han.\"\n            }, void 0, false, {\n                fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/components/lobby.tsx\",\n                lineNumber: 42,\n                columnNumber: 7\n            }, undefined),\n            onLeave ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"text-center flex flex-col items-center\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"font-patrick text-2xl my-20 tracking-wide\",\n                        children: \"Leaving already? \\uD83D\\uDE22\"\n                    }, void 0, false, {\n                        fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/components/lobby.tsx\",\n                        lineNumber: 47,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"mb-10\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                className: \"cursor-pointer text-3xl font-patrick tracking-wide\",\n                                onClick: leaveRoomHandler,\n                                children: \"YES\"\n                            }, void 0, false, {\n                                fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/components/lobby.tsx\",\n                                lineNumber: 51,\n                                columnNumber: 13\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                className: \"text-3xl font-patrick tracking-wide mx-10\",\n                                children: \"|\"\n                            }, void 0, false, {\n                                fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/components/lobby.tsx\",\n                                lineNumber: 57,\n                                columnNumber: 13\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                className: \"cursor-pointer text-3xl font-patrick tracking-wide\",\n                                onClick: notLeaveHandler,\n                                children: [\n                                    \"NO\",\n                                    \" \"\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/components/lobby.tsx\",\n                                lineNumber: 58,\n                                columnNumber: 13\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/components/lobby.tsx\",\n                        lineNumber: 50,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {\n                        src: over || onLeave ? _components_images_images__WEBPACK_IMPORTED_MODULE_2__.doorOpen : _components_images_images__WEBPACK_IMPORTED_MODULE_2__.doorClose,\n                        alt: \"Door\",\n                        width: 45,\n                        className: \"  drop-shadow-lg  \",\n                        onClick: onLeaveHandler\n                    }, void 0, false, {\n                        fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/components/lobby.tsx\",\n                        lineNumber: 66,\n                        columnNumber: 11\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/components/lobby.tsx\",\n                lineNumber: 46,\n                columnNumber: 9\n            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"text-7xl pl-7 py-10 text-center font-patrick tracking-superWide\",\n                        children: roomData.id\n                    }, void 0, false, {\n                        fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/components/lobby.tsx\",\n                        lineNumber: 76,\n                        columnNumber: 11\n                    }, undefined),\n                    isAlready ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"text-center font-patrick tracking-wide \",\n                        children: \"Click the start button (mushroom) to start!\"\n                    }, void 0, false, {\n                        fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/components/lobby.tsx\",\n                        lineNumber: 80,\n                        columnNumber: 13\n                    }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"text-center font-patrick tracking-wide\",\n                        children: \"Click your mushroom when you're ready!\"\n                    }, void 0, false, {\n                        fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/components/lobby.tsx\",\n                        lineNumber: 84,\n                        columnNumber: 13\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"  flex flex-col relative  mt-[7rem] items-center h-screen\",\n                        children: [\n                            isAlready && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                        width: 130,\n                                        alt: \"All ready shroom\",\n                                        src: _components_images_images__WEBPACK_IMPORTED_MODULE_2__.startButton,\n                                        className: \"z-10 absolute -mt-[6rem] mr-1\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/components/lobby.tsx\",\n                                        lineNumber: 91,\n                                        columnNumber: 17\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"z-10 absolute text-white font-pressStart text-3xl -mt-[4rem]\",\n                                        children: \"START\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/components/lobby.tsx\",\n                                        lineNumber: 98,\n                                        columnNumber: 17\n                                    }, undefined)\n                                ]\n                            }, void 0, true),\n                            players.map((p, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"-my-3\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                            src: p.ready ? _components_images_images__WEBPACK_IMPORTED_MODULE_2__.readyMush : _components_images_images__WEBPACK_IMPORTED_MODULE_2__.mush2,\n                                            width: 80,\n                                            alt: \"player mushrooms!\",\n                                            className: index % 2 == 0 ? \"z-10 absolute drop-shadow-lg cursor-pointer ml-[2.3rem] \" : \"absolute scale-x-[-1] drop-shadow-lg -ml-[3.5rem] cursor-pointer\",\n                                            onClick: player.name == p.name ? (e)=>readyHandler(e, p.name) : undefined\n                                        }, void 0, false, {\n                                            fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/components/lobby.tsx\",\n                                            lineNumber: 105,\n                                            columnNumber: 17\n                                        }, undefined),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                            className: index % 2 == 0 ? \"font-patrick tracking-wide absolute\" : \"font-patrick tracking-wide absolute\",\n                                            style: {\n                                                marginLeft: index % 2 == 0 ? 120 : -60 - 8 * p.name.length\n                                            },\n                                            children: p.name\n                                        }, void 0, false, {\n                                            fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/components/lobby.tsx\",\n                                            lineNumber: 120,\n                                            columnNumber: 17\n                                        }, undefined),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                            src: _components_images_images__WEBPACK_IMPORTED_MODULE_2__.vLog,\n                                            alt: \"Vertical log\",\n                                            width: 60,\n                                            className: \"drop-shadow-lg \"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/components/lobby.tsx\",\n                                            lineNumber: 132,\n                                            columnNumber: 17\n                                        }, undefined)\n                                    ]\n                                }, index, true, {\n                                    fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/components/lobby.tsx\",\n                                    lineNumber: 104,\n                                    columnNumber: 15\n                                }, undefined)),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                src: _components_images_images__WEBPACK_IMPORTED_MODULE_2__.vLog,\n                                alt: \"Vertical log\",\n                                width: 60,\n                                className: \" drop-shadow-lg \"\n                            }, void 0, false, {\n                                fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/components/lobby.tsx\",\n                                lineNumber: 140,\n                                columnNumber: 13\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                onMouseOver: ()=>setOver(true),\n                                onMouseLeave: ()=>setOver(false),\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                    src: over || onLeave ? _components_images_images__WEBPACK_IMPORTED_MODULE_2__.doorOpen : _components_images_images__WEBPACK_IMPORTED_MODULE_2__.doorClose,\n                                    alt: \"Door\",\n                                    width: 45,\n                                    className: \"relative -mt-[4.75rem] drop-shadow-lg cursor-pointer \",\n                                    onClick: onLeaveHandler\n                                }, void 0, false, {\n                                    fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/components/lobby.tsx\",\n                                    lineNumber: 151,\n                                    columnNumber: 15\n                                }, undefined)\n                            }, void 0, false, {\n                                fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/components/lobby.tsx\",\n                                lineNumber: 147,\n                                columnNumber: 13\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/leeweihan/Documents/personal/shitake/shitake-client/components/lobby.tsx\",\n                        lineNumber: 88,\n                        columnNumber: 11\n                    }, undefined)\n                ]\n            }, void 0, true)\n        ]\n    }, void 0, true);\n};\n_s(Lobby, \"lDKxBct8fCFVfgHhufbX/l/itJE=\");\n_c = Lobby;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Lobby);\nvar _c;\n$RefreshReg$(_c, \"Lobby\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUk7Z0NBQ0pDLE9BQU87Z0NBQ1BQLFdBQVU7Ozs7OzswQ0FHWiw4REFBQ0Q7Z0NBQ0N1QixhQUFhLElBQU1oQyxRQUFRO2dDQUMzQmlDLGNBQWMsSUFBTWpDLFFBQVE7MENBRTVCLDRFQUFDWCxtREFBS0E7b0NBQ0p3QixLQUFLZCxRQUFRRSxVQUFVWCwrREFBZSxHQUFHQSxnRUFBZ0I7b0NBQ3pEMEIsS0FBSTtvQ0FDSkMsT0FBTztvQ0FDUFAsV0FBVTtvQ0FDVkUsU0FBU1A7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVF6QjtHQXBKTVo7S0FBQUE7QUFzSk4sK0RBQWVBLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9sb2JieS50c3g/Y2Y2NiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW1hZ2UgZnJvbSBcIm5leHQvaW1hZ2VcIjtcbmltcG9ydCAqIGFzIGltYWdlcyBmcm9tIFwiQC9jb21wb25lbnRzL2ltYWdlcy9pbWFnZXNcIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCJAL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQgeyBQbGF5ZXIsIFBsYXllckRpc3BsYXksIFJvb20gfSBmcm9tIFwiQC9zdHJ1Y3RzL3N0cnVjdHNcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgcGxheWVyOiBQbGF5ZXI7XG4gIHJvb21EYXRhOiBSb29tO1xuICByZWFkeUhhbmRsZXI6IChlOiBSZWFjdC5TeW50aGV0aWNFdmVudCwgbmFtZTogc3RyaW5nKSA9PiB2b2lkO1xuICBsZWF2ZVJvb21IYW5kbGVyOiAoZTogUmVhY3QuU3ludGhldGljRXZlbnQpID0+IHZvaWQ7XG4gIGlzQWxyZWFkeTogYm9vbGVhbjtcbn07XG5cbmNvbnN0IExvYmJ5ID0gKHtcbiAgcGxheWVyLFxuICByb29tRGF0YSxcbiAgcmVhZHlIYW5kbGVyLFxuICBsZWF2ZVJvb21IYW5kbGVyLFxuICBpc0FscmVhZHksXG59OiBQcm9wcykgPT4ge1xuICBjb25zdCBbb3Zlciwgc2V0T3Zlcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtvbkxlYXZlLCBzZXRPbkxlYXZlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgcGxheWVycyA9IHV0aWxzLlNvcnRQbGF5ZXJzKHJvb21EYXRhLnBsYXllcnMpO1xuXG4gIGNvbnN0IG9uTGVhdmVIYW5kbGVyID0gKGU6IFJlYWN0LlN5bnRoZXRpY0V2ZW50KSA9PiB7XG4gICAgaWYgKCFvbkxlYXZlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBzZXRPbkxlYXZlKHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBub3RMZWF2ZUhhbmRsZXIgPSAoZTogUmVhY3QuU3ludGhldGljRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgc2V0T25MZWF2ZShmYWxzZSk7XG4gICAgc2V0T3ZlcihmYWxzZSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LXJlZW5pZSB0ZXh0LWNlbnRlciBtdC01XCI+XG4gICAgICAgIFNoaXRha2UgYnkgSGFuLlxuICAgICAgPC9kaXY+XG4gICAgICB7b25MZWF2ZSA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1wYXRyaWNrIHRleHQtMnhsIG15LTIwIHRyYWNraW5nLXdpZGVcIj5cbiAgICAgICAgICAgIExlYXZpbmcgYWxyZWFkeT8g8J+YolxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItMTBcIj5cbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImN1cnNvci1wb2ludGVyIHRleHQtM3hsIGZvbnQtcGF0cmljayB0cmFja2luZy13aWRlXCJcbiAgICAgICAgICAgICAgb25DbGljaz17bGVhdmVSb29tSGFuZGxlcn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgWUVTXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBmb250LXBhdHJpY2sgdHJhY2tpbmctd2lkZSBteC0xMFwiPnw8L3NwYW4+XG4gICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjdXJzb3ItcG9pbnRlciB0ZXh0LTN4bCBmb250LXBhdHJpY2sgdHJhY2tpbmctd2lkZVwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e25vdExlYXZlSGFuZGxlcn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgTk97XCIgXCJ9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8SW1hZ2VcbiAgICAgICAgICAgIHNyYz17b3ZlciB8fCBvbkxlYXZlID8gaW1hZ2VzLmRvb3JPcGVuIDogaW1hZ2VzLmRvb3JDbG9zZX1cbiAgICAgICAgICAgIGFsdD1cIkRvb3JcIlxuICAgICAgICAgICAgd2lkdGg9ezQ1fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiICBkcm9wLXNoYWRvdy1sZyAgXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e29uTGVhdmVIYW5kbGVyfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IChcbiAgICAgICAgPD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtN3hsIHBsLTcgcHktMTAgdGV4dC1jZW50ZXIgZm9udC1wYXRyaWNrIHRyYWNraW5nLXN1cGVyV2lkZVwiPlxuICAgICAgICAgICAge3Jvb21EYXRhLmlkfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtpc0FscmVhZHkgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIGZvbnQtcGF0cmljayB0cmFja2luZy13aWRlIFwiPlxuICAgICAgICAgICAgICBDbGljayB0aGUgc3RhcnQgYnV0dG9uIChtdXNocm9vbSkgdG8gc3RhcnQhXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBmb250LXBhdHJpY2sgdHJhY2tpbmctd2lkZVwiPlxuICAgICAgICAgICAgICBDbGljayB5b3VyIG11c2hyb29tIHdoZW4geW91J3JlIHJlYWR5IVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIiAgZmxleCBmbGV4LWNvbCByZWxhdGl2ZSAgbXQtWzdyZW1dIGl0ZW1zLWNlbnRlciBoLXNjcmVlblwiPlxuICAgICAgICAgICAge2lzQWxyZWFkeSAmJiAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgPEltYWdlXG4gICAgICAgICAgICAgICAgICB3aWR0aD17MTMwfVxuICAgICAgICAgICAgICAgICAgYWx0PVwiQWxsIHJlYWR5IHNocm9vbVwiXG4gICAgICAgICAgICAgICAgICBzcmM9e2ltYWdlcy5zdGFydEJ1dHRvbn1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInotMTAgYWJzb2x1dGUgLW10LVs2cmVtXSBtci0xXCJcbiAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ6LTEwIGFic29sdXRlIHRleHQtd2hpdGUgZm9udC1wcmVzc1N0YXJ0IHRleHQtM3hsIC1tdC1bNHJlbV1cIj5cbiAgICAgICAgICAgICAgICAgIFNUQVJUXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtwbGF5ZXJzLm1hcCgocDogUGxheWVyRGlzcGxheSwgaW5kZXg6IG51bWJlcikgPT4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17aW5kZXh9IGNsYXNzTmFtZT1cIi1teS0zXCI+XG4gICAgICAgICAgICAgICAgPEltYWdlXG4gICAgICAgICAgICAgICAgICBzcmM9e3AucmVhZHkgPyBpbWFnZXMucmVhZHlNdXNoIDogaW1hZ2VzLm11c2gyfVxuICAgICAgICAgICAgICAgICAgd2lkdGg9ezgwfVxuICAgICAgICAgICAgICAgICAgYWx0PVwicGxheWVyIG11c2hyb29tcyFcIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggJSAyID09IDBcbiAgICAgICAgICAgICAgICAgICAgICA/IFwiei0xMCBhYnNvbHV0ZSBkcm9wLXNoYWRvdy1sZyBjdXJzb3ItcG9pbnRlciBtbC1bMi4zcmVtXSBcIlxuICAgICAgICAgICAgICAgICAgICAgIDogXCJhYnNvbHV0ZSBzY2FsZS14LVstMV0gZHJvcC1zaGFkb3ctbGcgLW1sLVszLjVyZW1dIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIubmFtZSA9PSBwLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICA/IChlKSA9PiByZWFkeUhhbmRsZXIoZSwgcC5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggJSAyID09IDBcbiAgICAgICAgICAgICAgICAgICAgICA/IFwiZm9udC1wYXRyaWNrIHRyYWNraW5nLXdpZGUgYWJzb2x1dGVcIlxuICAgICAgICAgICAgICAgICAgICAgIDogXCJmb250LXBhdHJpY2sgdHJhY2tpbmctd2lkZSBhYnNvbHV0ZVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBtYXJnaW5MZWZ0OiBpbmRleCAlIDIgPT0gMCA/IDEyMCA6IC02MCAtIDggKiBwLm5hbWUubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7cC5uYW1lfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8SW1hZ2VcbiAgICAgICAgICAgICAgICAgIHNyYz17aW1hZ2VzLnZMb2d9XG4gICAgICAgICAgICAgICAgICBhbHQ9XCJWZXJ0aWNhbCBsb2dcIlxuICAgICAgICAgICAgICAgICAgd2lkdGg9ezYwfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZHJvcC1zaGFkb3ctbGcgXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPEltYWdlXG4gICAgICAgICAgICAgIHNyYz17aW1hZ2VzLnZMb2d9XG4gICAgICAgICAgICAgIGFsdD1cIlZlcnRpY2FsIGxvZ1wiXG4gICAgICAgICAgICAgIHdpZHRoPXs2MH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiIGRyb3Atc2hhZG93LWxnIFwiXG4gICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIG9uTW91c2VPdmVyPXsoKSA9PiBzZXRPdmVyKHRydWUpfVxuICAgICAgICAgICAgICBvbk1vdXNlTGVhdmU9eygpID0+IHNldE92ZXIoZmFsc2UpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8SW1hZ2VcbiAgICAgICAgICAgICAgICBzcmM9e292ZXIgfHwgb25MZWF2ZSA/IGltYWdlcy5kb29yT3BlbiA6IGltYWdlcy5kb29yQ2xvc2V9XG4gICAgICAgICAgICAgICAgYWx0PVwiRG9vclwiXG4gICAgICAgICAgICAgICAgd2lkdGg9ezQ1fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIC1tdC1bNC43NXJlbV0gZHJvcC1zaGFkb3ctbGcgY3Vyc29yLXBvaW50ZXIgXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtvbkxlYXZlSGFuZGxlcn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8Lz5cbiAgICAgICl9XG4gICAgPC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMb2JieTtcbiJdLCJuYW1lcyI6WyJJbWFnZSIsImltYWdlcyIsInV0aWxzIiwidXNlU3RhdGUiLCJMb2JieSIsInBsYXllciIsInJvb21EYXRhIiwicmVhZHlIYW5kbGVyIiwibGVhdmVSb29tSGFuZGxlciIsImlzQWxyZWFkeSIsIm92ZXIiLCJzZXRPdmVyIiwib25MZWF2ZSIsInNldE9uTGVhdmUiLCJwbGF5ZXJzIiwiU29ydFBsYXllcnMiLCJvbkxlYXZlSGFuZGxlciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIm5vdExlYXZlSGFuZGxlciIsImRpdiIsImNsYXNzTmFtZSIsInNwYW4iLCJvbkNsaWNrIiwic3JjIiwiZG9vck9wZW4iLCJkb29yQ2xvc2UiLCJhbHQiLCJ3aWR0aCIsImlkIiwic3RhcnRCdXR0b24iLCJtYXAiLCJwIiwiaW5kZXgiLCJyZWFkeSIsInJlYWR5TXVzaCIsIm11c2gyIiwibmFtZSIsInVuZGVmaW5lZCIsInN0eWxlIiwibWFyZ2luTGVmdCIsImxlbmd0aCIsInZMb2ciLCJvbk1vdXNlT3ZlciIsIm9uTW91c2VMZWF2ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/lobby.tsx\n"));

/***/ })

});