// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"calculator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Calculator = /*#__PURE__*/function () {
  function Calculator(calcContainer, keys, display) {
    _classCallCheck(this, Calculator);

    this.calculator = calcContainer;
    this.keys = keys;
    this.display = display;
  }

  _createClass(Calculator, [{
    key: "build",
    value: function build() {
      var _this = this;

      // add an event listener to the calculator element
      this.keys.addEventListener("click", function (e) {
        if (e.target.matches("button")) {
          // a calculator button was clicked. Perform action
          _this.buttonClicked(e.target);
        }
      });
    }
  }, {
    key: "buttonClicked",
    value: function buttonClicked(target) {
      // get the button clicked
      var key = target; // get the data-action value of the button (if there is one: clear / divide / multiply / subtract / add / calculate)

      var action = key.dataset.action; // get the value of the button clicked

      var keyContent = key.textContent; // get the value of the display element

      var displayedNum = this.display.textContent; // get the type of the previous button clicked

      var previousKeyType = this.calculator.dataset.previousKeyType; // perform action if button clicked is a numeral 0 - 9

      if (!action) {
        this.numberInput(keyContent, displayedNum, previousKeyType);
      } // perform action negative / positive toggle if clicked


      if (action === "negative") {
        // if displayed number is negative, change to positive
        if (displayedNum < 0) {
          this.display.textContent = Math.abs(displayedNum);
        } else {
          // if displayed number is positive, change to negative
          this.display.textContent = -Math.abs(displayedNum);
        }
      } // change number to percentage if percentage button is clicked


      if (action === "percentage") {
        this.display.textContent = displayedNum * 0.01;
      } // perform action if button clicked is a decimal point


      if (action === "decimal") {
        this.decimalInput(displayedNum, previousKeyType);
      } // perform action if button clicked is an operator (plus / minus / multiply / divide)


      if (action === "add" || action === "subtract" || action === "multiply" || action === "divide") {
        this.operatorInput(displayedNum, previousKeyType, action);
      } // perform action if button clicked is clear


      if (action === "clear") {
        this.clearInput(key);
      } // if button clicked was not clear, change "AC" to "CE" ("clear all to clear current")


      if (action !== "clear") {
        var clearButton = this.calculator.querySelector("[data-action=clear]");
        clearButton.textContent = "CE";
      } // perform calculation if button clicked is equals


      if (action === "calculate") {
        this.equalsInput(displayedNum, previousKeyType);
      }
    } // function that deals with the click of a number button

  }, {
    key: "numberInput",
    value: function numberInput(keyContent, displayedNum, previousKeyType) {
      if (displayedNum === "0" || previousKeyType === "operator" || previousKeyType === "calculate") {
        // display button value directly on screen if it is the first number (i.e. display is zero)
        // or the previous button clicked was an operator or equals
        this.display.textContent = keyContent;
      } else {
        // concatenate the button value onto the displayed number string if previous button clicked was also a number
        this.display.textContent = displayedNum + keyContent;
      }

      this.calculator.dataset.previousKeyType = "number";
    } // function that deals with the click of the decimal button

  }, {
    key: "decimalInput",
    value: function decimalInput(displayedNum, previousKeyType) {
      if (!displayedNum.includes(".")) {
        // only add a decimal point to the display string if it hasn't been added already
        this.display.textContent = displayedNum + ".";
      } else if (previousKeyType === "operator" || previousKeyType === "calculate") {
        // display "0." if the previous button clicked wasn't a number (e.g. operator button)
        this.display.textContent = "0.";
      }

      this.calculator.dataset.previousKeyType = "decimal";
    } // function that deals with the click of an operator button (+/-/x/÷).

  }, {
    key: "operatorInput",
    value: function operatorInput(displayedNum, previousKeyType, action) {
      var firstValue = this.calculator.dataset.firstValue;
      var operator = this.calculator.dataset.operator;
      var secondValue = displayedNum;

      if (firstValue && operator && previousKeyType !== "operator" && previousKeyType !== "calculate") {
        // perform a calculation if a previous value ("value one") and operator have already been pressed & stored,
        // and if the previous button clicked ("value two") wasn't already an operator or equals button
        var calcValue = this.calculate(firstValue, operator, secondValue); // display the calculation result

        this.display.textContent = calcValue; // set "value one" to the calculation result

        this.calculator.dataset.firstValue = calcValue;
      } else {
        // first value ("value one") does not exist yet. Save the displayed value into "value one" holder.
        this.calculator.dataset.firstValue = displayedNum;
      }

      this.calculator.dataset.previousKeyType = "operator"; // store the operator type into the "operator" holder

      this.calculator.dataset.operator = action;
    } // function that deals with the click of the clear (AC / CE) button

  }, {
    key: "clearInput",
    value: function clearInput(key) {
      if (key.textContent === "AC") {
        // "AC" was clicked, clear all stored values
        this.calculator.dataset.firstValue = "";
        this.calculator.dataset.operator = "";
        this.calculator.dataset.previousKeyType = "";
      } else {
        // change "CE" (clear current) to "AC" (clear all stored)
        key.textContent = "AC";
      } // clear the current display ("CE")


      this.display.textContent = 0;
      this.calculator.dataset.previousKeyType = "clear";
    } // function that deals with the click of the equals (=) button

  }, {
    key: "equalsInput",
    value: function equalsInput(displayedNum, previousKeyType) {
      var firstValue = this.calculator.dataset.firstValue;
      var operator = this.calculator.dataset.operator;
      var secondValue = displayedNum; // check to see if first value ("value one") exists.
      // get first value from the first value store and second value from the screen
      // get operator type from the operator store

      if (firstValue) {
        // only perform a calculation if previous button pressed wasn't already an equals button
        if (previousKeyType !== "calculate") {
          this.display.textContent = this.calculate(firstValue, operator, secondValue);
        }
      }

      this.calculator.dataset.previousKeyType = "calculate";
    } // function to perform calculation, takes two values & operator as input and returns the calculated value

  }, {
    key: "calculate",
    value: function calculate(n1, operator, n2) {
      var firstNum = parseFloat(n1);
      var secondNum = parseFloat(n2);

      switch (operator) {
        case "add":
          return firstNum + secondNum;

        case "subtract":
          return firstNum - secondNum;

        case "multiply":
          return firstNum * secondNum;

        case "divide":
          return firstNum / secondNum;

        default: // throw new Error("Invalid operator");

      }
    }
  }]);

  return Calculator;
}();

exports.default = Calculator;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _calculator = _interopRequireDefault(require("./calculator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var calcContainer = document.querySelector(".calculator");
var keys = (void 0).calculator.querySelector(".calculator__keys");
var display = (void 0).calculator.querySelector(".calculator__display");
var myCalculator = new _calculator.default(calcContainer, keys, display);
myCalculator.build();
},{"./calculator.js":"calculator.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "6909" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/Simple-Calculator.e31bb0bc.js.map