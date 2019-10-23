webpackJsonp([2,0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends2 = __webpack_require__(6);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	__webpack_require__(315);
	
	__webpack_require__(253);
	
	__webpack_require__(254);
	
	__webpack_require__(60);
	
	var _vue = __webpack_require__(26);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _moment = __webpack_require__(1);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _store = __webpack_require__(38);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _vuex = __webpack_require__(2);
	
	var _routes = __webpack_require__(250);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _mainNav = __webpack_require__(385);
	
	var _mainNav2 = _interopRequireDefault(_mainNav);
	
	var _bottomNav = __webpack_require__(380);
	
	var _bottomNav2 = _interopRequireDefault(_bottomNav);
	
	var _modalFeeling = __webpack_require__(386);
	
	var _modalFeeling2 = _interopRequireDefault(_modalFeeling);
	
	var _toastr = __webpack_require__(25);
	
	var _toastr2 = _interopRequireDefault(_toastr);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	if (false) {
	  _vue2.default.http.options.root = 'http://localhost:3003';
	} else {
	  console.log('env: ', ("production"));
	  _vue2.default.http.options.root = 'https://feelmymeal.herokuapp.com/';
	}
	
	var app = new _vue2.default({
	  router: _routes2.default,
	  store: _store2.default,
	  moment: _moment2.default,
	
	  components: {
	    MainNav: _mainNav2.default,
	    BottomNav: _bottomNav2.default,
	    ModalFeeling: _modalFeeling2.default
	  },
	  data: {
	    showModal: false
	  },
	  computed: (0, _extends3.default)({}, (0, _vuex.mapGetters)({
	    isLoggedIn: 'isLoggedIn'
	  })),
	  mounted: function mounted() {
	    var path =  false ? 'http://localhost:8080/add-feeling#/' : 'https://coding-academy.net/feelmymeal/#/add-feeling';
	    if (window.location.href === path) this.showModal = true;
	  }
	}).$mount('#app');

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stringify = __webpack_require__(27);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _vue = __webpack_require__(26);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function signin(_ref) {
	  var email = _ref.email,
	      password = _ref.password;
	
	  return _vue2.default.http.post('login', { username: email, pass: password }).then(function (res) {
	    return res.json();
	  }).then(function (_ref2) {
	    var token = _ref2.token,
	        user = _ref2.user;
	
	    setSession(token, user);
	    return user;
	  });
	}
	
	function signup(_ref3) {
	  var username = _ref3.email,
	      pass = _ref3.password;
	
	  return _vue2.default.http.post('signup', { username: username, pass: pass, settings: { pushTimer: 4, lang: null } }).then(function (res) {
	    return res.json();
	  }).then(function (user) {
	    return user;
	  }).catch(function (err) {
	    console.warn('stat: ', err.status);
	    return err.json();
	  }).then(function (res) {
	    console.warn('err: ', res.error);
	  });
	}
	
	function setSession(token, user) {
	  localStorage.setItem('token', token);
	  localStorage.setItem('user', (0, _stringify2.default)(user));
	}
	
	function signout() {
	  localStorage.removeItem('token');
	  localStorage.removeItem('user');
	}
	
	function isLoggedIn() {
	  return !!localStorage.getItem('token');
	}
	
	function saveSettings(_ref4) {
	  var settings = _ref4.settings,
	      _id = _ref4._id;
	
	  return _vue2.default.http.put('data/user', { settings: settings, _id: _id }).then(function (res) {
	    return res.json();
	  }).then(function (user) {
	    return user;
	  });
	}
	
	function protectRoute(next) {
	  if (isLoggedIn()) {
	    next();
	  } else {
	    next(false);
	  }
	}
	
	function redirectToSignin(next) {
	  if (isLoggedIn()) {
	    next();
	  } else {
	    next({ name: 'signin' });
	  }
	}
	
	exports.default = {
	  signin: signin,
	  signup: signup,
	  signout: signout,
	  setSession: setSession,
	  isLoggedIn: isLoggedIn,
	  protectRoute: protectRoute,
	  redirectToSignin: redirectToSignin,
	  saveSettings: saveSettings
	};

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SAVE_SETTINGS_ERR = exports.SAVE_SETTINGS = exports.SAVING_SETTINGS = exports.SIGN_OUT = exports.SIGN_IN = undefined;
	
	var _defineProperty2 = __webpack_require__(28);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _stringify = __webpack_require__(27);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _mutations;
	
	var _store = __webpack_require__(38);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _auth = __webpack_require__(12);
	
	var _auth2 = _interopRequireDefault(_auth);
	
	var _toastr = __webpack_require__(25);
	
	var _toastr2 = _interopRequireDefault(_toastr);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SIGN_IN = exports.SIGN_IN = 'auth/SIGN_IN';
	var SIGN_OUT = exports.SIGN_OUT = 'auth/SIGN_OUT';
	var SAVING_SETTINGS = exports.SAVING_SETTINGS = 'auth/SAVING_SETTINGS';
	var SAVE_SETTINGS = exports.SAVE_SETTINGS = 'auth/SAVE_SETTINGS';
	var SAVE_SETTINGS_ERR = exports.SAVE_SETTINGS_ERR = 'auth/SAVE_SETTINGS_ERR';
	
	var state = {
	  isLoggedIn: !!localStorage.getItem('token'),
	  user: JSON.parse(localStorage.getItem('user')),
	  isLoadingSettings: false
	};
	
	var mutations = (_mutations = {}, (0, _defineProperty3.default)(_mutations, SIGN_IN, function (state, user) {
	  state.isLoggedIn = true;
	  state.user = user;
	}), (0, _defineProperty3.default)(_mutations, SIGN_OUT, function (state) {
	  state.isLoggedIn = false;
	}), (0, _defineProperty3.default)(_mutations, SAVING_SETTINGS, function (state) {
	  state.isLoadingSettings = true;
	}), (0, _defineProperty3.default)(_mutations, SAVE_SETTINGS, function (state, _ref) {
	  var settings = _ref.settings;
	
	  state.user.settings = { pushTimer: settings.pushTimer, lang: settings.lang };
	  state.isLoadingSettings = !state.isLoadingSettings;
	  _toastr2.default.options.closeButton = true;
	  _toastr2.default.success('Your settings were set!');
	  localStorage.setItem('user', (0, _stringify2.default)(state.user));
	}), (0, _defineProperty3.default)(_mutations, SAVE_SETTINGS_ERR, function (state, error) {
	  state.error = error;
	  state.isLoadingSettings = !state.isLoadingSettings;
	  _toastr2.default.options.closeButton = true;
	  _toastr2.default.error('OOPS.. there was a problem with submmiting your settings');
	}), _mutations);
	
	var actions = {
	  saveSettings: function saveSettings(_ref2, updatedUser) {
	    var commit = _ref2.commit,
	        state = _ref2.state;
	
	    commit(SAVING_SETTINGS);
	    _auth2.default.saveSettings(updatedUser).then(function (updatedUser) {
	      commit(SAVE_SETTINGS, updatedUser);
	    }).catch(function (err) {
	      commit(SAVE_SETTINGS_ERR, err);
	    });
	  }
	};
	
	var getters = {
	  isLoggedIn: function isLoggedIn(state) {
	    return state.isLoggedIn;
	  },
	  user: function user(state) {
	    return state.user;
	  },
	  isLoadingSettings: function isLoadingSettings(state) {
	    return state.isLoadingSettings;
	  }
	};
	
	exports.default = {
	  state: state,
	  getters: getters,
	  actions: actions,
	  mutations: mutations
	};

/***/ }),
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _vuex = __webpack_require__(2);
	
	var _vuex2 = _interopRequireDefault(_vuex);
	
	var _auth = __webpack_require__(19);
	
	var _auth2 = _interopRequireDefault(_auth);
	
	var _meal = __webpack_require__(59);
	
	var _meal2 = _interopRequireDefault(_meal);
	
	var _feeling = __webpack_require__(58);
	
	var _feeling2 = _interopRequireDefault(_feeling);
	
	var _chat = __webpack_require__(57);
	
	var _chat2 = _interopRequireDefault(_chat);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var isProduction = ("production") === 'production';
	
	exports.default = new _vuex2.default.Store({
	  modules: {
	    auth: _auth2.default,
	    meal: _meal2.default,
	    feeling: _feeling2.default,
	    chat: _chat2.default
	  },
	  strict: !isProduction
	});

/***/ }),
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.GET_HIGHER = undefined;
	
	var _defineProperty2 = __webpack_require__(28);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _store = __webpack_require__(38);
	
	var _store2 = _interopRequireDefault(_store);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var GET_HIGHER = exports.GET_HIGHER = 'chat/GET_HIGHER';
	
	var state = {
	  shouldGetHigher: false
	};
	
	var mutations = (0, _defineProperty3.default)({}, GET_HIGHER, function (state) {
	  state.shouldGetHigher = !state.shouldGetHigher;
	});
	var getters = {
	  shouldGetHigher: function shouldGetHigher(state) {
	    return state.shouldGetHigher;
	  }
	};
	
	exports.default = {
	  state: state,
	  getters: getters,
	  mutations: mutations
	};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CLEAR_FEELINGS_CACHE = exports.GET_FEELINGS_BY_USER_ERROR = exports.GET_FEELINGS_BY_USER_SUCCESS = exports.GET_FEELINGS_BY_USER = exports.ADDING_FEELING_ERR = exports.ADDING_FEELING = exports.ADD_FEELING = undefined;
	
	var _defineProperty2 = __webpack_require__(28);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _mutations;
	
	var _feeling = __webpack_require__(251);
	
	var _feeling2 = _interopRequireDefault(_feeling);
	
	var _vuex = __webpack_require__(2);
	
	var _toastr = __webpack_require__(25);
	
	var _toastr2 = _interopRequireDefault(_toastr);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ADD_FEELING = exports.ADD_FEELING = 'feeling/ADD_FEELING';
	var ADDING_FEELING = exports.ADDING_FEELING = 'feeling/ADDING_FEELING';
	var ADDING_FEELING_ERR = exports.ADDING_FEELING_ERR = 'feeling/ADDING_FEELING_ERR';
	var GET_FEELINGS_BY_USER = exports.GET_FEELINGS_BY_USER = 'feeling/GET_FEELINGS_BY_USER';
	var GET_FEELINGS_BY_USER_SUCCESS = exports.GET_FEELINGS_BY_USER_SUCCESS = 'feeling/GET_FEELINGS_BY_USER_SUCCESS';
	var GET_FEELINGS_BY_USER_ERROR = exports.GET_FEELINGS_BY_USER_ERROR = 'feeling/GET_FEELINGS_BY_USER_ERROR';
	var CLEAR_FEELINGS_CACHE = exports.CLEAR_FEELINGS_CACHE = 'feeling/CLEAR_FEELINGS_CACHE';
	
	var state = {
	  feelings: [],
	  currFeeling: {},
	  isloadingFeeling: false,
	  loading: false,
	  error: null
	};
	
	var mutations = (_mutations = {}, (0, _defineProperty3.default)(_mutations, ADDING_FEELING, function (state, feeling) {
	  _toastr2.default.options.closeButton = true;
	  _toastr2.default.success('Great! Your feeling was added!');
	  state.currFeeling = feeling;
	  state.feelings.push(feeling);
	  state.isloadingFeeling = !state.isloadingFeeling;
	}), (0, _defineProperty3.default)(_mutations, ADDING_FEELING_ERR, function (state, error) {
	  _toastr2.default.options.closeButton = true;
	  _toastr2.default.error('There was a problem to add a feeling.');
	  state.error = error;
	  state.isloadingFeeling = !state.isloadingFeeling;
	}), (0, _defineProperty3.default)(_mutations, GET_FEELINGS_BY_USER, function (state) {
	  state.loading = true;
	}), (0, _defineProperty3.default)(_mutations, GET_FEELINGS_BY_USER_SUCCESS, function (state, feelings) {
	  state.feelings = feelings;
	  state.loading = false;
	}), (0, _defineProperty3.default)(_mutations, GET_FEELINGS_BY_USER_ERROR, function (state, feelings) {
	  state.loading = false;
	}), (0, _defineProperty3.default)(_mutations, CLEAR_FEELINGS_CACHE, function (state) {
	  state.feelings = [];
	}), _mutations);
	
	var actions = {
	  addFeeling: function addFeeling(_ref, feeling) {
	    var commit = _ref.commit,
	        state = _ref.state;
	
	    _feeling2.default.submitFeeling(feeling).then(function (feeling) {
	      commit(ADDING_FEELING, feeling);
	    }).catch(function (err) {
	      commit(ADDING_FEELING_ERR, err);
	    });
	  },
	  getFeelingsByUser: function getFeelingsByUser(_ref2, user) {
	    var commit = _ref2.commit,
	        state = _ref2.state;
	
	    if (state.feelings.length) {
	      commit(GET_FEELINGS_BY_USER_SUCCESS, state.feelings);
	      return state.feelings;
	    }
	    commit(GET_FEELINGS_BY_USER);
	    return _feeling2.default.getFeelingsByUser({ user: user }).then(function (feelings) {
	      commit(GET_FEELINGS_BY_USER_SUCCESS, feelings);
	      return feelings;
	    }).catch(function (err) {
	      commit(GET_FEELINGS_BY_USER_ERROR, err);
	    });
	  }
	};
	
	var getters = {
	  isloadingFeeling: function isloadingFeeling(state) {
	    return state.isloadingFeeling;
	  },
	  feelings: function feelings(state) {
	    return state.feelings;
	  }
	};
	
	var setters = {
	  isloadingFeeling: function isloadingFeeling(state) {
	    return state.isloadingFeeling;
	  },
	  feelings: function feelings(state) {
	    return state.feelings;
	  }
	};
	
	exports.default = {
	  state: state,
	  setters: setters,
	  getters: getters,
	  actions: actions,
	  mutations: mutations
	};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CLEAR_MEALS_CACHE = exports.GET_MEALS_BY_USER_ERROR = exports.GET_MEALS_BY_USER_SUCCESS = exports.GET_MEALS_BY_USER = exports.ADDING_MEAL_ERR = exports.ADDING_MEAL = exports.ADD_MEAL = undefined;
	
	var _defineProperty2 = __webpack_require__(28);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _mutations;
	
	var _toastr = __webpack_require__(25);
	
	var _toastr2 = _interopRequireDefault(_toastr);
	
	var _meal = __webpack_require__(252);
	
	var _meal2 = _interopRequireDefault(_meal);
	
	var _vuex = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ADD_MEAL = exports.ADD_MEAL = 'meal/ADD_MEAL';
	var ADDING_MEAL = exports.ADDING_MEAL = 'meal/ADDING_MEAL';
	var ADDING_MEAL_ERR = exports.ADDING_MEAL_ERR = 'meal/ADDING_MEAL_ERR';
	var GET_MEALS_BY_USER = exports.GET_MEALS_BY_USER = 'meal/GET_MEALS_BY_USER';
	var GET_MEALS_BY_USER_SUCCESS = exports.GET_MEALS_BY_USER_SUCCESS = 'meal/GET_MEALS_BY_USER_SUCCESS';
	var GET_MEALS_BY_USER_ERROR = exports.GET_MEALS_BY_USER_ERROR = 'meal/GET_MEALS_BY_USER_ERROR';
	var CLEAR_MEALS_CACHE = exports.CLEAR_MEALS_CACHE = 'meal/CLEAR_MEALS_CACHE';
	
	var state = {
	  latestMeals: [],
	  userId: '',
	  currMeal: {},
	  isloadingMeal: false,
	  loading: false,
	  error: null
	};
	
	var mutations = (_mutations = {}, (0, _defineProperty3.default)(_mutations, ADD_MEAL, function (state) {
	  state.isloadingMeal = true;
	}), (0, _defineProperty3.default)(_mutations, ADDING_MEAL, function (state, meal) {
	  _toastr2.default.options.closeButton = true;
	  _toastr2.default.success('Great! Your meal was added!');
	  state.currMeal = meal;
	  state.latestMeals.push(meal);
	  state.isloadingMeal = !state.isloadingMeal;
	}), (0, _defineProperty3.default)(_mutations, ADDING_MEAL_ERR, function (state, error) {
	  _toastr2.default.options.closeButton = true;
	  _toastr2.default.error('There was a problem to add a meal');
	  state.error = error;
	  state.isloadingMeal = !state.isloadingMeal;
	}), (0, _defineProperty3.default)(_mutations, GET_MEALS_BY_USER, function (state) {
	  state.loading = true;
	}), (0, _defineProperty3.default)(_mutations, GET_MEALS_BY_USER_SUCCESS, function (state, latestMeals) {
	  state.latestMeals = latestMeals;
	  state.loading = false;
	}), (0, _defineProperty3.default)(_mutations, GET_MEALS_BY_USER_ERROR, function (state, latestMeals) {
	  state.loading = false;
	}), (0, _defineProperty3.default)(_mutations, CLEAR_MEALS_CACHE, function (state) {
	  state.latestMeals = [];
	}), _mutations);
	
	var actions = {
	  addMeal: function addMeal(_ref, meal) {
	    var commit = _ref.commit,
	        state = _ref.state;
	
	    commit(ADD_MEAL);
	    _meal2.default.submitMeal(meal).then(function (meal) {
	      commit(ADDING_MEAL, meal);
	    }).catch(function (err) {
	      commit(ADDING_MEAL_ERR, err);
	    });
	  },
	  getMealsByUser: function getMealsByUser(_ref2, user) {
	    var commit = _ref2.commit,
	        state = _ref2.state;
	
	    if (state.latestMeals.length) {
	      commit(GET_MEALS_BY_USER_SUCCESS, state.latestMeals);
	      return state.latestMeals;
	    }
	    commit(GET_MEALS_BY_USER);
	
	    return _meal2.default.getMealsByUser({ user: user }).then(function (latestMeals) {
	      commit(GET_MEALS_BY_USER_SUCCESS, latestMeals);
	      return latestMeals;
	    }).catch(function (err) {
	      commit(GET_MEALS_BY_USER_ERROR, err);
	    });
	  }
	};
	
	var getters = {
	  isloadingMeal: function isloadingMeal(state) {
	    return state.isloadingMeal;
	  },
	  latestMeals: function latestMeals(state) {
	    return state.latestMeals;
	  }
	};
	
	exports.default = {
	  state: state,
	  getters: getters,
	  actions: actions,
	  mutations: mutations
	};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _stringify = __webpack_require__(27);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var applicationServerPublicKey = 'BP4KYtZJmNVv82CnyXOOAGTuK7CvD5CbjV7V3cOM6PIjXCSMS_5rNVYYGjQ5Nv_CFT6gz-xi8kKVK1nD_PmGiWk';
	var pushButton = document.querySelector('.js-push-btn');
	var isSubscribed = false;
	var swRegistration = null;
	
	function urlB64ToUint8Array(base64String) {
	    var padding = '='.repeat((4 - base64String.length % 4) % 4);
	    var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
	    var rawData = window.atob(base64);
	    var outputArray = new Uint8Array(rawData.length);
	    for (var i = 0; i < rawData.length; ++i) {
	        outputArray[i] = rawData.charCodeAt(i);
	    }
	    return outputArray;
	}
	
	function clickBtn() {
	    console.log('click');
	    console.log('isSubscribed', isSubscribed);
	
	    if (isSubscribed) {} else {
	        subscribeUser();
	    }
	}
	function initialiseUI() {
	    swRegistration.pushManager.getSubscription().then(function (subscription) {
	        isSubscribed = !(subscription === null);
	        if (isSubscribed) {
	            console.log('User IS subscribed.');
	        } else {
	            console.log('User is NOT subscribed.');
	        }
	        updateBtn();
	    });
	}
	function updateBtn() {
	    if (Notification.permission === 'denied') {
	        pushButton.textContent = 'Push Messaging Blocked.';
	        pushButton.disabled = true;
	        updateSubscriptionOnServer(null);
	        return;
	    }
	    if (isSubscribed) {
	        pushButton.textContent = 'Disable Push Messaging';
	    } else {
	        pushButton.textContent = 'Enable Push Messaging';
	    }
	    pushButton.disabled = false;
	}
	
	function subscribeUser() {
	    var applicationSer7verKey = urlB64ToUint8Array(applicationServerPublicKey);
	    swRegistration.pushManager.subscribe({
	        userVisibleOnly: true,
	        applicationServerKey: applicationServerKey
	    }).then(function (subscription) {
	        console.log('User is subscribed:', subscription);
	
	        isSubscribed = true;
	        updateBtn();
	    }).catch(function (err) {
	        console.log('Failed to subscribe the user: ', err);
	        updateBtn();
	    });
	}
	
	function updateSubscriptionOnServer(subscription) {
	    var subscriptionJson = document.querySelector('.js-subscription-json');
	    var subscriptionDetails = document.querySelector('.js-subscription-details');
	    if (subscription) {
	        subscriptionJson.textContent = (0, _stringify2.default)(subscription);
	        subscriptionDetails.classList.remove('is-invisible');
	    } else {
	        subscriptionDetails.classList.add('is-invisible');
	    }
	}
	
	if ('serviceWorker' in navigator && 'PushManager' in window) {
	    navigator.serviceWorker.register('swPush.js').then(function (swReg) {
	        swReg.update();
	        swRegistration = swReg;
	    });
	} else {
	    console.info('Push messaging is not supported');
	}
	
	
	function swActive() {
	    return swRegistration.active;
	}
	
	exports.default = {
	    swActive: swActive
	};

/***/ }),
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/img/logo-sporty.443988c.png";

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/img/microphone.de274bc.png";

/***/ }),
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends2 = __webpack_require__(6);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _vuex = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: 'bottom-nav',
	
	    data: function data() {
	        return {
	            isChangeStyle: false
	        };
	    },
	
	    computed: (0, _extends3.default)({}, (0, _vuex.mapGetters)(['shouldGetHigher'])),
	    watch: {
	        shouldGetHigher: function shouldGetHigher() {
	            this.isChangeStyle = this.shouldGetHigher;
	            console.log('isChangeStyle', this.isChangeStyle);
	        }
	    }
	};

/***/ }),
/* 234 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    name: 'feeling-rating',
	    data: function data() {
	        return {
	            temp_value: null,
	            ratings: 5,
	            value: null,
	            isActive: false
	        };
	    },
	
	    props: {
	        name: String,
	        id: String,
	        disabled: String,
	        required: Boolean
	    },
	    methods: {
	        star_over: function star_over(index) {
	            if (this.disabled == "true") {
	                return;
	            }
	            this.temp_value = this.value;
	            this.value = index;
	        },
	        star_out: function star_out() {
	            if (this.disabled == "true") {
	                return;
	            }
	            this.value = this.temp_value;
	        },
	        set: function set(value) {
	            if (this.d == "true") {
	                return;
	            }
	            this.temp_value = value;
	            this.value = value;
	            this.$emit('submitRating', value);
	        }
	    }
	};

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends2 = __webpack_require__(6);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _vuex = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    props: ['filterTerm'],
	    data: function data() {
	        return {
	            filteredMeals: [],
	            filterInput: ''
	        };
	    },
	
	    methods: {
	        filterByfoods: function filterByfoods(foodName) {
	
	            this.filteredMeals = this.latestMeals.filter(function (meal) {
	                return meal.foods.some(function (food) {
	                    return food.toLowerCase().includes(foodName.toLowerCase());
	                });
	            });
	
	            this.$emit('getMeals', this.filteredMeals);
	        }
	    },
	    computed: (0, _extends3.default)({}, (0, _vuex.mapGetters)(['latestMeals'])),
	    watch: {
	        filterInput: function filterInput() {
	            this.filterByfoods(this.filterInput);
	        }
	    }
	};

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends2 = __webpack_require__(6);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _feelingRating = __webpack_require__(382);
	
	var _feelingRating2 = _interopRequireDefault(_feelingRating);
	
	var _vuex = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: 'modal-feeling',
	    components: {
	        FeelingRating: _feelingRating2.default
	    },
	    data: function data() {
	        return {
	            currRating: 0
	
	        };
	    },
	
	    computed: (0, _extends3.default)({}, (0, _vuex.mapGetters)(['isloadingFeeling', 'user'])),
	    methods: {
	        submitFeeling: function submitFeeling() {
	            if (this.currRating) {
	                this.$store.dispatch('addFeeling', { rating: this.currRating, userId: this.user._id });
	            }
	            this.$emit('close');
	        },
	        selected: function selected(rating) {
	            this.currRating = rating;
	        }
	    }
	};

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _promise = __webpack_require__(61);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _keys = __webpack_require__(258);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _toConsumableArray2 = __webpack_require__(259);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _extends2 = __webpack_require__(6);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _vuex = __webpack_require__(2);
	
	var _loaderPan = __webpack_require__(393);
	
	var _loaderPan2 = _interopRequireDefault(_loaderPan);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var FOUR_HOURS = 14400000;
	
	exports.default = {
	    components: {
	        loaderPan: _loaderPan2.default
	    },
	    data: function data() {
	        return {
	            loadingChart: true,
	            loadingStats: true,
	            stats: {
	                bread: { feelingAvg: 3, popularity: 5 },
	                pizza: { feelingAvg: 1.5, popularity: 10 },
	                tomato: { feelingAvg: 4.5, popularity: 2 }
	            },
	
	            mockRandom: [8, 3, 5, 10, 9,, 6, 1, 7, 8, 9],
	            mockCounter: 1,
	
	
	            chartColumns: [{ type: 'string', label: 'Food' }, { type: 'number', label: '' }, { type: 'number', label: '' }, { type: 'number', label: 'Avarage Feeling' }, { type: 'number', label: 'Popularity' }],
	            options: {
	                height: 400,
	
	                colorAxis: { minValue: 1, maxValue: 5, colors: ['red', 'yellow', 'green'], legend: {} },
	                sizeAxis: { maxSize: 40, minSize: 10 },
	                chartArea: { top: 40, width: '100%', height: '100%' },
	                vAxis: { textPosition: 'none', textStyle: { color: 'white' }, baselineColor: 'white',
	                    ticks: [-2, 12], gridlines: { color: 'white', count: 4 } },
	                hAxis: { textPosition: 'none', textStyle: { color: 'white' }, baselineColor: 'white',
	                    ticks: [0, 6], gridlines: { color: 'white', count: 4 } },
	
	                explorer: { zoomDelta: 1.2 }
	
	            }
	        };
	    },
	    methods: (0, _extends3.default)({}, (0, _vuex.mapActions)(['getFeelingsByUser', 'getMealsByUser']), {
	        relateFeelingsToMeals: function relateFeelingsToMeals(meals, feelings) {
	            var tempFeelings = [].concat((0, _toConsumableArray3.default)(feelings));
	            var relatedData = meals.map(function (meal) {
	                tempFeelings.forEach(function (feeling, idx) {
	                    if (feeling.time >= meal.time && feeling.time - FOUR_HOURS <= meal.time) {
	                        if (!meal.feelingTotal) {
	                            meal.feelingTotal = feeling.rating;
	                            meal.feelingCount = 1;
	                        } else {
	                            meal.feelingTotal += feeling.rating;
	                            meal.feelingCount++;
	                        }
	                    } else if (feeling.time < meal.time) {} else if (feeling.time > meal.time) {}
	                });
	                if (!!meal.feelingCount) meal.feelingAvg = meal.feelingTotal / meal.feelingCount;
	                delete meal.feelingTotal;
	                delete meal.feelingCount;
	                return meal;
	            });
	            return relatedData;
	        },
	        reduceMealsToFoodsObj: function reduceMealsToFoodsObj(meals) {
	            var stats = {};
	            meals.forEach(function (meal) {
	                if (!!meal.feelingAvg) {
	                    meal.foods.forEach(function (food) {
	                        if (!!stats[food]) {
	                            stats[food].feelingAvg += meal.feelingAvg;
	                            stats[food].popularity++;
	                        } else {
	                            stats[food] = {};
	                            stats[food].feelingAvg = meal.feelingAvg;
	                            stats[food].popularity = 1;
	                        }
	                    });
	                }
	            });
	
	            for (var food in stats) {
	                stats[food].feelingAvg = stats[food].feelingAvg / stats[food].popularity;
	            }
	            return stats;
	        }
	    }),
	    computed: (0, _extends3.default)({}, (0, _vuex.mapGetters)(['feelings', 'user', 'currMeal']), {
	        chartEvents: function chartEvents() {
	            var _this = this;
	
	            return {
	                'ready': function ready() {
	                    _this.loadingChart = false;
	                }
	
	            };
	        },
	        chartRows: function chartRows() {
	            var rows = [];
	            for (var food in this.stats) {
	                var temp = [];
	                temp.push(food);
	                temp.push(this.stats[food].feelingAvg);
	                temp.push(this.mockCounter);
	                this.mockCounter++;
	
	                temp.push(this.stats[food].feelingAvg);
	                temp.push(this.stats[food].popularity);
	                rows.push(temp);
	            }
	            return rows;
	        },
	        foodCount: function foodCount() {
	            return (0, _keys2.default)(this.stats).length;
	        }
	    }),
	    mounted: function mounted() {
	        var _this2 = this;
	
	        var PrmFeelingsByUser = this.getFeelingsByUser(this.user);
	        var PrmMealsByUser = this.getMealsByUser(this.user);
	
	        _promise2.default.all([PrmMealsByUser, PrmFeelingsByUser]).then(function (values) {
	            _this2.loadingStats = false;
	            var relatedData = _this2.relateFeelingsToMeals.apply(_this2, (0, _toConsumableArray3.default)(values));
	            _this2.stats = _this2.reduceMealsToFoodsObj(relatedData);
	        });
	    }
	};

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends2 = __webpack_require__(6);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _vuex = __webpack_require__(2);
	
	var _vueRangeSlider = __webpack_require__(412);
	
	var _vueRangeSlider2 = _interopRequireDefault(_vueRangeSlider);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	
	    data: function data() {
	        return {
	            shouldPush: true,
	            sliderValue: 0,
	            lang: null
	        };
	    },
	    components: {
	        RangeSlider: _vueRangeSlider2.default
	    },
	    computed: (0, _extends3.default)({}, (0, _vuex.mapGetters)(['user', 'isLoadingSettings'])),
	    methods: {
	        saveSettings: function saveSettings() {
	            var pushTimer = this.shouldPush ? this.sliderValue : -1;
	            this.$store.dispatch('saveSettings', { settings: { pushTimer: pushTimer, lang: null }, _id: this.user._id });
	        }
	    },
	    mounted: function mounted() {
	        if (this.user.settings.pushTimer === -1) {
	            this.shouldPush = false;
	            this.sliderValue = 4;
	        } else {
	            this.shouldPush = true;
	            this.sliderValue = this.user.settings.pushTimer;
	        }
	    }
	};

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _moment = __webpack_require__(1);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: 'clock-meal',
	    data: function data() {
	        return {
	            timeformat: 'HH : mm : ss',
	            currTime: (0, _moment2.default)(Date.now()).format(this.timeformat),
	            clockTimeout: ''
	        };
	    },
	    created: function created() {
	        var _this = this;
	
	        this.clockTimeout = setInterval(function () {
	            _this.currTime = (0, _moment2.default)(Date.now()).format(_this.timeformat);
	        }, 1000);
	    },
	
	    computed: {
	        updateTime: function updateTime() {
	            return this.currTime;
	        }
	    },
	    destroyed: function destroyed() {
	        clearTimeout(this.clockTimeout);
	    }
	};

/***/ }),
/* 240 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    name: 'loader-pan',
	
	    data: function data() {
	        return {};
	    }
	};

/***/ }),
/* 241 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    name: 'add-contact',
	
	    data: function data() {
	        return {
	            contactDetails: {
	                name: '',
	                email: '',
	                phone: '',
	                msg: ''
	            },
	            shouldShowForm: true
	        };
	    },
	
	    methods: {
	        submitForm: function submitForm(contactDetails) {
	            var _this = this;
	
	            this.$http.post('data/contact', contactDetails).then(function (res) {
	                return res.json();
	            }).then(function (data) {
	                _this.shouldShowForm = false;
	                setTimeout(function () {
	                    _this.shouldShowForm = true;
	                }, 5000);
	            }).catch(function (err) {
	                return console.log('error:', err);
	            });
	        }
	    }
	};

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _stringify = __webpack_require__(27);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _extends2 = __webpack_require__(6);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _vuex = __webpack_require__(2);
	
	var _swInit = __webpack_require__(60);
	
	var _swInit2 = _interopRequireDefault(_swInit);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    data: function data() {
	        return {
	            recognition: {},
	            isRec: false,
	            speechElText: '',
	            foodsData: [],
	            recFb: true,
	            sounds: [new Audio(__webpack_require__(334)), new Audio(__webpack_require__(333))]
	        };
	    },
	
	    computed: (0, _extends3.default)({
	        foods: function foods() {
	            return this.foodsData;
	        }
	    }, (0, _vuex.mapGetters)(['isloadingMeal', 'user', 'settings'])),
	    methods: {
	        startSpeechReco: function startSpeechReco() {
	            if (!this.isRec) {
	                this.isRec = true;
	                this.playSound(0);
	                this.recognition.start();
	            }
	        },
	        stopSpeechReco: function stopSpeechReco() {
	            if (this.isRec && TouchList.length === 0) {
	                this.recognition.stop();
	                this.playSound(1);
	            }
	            this.isRec = false;
	        },
	        playSound: function playSound(i) {
	            var otherNoteIdx = i === 0 ? 1 : 0;
	            this.sounds[otherNoteIdx].pause();
	            this.sounds[otherNoteIdx].currentTime = 0;
	            this.sounds[i].play();
	            window.navigator.vibrate(100);
	        },
	        addFood: function addFood() {
	            this.recognition.stop();
	            if (this.speechElText) {
	                this.foodsData.unshift(this.speechElText);
	                this.speechElText = '';
	            }
	        },
	        deleteFood: function deleteFood(idx) {
	            this.foodsData.splice(idx, 1);
	        },
	        updateFood: function updateFood(idx, event) {
	            this.foodsData[idx] = event.target.innerText;
	        },
	        submitFood: function submitFood() {
	            if (this.foods.length) {
	                this.$store.dispatch('addMeal', { foods: this.foods, userId: this.user._id });
	                if (!(this.user.settings.pushTimer === -1)) this.pushNotification();
	                this.foodsData = [];
	                this.speechElText = '';
	            }
	        },
	        pushNotification: function pushNotification() {
	            var _this = this;
	
	            var redirectUrl =  false ? 'http://localhost:8080/add-feeling' : 'https://coding-academy.net/feelmymeal/#/add-feeling';
	            var pushObj = {
	                foods: this.foods,
	                user: this.user.username,
	                pushTimer: this.user.settings.pushTimer,
	                url: redirectUrl
	            };
	            var pushObjAsStr = (0, _stringify2.default)(pushObj);
	
	            if (!("Notification" in window)) {
	                console.info("This browser does not support system notifications");
	            } else if (Notification.permission === "granted") {
	                if (this.checkSwController()) _swInit2.default.swActive().postMessage(pushObjAsStr);
	            } else if (Notification.permission !== 'denied') {
	                Notification.requestPermission().then(function (res) {
	                    if (res === "granted") {
	                        if (_this.checkSwController()) _swInit2.default.swActive().postMessage(pushObjAsStr);
	                    }
	                });
	            } else {
	                console.info('Push notifications were denied by user');
	            }
	        },
	        checkSwController: function checkSwController() {
	            if (_swInit2.default.swActive()) {
	                return true;
	            } else {
	                setTimeout(function () {
	                    if (_swInit2.default.swActive()) {
	                        return true;
	                    } else {
	                        console.info('There was a problem with enabling Push Notifications on your device. Please try to refresh the page.');
	                        return false;
	                    }
	                }, 3000);
	            }
	        }
	    },
	    mounted: function mounted() {
	        var _this2 = this;
	
	        if (!('webkitSpeechRecognition' in window)) {
	            console.log('webkitSpeechRecognition not supported');
	            this.recFb = true;
	        } else {
	            this.recognition = new webkitSpeechRecognition();
	
	            this.recognition.lang = 'he';
	            this.recognition.interimResults = true;
	
	            this.recognition.onstart = function () {
	                _this2.isRec = true;
	            };
	            this.recognition.onresult = function (event) {
	                var allText = '';
	                for (var currRes in event.results) {
	                    var res = event.results[currRes][0];
	                    if (res) {
	                        allText += ' ' + res.transcript;
	                    }
	                }
	                _this2.speechElText = allText;
	            };
	            this.recognition.onerror = function (event) {
	                console.log('onerror', event);
	                _this2.isRec = false;
	            };
	            this.recognition.onend = function () {
	                _this2.addFood();
	                if (_this2.isRec) _this2.recognition.start();
	            };
	        }
	    }
	};

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _socket = __webpack_require__(219);
	
	var _socket2 = _interopRequireDefault(_socket);
	
	var _chat = __webpack_require__(57);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  name: 'chat',
	  data: function data() {
	    return {
	      socket: null,
	      chatMsgs: [],
	      chatMsg: {
	        nickName: 'Guest',
	        msg: ''
	      }
	    };
	  },
	
	  methods: {
	    sendMsg: function sendMsg() {
	      console.log('Sending: ', this.chatMsg);
	      this.socket.emit('chat message', this.chatMsg);
	
	      this.chatMsg.msg = '';
	    }
	  },
	  created: function created() {
	    var _this = this;
	
	    var socketPath = void 0;
	    var nickName = window.prompt('Please enter a nickname:');
	    this.chatMsg.nickName = nickName || this.chatMsg.nickName;
	    if (false) {
	      socketPath = 'http://localhost:3003';
	    } else socketPath = '/feelmymeal/app/socket.io';
	
	    this.socket = _socket2.default.connect({ path: socketPath });
	
	    this.socket.on('chat message', function (chatMsg) {
	      _this.chatMsgs.push(chatMsg);
	      console.log('chatMsg recieved', chatMsg);
	    });
	  },
	  mounted: function mounted() {
	    this.$store.commit(_chat.GET_HIGHER);
	  },
	  destroyed: function destroyed() {
	    this.$store.commit(_chat.GET_HIGHER);
	  }
	};

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _addContact = __webpack_require__(378);
	
	var _addContact2 = _interopRequireDefault(_addContact);
	
	var _addMeal = __webpack_require__(379);
	
	var _addMeal2 = _interopRequireDefault(_addMeal);
	
	var _clockMeal = __webpack_require__(392);
	
	var _clockMeal2 = _interopRequireDefault(_clockMeal);
	
	var _auth = __webpack_require__(12);
	
	var _auth2 = _interopRequireDefault(_auth);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  data: function data() {
	    return {};
	  },
	  methods: {},
	  components: {
	    addContact: _addContact2.default,
	    addMeal: _addMeal2.default,
	    clockMeal: _clockMeal2.default
	  },
	  created: function created() {},
	  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
	    _auth2.default.redirectToSignin(next);
	  }
	};

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(6);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _vuex = __webpack_require__(2);
	
	var _auth = __webpack_require__(12);
	
	var _auth2 = _interopRequireDefault(_auth);
	
	var _auth3 = __webpack_require__(19);
	
	var _feeling = __webpack_require__(58);
	
	var _meal = __webpack_require__(59);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  name: 'main-nav',
	  data: function data() {
	    return {
	      checkboxVal: false,
	      shouldGetHigher: false
	    };
	  },
	
	  methods: {
	    signout: function signout() {
	      _auth2.default.signout();
	      this.$store.commit(_auth3.SIGN_OUT);
	      this.$store.commit(_feeling.CLEAR_FEELINGS_CACHE);
	      this.$store.commit(_meal.CLEAR_MEALS_CACHE);
	      this.$router.push('/signin');
	    },
	    closeMenu: function closeMenu() {
	      this.checkboxVal = false;
	    }
	  },
	  computed: (0, _extends3.default)({}, (0, _vuex.mapGetters)({
	    isLoggedIn: 'isLoggedIn',
	    user: 'user'
	  }), {
	    logoSrc: function logoSrc() {
	      var src = this.isLoggedIn ? __webpack_require__(373) : __webpack_require__(374);
	
	      return src;
	    }
	  }),
	  watch: {
	    shouldGetHigher: function shouldGetHigher() {
	      console.log('changed', this.shouldGetHigher);
	    }
	  }
	};

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends2 = __webpack_require__(6);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _promise = __webpack_require__(61);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _moment = __webpack_require__(1);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _fullcalendar = __webpack_require__(335);
	
	var _fullcalendar2 = _interopRequireDefault(_fullcalendar);
	
	var _vuex = __webpack_require__(2);
	
	var _auth = __webpack_require__(12);
	
	var _auth2 = _interopRequireDefault(_auth);
	
	var _auth3 = __webpack_require__(19);
	
	var _filter = __webpack_require__(383);
	
	var _filter2 = _interopRequireDefault(_filter);
	
	var _toastr = __webpack_require__(25);
	
	var _toastr2 = _interopRequireDefault(_toastr);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ONE_HOUR = 3600000;
	var dayOfTheWeek = (0, _moment2.default)().day();
	
	exports.default = {
	    data: function data() {
	        return {
	            filteredMeals: [],
	            isTurnPrevPage: false,
	            isTurnNextPage: false,
	            daysStack: 0,
	            daysToHide: [0, 1, 2],
	            currView: 'week',
	            dayView: false,
	            isMounted: false,
	            events: [],
	            firstMeals: [],
	            firstFeelings: []
	        };
	    },
	    methods: {
	        changeDays: function changeDays(diff) {
	
	            if (this.currView === 'week') {
	
	                if (diff === 'prev' && this.daysStack === 1) {
	                    this.daysStack = 0;
	                    this.isTurnPrevPage = false;
	                } else {
	                    this.isTurnPrevPage = true;
	                }
	
	                if (diff === 'next' && this.daysStack === 0) {
	                    this.daysStack = 1;
	                    this.isTurnNextPage = false;
	                } else {
	                    this.isTurnNextPage = true;
	                }
	
	                var hiddenDays = $('.calendar').fullCalendar('option', 'hiddenDays');
	                hiddenDays[0] === 0 ? this.daysToHide = [4, 5, 6] : this.daysToHide = [0, 1, 2];
	
	                $('.calendar').fullCalendar('option', 'hiddenDays', this.daysToHide);
	
	                if (this.daysStack === 0 && diff === 'prev' && this.isTurnPrevPage) {
	                    $('.calendar').fullCalendar(diff);
	                    this.daysStack = 1;
	                } else if (this.daysStack === 1 && diff === 'next' && this.isTurnNextPage) {
	                    $('.calendar').fullCalendar(diff);
	                    this.daysStack = 0;
	                }
	            } else {
	                $('.calendar').fullCalendar(diff);
	            }
	        },
	        changeView: function changeView(view) {
	            $('.calendar').fullCalendar('changeView', view);
	            if (view === 'month') {
	                $('.calendar').fullCalendar('option', 'hiddenDays', '');
	                this.currView = 'month';
	            } else {
	                $('.calendar').fullCalendar('option', 'hiddenDays', this.daysToHide);
	                this.currView = 'week';
	            }
	        },
	        setFeelingColor: function setFeelingColor(rating) {
	            var colors = ['', 'red', 'orange', 'yellow', '#80c000', 'green'];
	            return colors[rating];
	        },
	        convertTimeToLocal: function convertTimeToLocal(timestamp) {
	            return timestamp + (0, _moment2.default)().utcOffset() / 60 * ONE_HOUR;
	        },
	        translateMeals: function translateMeals(meal) {
	            var newMeal = {};
	            newMeal['start'] = this.convertTimeToLocal(meal.time) - ONE_HOUR / 2;
	            newMeal['end'] = this.convertTimeToLocal(meal.time) + ONE_HOUR / 2;
	            newMeal['title'] = meal.foods.join();
	            newMeal['textColor'] = 'white';
	            this.firstMeals.push(newMeal);
	        },
	        translateFeelings: function translateFeelings(feeling) {
	            var newFeeling = {};
	            newFeeling['title'] = 'Feeling rating: ' + feeling.rating;
	            newFeeling['start'] = this.convertTimeToLocal(feeling.time) - ONE_HOUR * 4;
	            newFeeling['end'] = this.convertTimeToLocal(feeling.time);
	            newFeeling['textColor'] = 'black';
	            newFeeling['backgroundColor'] = this.setFeelingColor(feeling.rating);
	            this.firstFeelings.push(newFeeling);
	        },
	        onDeleteSuccess: function onDeleteSuccess() {
	            _toastr2.default.options.closeButton = true;
	            _toastr2.default.success('Product Deleted!');
	        }
	    },
	
	    mounted: function mounted() {
	        var _this = this;
	
	        var prmMeals = this.$store.dispatch('getMealsByUser', this.user).then(function (meals) {
	
	            meals.forEach(function (meal) {
	                _this.translateMeals(meal);
	            });
	        });
	        var prmFeelings = this.$store.dispatch('getFeelingsByUser', this.user).then(function (feelings) {
	
	            feelings.forEach(function (feeling) {
	                _this.translateFeelings(feeling);
	            });
	        });
	        _promise2.default.all([prmMeals, prmFeelings]).then(function (values) {
	            _this.events = _this.firstMeals.concat(_this.firstFeelings);
	            var daysToShow = dayOfTheWeek > 3 ? [0, 1, 2] : [4, 5, 6];
	            var self = _this;
	
	            $('.calendar').fullCalendar({
	
	                hiddenDays: daysToShow,
	                customButtons: {
	                    todayButton: {
	                        text: 'Today',
	                        click: function click() {
	                            $('.calendar').fullCalendar('option', 'hiddenDays', []);
	                            $('.calendar').fullCalendar('today');
	                            $('.calendar').fullCalendar('changeView', 'basicDay');
	
	                            self.dayView = true;
	                        }
	                    },
	                    weekButton: {
	                        text: 'Week',
	                        click: function click() {
	                            self.dayView = false;
	                            self.changeView('agendaWeek');
	                        }
	                    },
	                    monthButton: {
	                        text: 'Month',
	                        click: function click() {
	                            self.dayView = false;
	                            self.changeView('month');
	                        }
	                    },
	                    nextButton: {
	                        text: 'Next >',
	                        click: function click() {
	                            if (!self.dayView) self.changeDays('next');
	                        }
	                    },
	                    prevButton: {
	                        text: '< Prev',
	                        click: function click() {
	                            if (!self.dayView) self.changeDays('prev');
	                        }
	                    }
	                },
	                height: 800,
	                header: {
	                    right: 'prevButton nextButton',
	                    center: 'todayButton weekButton monthButton'
	                },
	                views: {
	                    month: {
	                        titleFormat: 'YYYY, MM, DD' },
	                    agendaWeek: {
	                        titleFormat: 'YYYY, MM, DD'
	                    }
	                },
	
	                events: _this.events,
	
	                defaultView: 'agendaWeek'
	            });
	        });
	        this.isMounted = true;
	    },
	
	
	    computed: (0, _extends3.default)({}, (0, _vuex.mapGetters)(['currFeeling', 'feelings', 'user', 'currMeal'])),
	    components: {
	        moment: _moment2.default,
	        FullCalendar: _fullcalendar2.default,
	        filtercom: _filter2.default
	    },
	    watch: {
	        filteredMeals: function filteredMeals() {
	            var _this2 = this;
	
	            this.firstMeals = [];
	            this.filteredMeals.forEach(function (meal) {
	                _this2.translateMeals(meal);
	            });
	            this.events = this.firstMeals.concat(this.firstFeelings);
	            $('.calendar').fullCalendar('removeEvents');
	            $('.calendar').fullCalendar('renderEvents', this.events);
	        }
	
	    }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _auth = __webpack_require__(12);
	
	var _auth2 = _interopRequireDefault(_auth);
	
	var _auth3 = __webpack_require__(19);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  mounted: function mounted() {},
	  data: function data() {
	    return {
	      user: { email: '', password: '' },
	      error: ""
	    };
	  },
	
	  methods: {
	    signin: function signin(user) {
	      var _this = this;
	
	      _auth2.default.signin(user).then(function (res) {
	        _this.$store.commit(_auth3.SIGN_IN, res);
	        _this.$router.push({ name: 'home' });
	      }).catch(function (err) {
	        err.json().then(function (res) {
	          return _this.error = res.error;
	        });
	      });
	    }
	  }
	};

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _auth = __webpack_require__(12);
	
	var _auth2 = _interopRequireDefault(_auth);
	
	var _auth3 = __webpack_require__(19);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  data: function data() {
	    return {
	      user: { email: '', password: '' },
	      error: ""
	    };
	  },
	  methods: {
	    signup: function signup(user) {
	      var _this = this;
	
	      _auth2.default.signup(user).then(function (res) {
	        _this.$router.push({ name: 'signin' });
	      }).catch(function (err) {
	        console.log('error is: ', err);
	      });
	    }
	  }
	};

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends2 = __webpack_require__(6);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _vuex = __webpack_require__(2);
	
	var _simplePeer = __webpack_require__(348);
	
	var _simplePeer2 = _interopRequireDefault(_simplePeer);
	
	var _socket = __webpack_require__(219);
	
	var _socket2 = _interopRequireDefault(_socket);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
		data: function data() {
			return {
				socket: null,
				socketReady: false,
				peer: null,
				myUser: '',
				targetUser: 'w',
				outStream: null,
				isMutedOut: false };
		},
	
		computed: (0, _extends3.default)({}, (0, _vuex.mapGetters)(['user'])),
		methods: {
			toggleMuteOut: function toggleMuteOut() {
				this.isMutedOut = !this.isMutedOut;
				this.outStream.getAudioTracks()[0].enabled = this.isMutedOut;
			}
		},
		mounted: function mounted() {
			var _this = this;
	
			this.myUser = this.user.username.slice(0, 1) === 'w' ? 'W50hyPy2Cl' : 'eVHJlpt7Ac';
			this.targetUser = this.user.username.slice(0, 1) === 'w' ? 'eVHJlpt7Ac' : 'W50hyPy2Cl';
	
			var socketPath =  false ? 'http://localhost:3003' : 'https://feelmymeal.herokuapp.com';
	
			this.socket = (0, _socket2.default)(socketPath);
			this.socket.on('connect', function () {
				_this.socketReady = true;
			});
			this.socket.on('rtc offer', function (msg) {
				if (msg.to === _this.myUser && msg.data.type === 'offer') {
					peer.signal(msg.data);
				} else if (msg.to === _this.myUser && msg.data.type === 'answer') {
					peer.signal(msg.data);
				}
			});
	
			var peer = new _simplePeer2.default({
				initiator: this.user.username.slice(0, 1) === 'w',
				trickle: false
			});
			peer.on('error', function (err) {
				return console.log('error', err);
			});
	
			peer.on('signal', function (data) {
				console.log('SIGNAL', data);
	
				if (_this.socketReady) {
					console.log('this.socketReady is: ', _this.socketReady);
					_this.socket.emit('rtc offer', { from: _this.myUser, to: _this.targetUser, data: data });
				} else {
					setTimeout(function () {
						_this.socket.emit('rtc offer', { from: _this.myUser, to: _this.targetUser, data: data });
					}, 2000);
				}
			});
	
			var peerConnected = false;
			peer.on('connect', function () {
				console.log('CONNECT');
				peerConnected = true;
				peer.send('whatever' + Math.random());
			});
	
			peer.on('data', function (data) {
				console.log('data: ' + data);
			});
	
			peer.on('stream', function (stream) {
				_this.$refs.videoDisplayInc.srcObject = stream;
				_this.$refs.videoDisplayInc.play();
			});
	
			var mediaConfig = { audio: { echoCancellation: true }, video: true };
			if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
				navigator.mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
					_this.outStream = stream;
					_this.$refs.videoDisplay.srcObject = stream;
					_this.$refs.videoDisplay.play();
					if (peerConnected) {
						peer.addStream(stream);
					} else {
						setTimeout(function () {
							peer.addStream(stream);
						}, 1000);
					}
					console.log('stream is: ', stream);
				}).catch(function (err) {
					return console.log('err is: ', err.toString());
				});
			} else {
				console.log('video chat not supported on your device');
			}
		}
	};

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _vueRouter = __webpack_require__(229);
	
	var _vueRouter2 = _interopRequireDefault(_vueRouter);
	
	var _home = __webpack_require__(384);
	
	var _home2 = _interopRequireDefault(_home);
	
	var _signin = __webpack_require__(390);
	
	var _signin2 = _interopRequireDefault(_signin);
	
	var _signup = __webpack_require__(391);
	
	var _signup2 = _interopRequireDefault(_signup);
	
	var _myMeals = __webpack_require__(387);
	
	var _myMeals2 = _interopRequireDefault(_myMeals);
	
	var _settings = __webpack_require__(389);
	
	var _settings2 = _interopRequireDefault(_settings);
	
	var _myStatistics = __webpack_require__(388);
	
	var _myStatistics2 = _interopRequireDefault(_myStatistics);
	
	var _chat = __webpack_require__(381);
	
	var _chat2 = _interopRequireDefault(_chat);
	
	var _videoChat = __webpack_require__(394);
	
	var _videoChat2 = _interopRequireDefault(_videoChat);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var routes = [{
	  path: '/',
	  name: 'home',
	  component: _videoChat2.default
	}, {
	  path: '/add-feeling',
	  name: 'add-feeling',
	  component: _home2.default
	}, {
	  path: '/signin',
	  name: 'signin',
	  component: _signin2.default
	}, {
	  path: '/signup',
	  name: 'signup',
	  component: _signup2.default
	}, {
	  path: '/settings',
	  name: 'settings',
	  component: _settings2.default
	}, {
	  path: '/my-meals',
	  name: 'my-meals',
	  component: _myMeals2.default
	}, {
	  path: '/my-statistics',
	  name: 'my-statistics',
	  component: _myStatistics2.default
	}, {
	  path: '/chat',
	  name: 'chat',
	  component: _chat2.default
	}, {
	  path: '/video-chat',
	  name: 'video-chat',
	  component: _videoChat2.default
	}, {
	  path: '*',
	  redirect: { name: 'home' }
	}];
	
	var router = new _vueRouter2.default({
	  routes: routes
	
	});
	
	exports.default = router;

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getFeelingsByUser = getFeelingsByUser;
	
	var _vue = __webpack_require__(26);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function submitFeeling(_ref) {
	    var rating = _ref.rating,
	        userId = _ref.userId;
	
	    return _vue2.default.http.post('data/feeling', { rating: rating, userId: userId, time: Date.now() }).then(function (res) {
	        return res.json();
	    }).then(function (feeling) {
	        return feeling;
	    });
	}
	function getFeelingsByUser(_ref2) {
	    var user = _ref2.user;
	
	    return _vue2.default.http.post('getFeelingsByUser', user).then(function (res) {
	        return res.json();
	    }).then(function (feeling) {
	        return feeling;
	    });
	}
	
	exports.default = {
	    submitFeeling: submitFeeling,
	    getFeelingsByUser: getFeelingsByUser
	};

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getMealsByUser = getMealsByUser;
	
	var _vue = __webpack_require__(26);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function submitMeal(_ref) {
	    var foods = _ref.foods,
	        userId = _ref.userId;
	
	    return _vue2.default.http.post('data/meal', { foods: foods, userId: userId, time: Date.now() }).then(function (res) {
	        return res.json();
	    }).then(function (meal) {
	        return meal;
	    });
	}
	
	function getMealsByUser(_ref2) {
	    var user = _ref2.user;
	
	    return _vue2.default.http.post('getMealByUser', user).then(function (res) {
	        return res.json();
	    }).then(function (meals) {
	        return meals;
	    });
	}
	
	exports.default = {
	    submitMeal: submitMeal,
	    getMealsByUser: getMealsByUser
	};

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(368);

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _vue = __webpack_require__(26);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _vuex = __webpack_require__(2);
	
	var _vuex2 = _interopRequireDefault(_vuex);
	
	var _vueRouter = __webpack_require__(229);
	
	var _vueRouter2 = _interopRequireDefault(_vueRouter);
	
	var _vueResource = __webpack_require__(413);
	
	var _vueResource2 = _interopRequireDefault(_vueResource);
	
	var _vueCharts = __webpack_require__(377);
	
	var _vueCharts2 = _interopRequireDefault(_vueCharts);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_vue2.default.use(_vuex2.default);
	
	_vue2.default.use(_vueRouter2.default);
	_vue2.default.use(_vueResource2.default);
	_vue2.default.use(_vueCharts2.default);

/***/ }),
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 316 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 317 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 318 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 319 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 320 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 321 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 322 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 323 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 324 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 325 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 326 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 327 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 328 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 329 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 330 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 331 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 332 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "878f3515ffc579b517ea5832075ac786.mp3";

/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "3be6fcdabd7f58768bd0fbda0752154b.mp3";

/***/ }),
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./af": 85,
		"./af.js": 85,
		"./ar": 92,
		"./ar-dz": 86,
		"./ar-dz.js": 86,
		"./ar-kw": 87,
		"./ar-kw.js": 87,
		"./ar-ly": 88,
		"./ar-ly.js": 88,
		"./ar-ma": 89,
		"./ar-ma.js": 89,
		"./ar-sa": 90,
		"./ar-sa.js": 90,
		"./ar-tn": 91,
		"./ar-tn.js": 91,
		"./ar.js": 92,
		"./az": 93,
		"./az.js": 93,
		"./be": 94,
		"./be.js": 94,
		"./bg": 95,
		"./bg.js": 95,
		"./bm": 96,
		"./bm.js": 96,
		"./bn": 97,
		"./bn.js": 97,
		"./bo": 98,
		"./bo.js": 98,
		"./br": 99,
		"./br.js": 99,
		"./bs": 100,
		"./bs.js": 100,
		"./ca": 101,
		"./ca.js": 101,
		"./cs": 102,
		"./cs.js": 102,
		"./cv": 103,
		"./cv.js": 103,
		"./cy": 104,
		"./cy.js": 104,
		"./da": 105,
		"./da.js": 105,
		"./de": 108,
		"./de-at": 106,
		"./de-at.js": 106,
		"./de-ch": 107,
		"./de-ch.js": 107,
		"./de.js": 108,
		"./dv": 109,
		"./dv.js": 109,
		"./el": 110,
		"./el.js": 110,
		"./en-SG": 111,
		"./en-SG.js": 111,
		"./en-au": 112,
		"./en-au.js": 112,
		"./en-ca": 113,
		"./en-ca.js": 113,
		"./en-gb": 114,
		"./en-gb.js": 114,
		"./en-ie": 115,
		"./en-ie.js": 115,
		"./en-il": 116,
		"./en-il.js": 116,
		"./en-nz": 117,
		"./en-nz.js": 117,
		"./eo": 118,
		"./eo.js": 118,
		"./es": 121,
		"./es-do": 119,
		"./es-do.js": 119,
		"./es-us": 120,
		"./es-us.js": 120,
		"./es.js": 121,
		"./et": 122,
		"./et.js": 122,
		"./eu": 123,
		"./eu.js": 123,
		"./fa": 124,
		"./fa.js": 124,
		"./fi": 125,
		"./fi.js": 125,
		"./fo": 126,
		"./fo.js": 126,
		"./fr": 129,
		"./fr-ca": 127,
		"./fr-ca.js": 127,
		"./fr-ch": 128,
		"./fr-ch.js": 128,
		"./fr.js": 129,
		"./fy": 130,
		"./fy.js": 130,
		"./ga": 131,
		"./ga.js": 131,
		"./gd": 132,
		"./gd.js": 132,
		"./gl": 133,
		"./gl.js": 133,
		"./gom-latn": 134,
		"./gom-latn.js": 134,
		"./gu": 135,
		"./gu.js": 135,
		"./he": 136,
		"./he.js": 136,
		"./hi": 137,
		"./hi.js": 137,
		"./hr": 138,
		"./hr.js": 138,
		"./hu": 139,
		"./hu.js": 139,
		"./hy-am": 140,
		"./hy-am.js": 140,
		"./id": 141,
		"./id.js": 141,
		"./is": 142,
		"./is.js": 142,
		"./it": 144,
		"./it-ch": 143,
		"./it-ch.js": 143,
		"./it.js": 144,
		"./ja": 145,
		"./ja.js": 145,
		"./jv": 146,
		"./jv.js": 146,
		"./ka": 147,
		"./ka.js": 147,
		"./kk": 148,
		"./kk.js": 148,
		"./km": 149,
		"./km.js": 149,
		"./kn": 150,
		"./kn.js": 150,
		"./ko": 151,
		"./ko.js": 151,
		"./ku": 152,
		"./ku.js": 152,
		"./ky": 153,
		"./ky.js": 153,
		"./lb": 154,
		"./lb.js": 154,
		"./lo": 155,
		"./lo.js": 155,
		"./lt": 156,
		"./lt.js": 156,
		"./lv": 157,
		"./lv.js": 157,
		"./me": 158,
		"./me.js": 158,
		"./mi": 159,
		"./mi.js": 159,
		"./mk": 160,
		"./mk.js": 160,
		"./ml": 161,
		"./ml.js": 161,
		"./mn": 162,
		"./mn.js": 162,
		"./mr": 163,
		"./mr.js": 163,
		"./ms": 165,
		"./ms-my": 164,
		"./ms-my.js": 164,
		"./ms.js": 165,
		"./mt": 166,
		"./mt.js": 166,
		"./my": 167,
		"./my.js": 167,
		"./nb": 168,
		"./nb.js": 168,
		"./ne": 169,
		"./ne.js": 169,
		"./nl": 171,
		"./nl-be": 170,
		"./nl-be.js": 170,
		"./nl.js": 171,
		"./nn": 172,
		"./nn.js": 172,
		"./pa-in": 173,
		"./pa-in.js": 173,
		"./pl": 174,
		"./pl.js": 174,
		"./pt": 176,
		"./pt-br": 175,
		"./pt-br.js": 175,
		"./pt.js": 176,
		"./ro": 177,
		"./ro.js": 177,
		"./ru": 178,
		"./ru.js": 178,
		"./sd": 179,
		"./sd.js": 179,
		"./se": 180,
		"./se.js": 180,
		"./si": 181,
		"./si.js": 181,
		"./sk": 182,
		"./sk.js": 182,
		"./sl": 183,
		"./sl.js": 183,
		"./sq": 184,
		"./sq.js": 184,
		"./sr": 186,
		"./sr-cyrl": 185,
		"./sr-cyrl.js": 185,
		"./sr.js": 186,
		"./ss": 187,
		"./ss.js": 187,
		"./sv": 188,
		"./sv.js": 188,
		"./sw": 189,
		"./sw.js": 189,
		"./ta": 190,
		"./ta.js": 190,
		"./te": 191,
		"./te.js": 191,
		"./tet": 192,
		"./tet.js": 192,
		"./tg": 193,
		"./tg.js": 193,
		"./th": 194,
		"./th.js": 194,
		"./tl-ph": 195,
		"./tl-ph.js": 195,
		"./tlh": 196,
		"./tlh.js": 196,
		"./tr": 197,
		"./tr.js": 197,
		"./tzl": 198,
		"./tzl.js": 198,
		"./tzm": 200,
		"./tzm-latn": 199,
		"./tzm-latn.js": 199,
		"./tzm.js": 200,
		"./ug-cn": 201,
		"./ug-cn.js": 201,
		"./uk": 202,
		"./uk.js": 202,
		"./ur": 203,
		"./ur.js": 203,
		"./uz": 205,
		"./uz-latn": 204,
		"./uz-latn.js": 204,
		"./uz.js": 205,
		"./vi": 206,
		"./vi.js": 206,
		"./x-pseudo": 207,
		"./x-pseudo.js": 207,
		"./yo": 208,
		"./yo.js": 208,
		"./zh-cn": 209,
		"./zh-cn.js": 209,
		"./zh-hk": 210,
		"./zh-hk.js": 210,
		"./zh-tw": 211,
		"./zh-tw.js": 211
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 341;


/***/ }),
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/img/MarkFridman.d59760a.jpg";

/***/ }),
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/img/OmerZfira.01abcaf.png";

/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/img/logo-sporty-transparent.3935411.png";

/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/img/logo.1ce4195.png";

/***/ }),
/* 375 */
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ }),
/* 376 */,
/* 377 */,
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(329)
	
	/* script */
	__vue_exports__ = __webpack_require__(241)
	
	/* template */
	var __vue_template__ = __webpack_require__(408)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-80a19cd0"
	
	module.exports = __vue_exports__


/***/ }),
/* 379 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(322)
	
	/* script */
	__vue_exports__ = __webpack_require__(242)
	
	/* template */
	var __vue_template__ = __webpack_require__(401)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-47f779e1"
	
	module.exports = __vue_exports__


/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(319)
	
	/* script */
	__vue_exports__ = __webpack_require__(233)
	
	/* template */
	var __vue_template__ = __webpack_require__(398)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-44436c20"
	
	module.exports = __vue_exports__


/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(323)
	
	/* script */
	__vue_exports__ = __webpack_require__(243)
	
	/* template */
	var __vue_template__ = __webpack_require__(402)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-5517afec"
	
	module.exports = __vue_exports__


/***/ }),
/* 382 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(327)
	
	/* script */
	__vue_exports__ = __webpack_require__(234)
	
	/* template */
	var __vue_template__ = __webpack_require__(406)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	module.exports = __vue_exports__


/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(326)
	
	/* script */
	__vue_exports__ = __webpack_require__(235)
	
	/* template */
	var __vue_template__ = __webpack_require__(405)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-78e2111f"
	
	module.exports = __vue_exports__


/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(324)
	
	/* script */
	__vue_exports__ = __webpack_require__(244)
	
	/* template */
	var __vue_template__ = __webpack_require__(403)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-674b8cd1"
	
	module.exports = __vue_exports__


/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(332)
	
	/* script */
	__vue_exports__ = __webpack_require__(245)
	
	/* template */
	var __vue_template__ = __webpack_require__(411)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-fd10d0fe"
	
	module.exports = __vue_exports__


/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(317)
	
	/* script */
	__vue_exports__ = __webpack_require__(236)
	
	/* template */
	var __vue_template__ = __webpack_require__(396)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-2ed6a14a"
	
	module.exports = __vue_exports__


/***/ }),
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(330)
	
	/* script */
	__vue_exports__ = __webpack_require__(246)
	
	/* template */
	var __vue_template__ = __webpack_require__(409)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-89ac73be"
	
	module.exports = __vue_exports__


/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(318)
	
	/* script */
	__vue_exports__ = __webpack_require__(237)
	
	/* template */
	var __vue_template__ = __webpack_require__(397)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-3209d05a"
	
	module.exports = __vue_exports__


/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(316)
	
	/* script */
	__vue_exports__ = __webpack_require__(238)
	
	/* template */
	var __vue_template__ = __webpack_require__(395)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-044e4830"
	
	module.exports = __vue_exports__


/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(328)
	
	/* script */
	__vue_exports__ = __webpack_require__(247)
	
	/* template */
	var __vue_template__ = __webpack_require__(407)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-7e39b3d8"
	
	module.exports = __vue_exports__


/***/ }),
/* 391 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(321)
	
	/* script */
	__vue_exports__ = __webpack_require__(248)
	
	/* template */
	var __vue_template__ = __webpack_require__(400)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-47004c0a"
	
	module.exports = __vue_exports__


/***/ }),
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(325)
	
	/* script */
	__vue_exports__ = __webpack_require__(239)
	
	/* template */
	var __vue_template__ = __webpack_require__(404)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-6d6738b2"
	
	module.exports = __vue_exports__


/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(320)
	
	/* script */
	__vue_exports__ = __webpack_require__(240)
	
	/* template */
	var __vue_template__ = __webpack_require__(399)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-468ed3dc"
	
	module.exports = __vue_exports__


/***/ }),
/* 394 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(331)
	
	/* script */
	__vue_exports__ = __webpack_require__(249)
	
	/* template */
	var __vue_template__ = __webpack_require__(410)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-f1b4e348"
	
	module.exports = __vue_exports__


/***/ }),
/* 395 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('section', {
	    staticClass: "below-nav"
	  }, [_c('div', {
	    staticClass: "wrapper flex-column flex-center"
	  }, [_c('h2', [_vm._v("Settings")]), _vm._v(" "), _c('h3', {
	    staticClass: "title"
	  }, [_vm._v("Remind me to report my feeling after every meal")]), _vm._v(" "), _c('label', {
	    staticClass: "custom-check"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.shouldPush),
	      expression: "shouldPush"
	    }],
	    attrs: {
	      "type": "checkbox",
	      "name": "onOff"
	    },
	    domProps: {
	      "checked": Array.isArray(_vm.shouldPush) ? _vm._i(_vm.shouldPush, null) > -1 : (_vm.shouldPush)
	    },
	    on: {
	      "change": function($event) {
	        var $$a = _vm.shouldPush,
	          $$el = $event.target,
	          $$c = $$el.checked ? (true) : (false);
	        if (Array.isArray($$a)) {
	          var $$v = null,
	            $$i = _vm._i($$a, $$v);
	          if ($$el.checked) {
	            $$i < 0 && (_vm.shouldPush = $$a.concat([$$v]))
	          } else {
	            $$i > -1 && (_vm.shouldPush = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
	          }
	        } else {
	          _vm.shouldPush = $$c
	        }
	      }
	    }
	  }), _vm._v(" "), _c('i'), _vm._v(" "), _c('span')]), _vm._v(" "), _c('h3', {
	    staticClass: "title"
	  }, [_vm._v("Reminder delay (in hours)")]), _vm._v(" "), _c('range-slider', {
	    staticClass: "slider",
	    class: {
	      isdisabled: !_vm.shouldPush
	    },
	    attrs: {
	      "disabled": !_vm.shouldPush,
	      "min": "2",
	      "max": "4",
	      "step": "0.5"
	    },
	    model: {
	      value: (_vm.sliderValue),
	      callback: function($$v) {
	        _vm.sliderValue = $$v
	      },
	      expression: "sliderValue"
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "slider-value"
	  }, [_vm._v(" " + _vm._s(_vm.sliderValue) + " ")]), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-success btn-lg",
	    on: {
	      "click": _vm.saveSettings,
	      "touch": _vm.saveSettings
	    }
	  }, [_vm._v("Save Settings")])], 1)])
	},staticRenderFns: []}

/***/ }),
/* 396 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('transition', {
	    attrs: {
	      "name": "modal"
	    }
	  }, [_c('div', {
	    staticClass: "modal-mask"
	  }, [_c('div', {
	    staticClass: "modal-wrapper"
	  }, [_c('div', {
	    staticClass: "modal-container"
	  }, [_c('div', {
	    staticClass: "modal-header"
	  }, [_vm._t("header", [_c('h3', [_c('strong', [_vm._v("Please tell us how do you feel:")])])])], 2), _vm._v(" "), _c('div', {
	    staticClass: "modal-body"
	  }, [_c('form', {
	    staticClass: "modal-body",
	    attrs: {
	      "action": "#",
	      "method": "post"
	    }
	  }, [_c('input', {
	    staticClass: "radio",
	    attrs: {
	      "type": "radio",
	      "name": "example",
	      "id": "ex1",
	      "value": "ex1"
	    }
	  }), _vm._v(" "), _c('label', {
	    staticClass: "fa confounded",
	    attrs: {
	      "for": "ex1"
	    },
	    on: {
	      "click": function($event) {
	        return _vm.selected(1)
	      }
	    }
	  }), _vm._v(" "), _c('input', {
	    staticClass: "radio",
	    attrs: {
	      "type": "radio",
	      "name": "example",
	      "id": "ex2",
	      "value": "ex2"
	    }
	  }), _vm._v(" "), _c('label', {
	    staticClass: "fa worried",
	    attrs: {
	      "for": "ex2"
	    },
	    on: {
	      "click": function($event) {
	        return _vm.selected(2)
	      }
	    }
	  }), _vm._v(" "), _c('input', {
	    staticClass: "radio",
	    attrs: {
	      "type": "radio",
	      "name": "example",
	      "id": "ex3",
	      "value": "ex3",
	      "checked": ""
	    }
	  }), _vm._v(" "), _c('label', {
	    staticClass: "fa neutral_face",
	    attrs: {
	      "for": "ex3"
	    },
	    on: {
	      "click": function($event) {
	        return _vm.selected(3)
	      }
	    }
	  }), _vm._v(" "), _c('input', {
	    staticClass: "radio",
	    attrs: {
	      "type": "radio",
	      "name": "example",
	      "id": "ex4",
	      "value": "ex4"
	    }
	  }), _vm._v(" "), _c('label', {
	    staticClass: "fa relieved",
	    attrs: {
	      "for": "ex4"
	    },
	    on: {
	      "click": function($event) {
	        return _vm.selected(4)
	      }
	    }
	  }), _vm._v(" "), _c('input', {
	    staticClass: "radio",
	    attrs: {
	      "type": "radio",
	      "name": "example",
	      "id": "ex5",
	      "value": "ex5"
	    }
	  }), _vm._v(" "), _c('label', {
	    staticClass: "fa smiley",
	    attrs: {
	      "for": "ex5"
	    },
	    on: {
	      "click": function($event) {
	        return _vm.selected(5)
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "modal-footer"
	  }, [_vm._t("footer", [_c('button', {
	    staticClass: "btn btn-success btn-lg",
	    on: {
	      "click": _vm.submitFeeling
	    }
	  }, [_vm._v("\n                            Save My Feeling\n                        ")]), _vm._v(" "), _c('button', {
	    staticClass: "modal-default-button btn btn-warning btn-lg",
	    on: {
	      "click": function($event) {
	        return _vm.$emit('close')
	      }
	    }
	  }, [_vm._v("\n                            Cancel\n                        ")])])], 2)])])])])
	},staticRenderFns: []}

/***/ }),
/* 397 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('section', {
	    staticClass: "below-nav"
	  }, [_c('h1', [_vm._v("My Statistics")]), _vm._v(" "), (!_vm.loadingStats) ? _c('div', {
	    staticClass: "wrapper flex flex-column justify-center align-center"
	  }, [_vm._m(0), _vm._v(" "), _c('vue-chart', {
	    attrs: {
	      "chart-type": "BubbleChart",
	      "chart-events": _vm.chartEvents,
	      "columns": _vm.chartColumns,
	      "rows": _vm.chartRows,
	      "options": _vm.options
	    }
	  })], 1) : _vm._e()])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('p', {
	    staticClass: "chart-instructions"
	  }, [_vm._v("\n        How to tell which foods are recommended for you? "), _c('br'), _vm._v(" "), _c('span', {
	    staticClass: "bad-food-a"
	  }, [_vm._v("Red ")]), _vm._v(" "), _c('span', {
	    staticClass: "bad-food-b"
	  }, [_vm._v("foods are")]), _vm._v(" "), _c('span', {
	    staticClass: "bad-food-c"
	  }, [_vm._v("less recommended")]), _vm._v(" and "), _c('br', {
	    staticClass: "break-line-mobile"
	  }), _vm._v(" "), _c('span', {
	    staticClass: "good-food-a"
	  }, [_vm._v("green")]), _vm._v(" "), _c('span', {
	    staticClass: "good-food-b"
	  }, [_vm._v("foods are")]), _vm._v(" "), _c('span', {
	    staticClass: "good-food-c"
	  }, [_vm._v("more recommended")]), _vm._v("."), _c('br'), _vm._v("\n        Size indicates the number of times you have consumed this food.\n    ")])
	}]}

/***/ }),
/* 398 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('nav', {
	    staticClass: "bottom-nav"
	  }, [_c('router-link', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.$route.name !== 'home'),
	      expression: "$route.name !== 'home'"
	    }],
	    staticClass: "bottom-nav__fixed-button nav-record",
	    class: {
	      higher: _vm.isChangeStyle
	    },
	    attrs: {
	      "to": {
	        name: 'home'
	      }
	    }
	  }, [_c('img', {
	    staticClass: "microphone",
	    attrs: {
	      "src": __webpack_require__(228)
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "bottom-nav__fixed-button add-feeling",
	    class: {
	      higher2: _vm.isChangeStyle
	    },
	    on: {
	      "click": function($event) {
	        return _vm.$emit('shoulddisplay')
	      }
	    }
	  }, [_c('span', {
	    staticClass: "small-text"
	  }, [_vm._v("How do you feel?")]), _vm._v(" "), _c('img', {
	    staticClass: "smiley",
	    attrs: {
	      "src": __webpack_require__(375)
	    }
	  })])], 1)
	},staticRenderFns: []}

/***/ }),
/* 399 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _vm._m(0)
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "pan-wrapper"
	  }, [_c('h3', [_vm._v("Cooking your data ...")])])
	}]}

/***/ }),
/* 400 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "container below-nav"
	  }, [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4"
	  }, [_c('h1', {
	    staticClass: "text-center login-title"
	  }, [_vm._v("Sign up to continue")]), _vm._v(" "), _c('div', {
	    staticClass: "account-wall"
	  }, [_c('img', {
	    staticClass: "profile-img",
	    attrs: {
	      "src": __webpack_require__(227),
	      "alt": ""
	    }
	  }), _vm._v(" "), _c('form', {
	    staticClass: "form-signin",
	    on: {
	      "submit": function($event) {
	        $event.preventDefault();
	        return _vm.signup(_vm.user)
	      }
	    }
	  }, [_c('div', {
	    staticClass: "form-group",
	    class: {
	      'has-error': _vm.errors.has('user.email')
	    }
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.user.email),
	      expression: "user.email"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "email",
	      "placeholder": "Email",
	      "autofocus": ""
	    },
	    domProps: {
	      "value": (_vm.user.email)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.user, "email", $event.target.value)
	      }
	    }
	  }), _vm._v(" "), (_vm.errors.has('user.email')) ? _c('span', {
	    staticClass: "text-danger"
	  }, [_vm._v("Email please")]) : _vm._e()]), _vm._v(" "), _c('div', {
	    staticClass: "form-group",
	    class: {
	      'has-error': _vm.errors.has('user.password')
	    }
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.user.password),
	      expression: "user.password"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "placeholder": "Password",
	      "type": "password"
	    },
	    domProps: {
	      "value": (_vm.user.password)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.user, "password", $event.target.value)
	      }
	    }
	  }), _vm._v(" "), (_vm.errors.has('user.password:min')) ? _c('span', {
	    staticClass: "text-danger"
	  }, [_vm._v("The field must be at least 6 characters.")]) : _vm._e(), _vm._v(" "), (_vm.errors.has('user.password:max')) ? _c('span', {
	    staticClass: "text-danger"
	  }, [_vm._v("Too much")]) : _vm._e()]), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-lg btn-primary btn-block",
	    attrs: {
	      "type": "submit"
	    }
	  }, [_vm._v("\n            Sign up\n          ")]), _vm._v(" "), (_vm.error) ? _c('p', {
	    staticClass: "text-danger error"
	  }, [_vm._v(_vm._s(_vm.error))]) : _vm._e()])])])])])
	},staticRenderFns: []}

/***/ }),
/* 401 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "wrapper"
	  }, [_c('meta', {
	    attrs: {
	      "name": "viewport",
	      "content": "width=device-width, initial-scale=1"
	    }
	  }), _vm._v(" "), _c('section', {
	    staticClass: "add-meal"
	  }, [_c('div', {
	    staticClass: "record",
	    class: {
	      recording: _vm.isRec
	    },
	    on: {
	      "touchstart": function($event) {
	        $event.preventDefault();
	        return _vm.startSpeechReco($event)
	      },
	      "touchend": function($event) {
	        $event.preventDefault();
	        return _vm.stopSpeechReco($event)
	      },
	      "touchcancel": function($event) {
	        $event.preventDefault();
	        return _vm.stopSpeechReco($event)
	      },
	      "mousedown": _vm.startSpeechReco,
	      "mouseup": _vm.stopSpeechReco,
	      "mouseleave": _vm.stopSpeechReco
	    }
	  }, [_c('img', {
	    staticClass: "microphone2",
	    attrs: {
	      "src": __webpack_require__(228)
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "recControls-cont"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.speechElText),
	      expression: "speechElText"
	    }],
	    staticClass: "recInput",
	    attrs: {
	      "type": "text",
	      "placeholder": "Next Meal Ingredient"
	    },
	    domProps: {
	      "value": (_vm.speechElText)
	    },
	    on: {
	      "keyup": function($event) {
	        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) { return null; }
	        return _vm.addFood($event)
	      },
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.speechElText = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "recControls-btns"
	  }, [(_vm.recFb) ? _c('button', {
	    staticClass: "btn btn-primary btn-lg",
	    on: {
	      "click": _vm.addFood
	    }
	  }, [_vm._v("Add Food")]) : _vm._e(), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-success btn-lg",
	    on: {
	      "click": _vm.submitFood,
	      "touch": _vm.submitFood
	    }
	  }, [_vm._v("Finish Meal")])])]), _vm._v(" "), _c('transition-group', {
	    staticClass: "list-group",
	    attrs: {
	      "name": "foods",
	      "tag": "ul"
	    }
	  }, _vm._l((_vm.foods), function(food, index) {
	    return _c('li', {
	      key: food,
	      staticClass: "list-group-item"
	    }, [_c('button', {
	      staticClass: "btn btn-danger btn-lg badge btn-red",
	      on: {
	        "click": function($event) {
	          return _vm.deleteFood(index)
	        }
	      }
	    }, [_vm._v("X")]), _vm._v(" "), _c('div', {
	      attrs: {
	        "contenteditable": "true"
	      },
	      on: {
	        "keyup": function($event) {
	          return _vm.updateFood(index, $event)
	        }
	      }
	    }, [_vm._v(_vm._s(food) + "\n                ")])])
	  }), 0)], 1)])
	},staticRenderFns: []}

/***/ }),
/* 402 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "chat below-nav2"
	  }, [_c('ul', {
	    staticClass: "messages"
	  }, _vm._l((_vm.chatMsgs), function(chatMsg) {
	    return _c('li', [_vm._v(_vm._s(chatMsg.nickName) + ": " + _vm._s(chatMsg.msg))])
	  }), 0), _vm._v(" "), _c('form', {
	    staticClass: "input-box"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.chatMsg.msg),
	      expression: "chatMsg.msg"
	    }],
	    domProps: {
	      "value": (_vm.chatMsg.msg)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.chatMsg, "msg", $event.target.value)
	      }
	    }
	  }), _vm._v(" "), _c('button', {
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        return _vm.sendMsg($event)
	      }
	    }
	  }, [_vm._v("»")])])])
	},staticRenderFns: []}

/***/ }),
/* 403 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('section', {
	    staticClass: "hero below-nav"
	  }, [_c('h1', [_vm._v("Become Healthier Every Day")]), _vm._v(" "), _c('h3', [_vm._v("Start by recording your last meal's ingredients")]), _vm._v(" "), _c('add-meal')], 1), _vm._v(" "), _vm._m(0), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('add-contact'), _vm._v(" "), _vm._m(2)], 1)
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('section', {
	    staticClass: "features"
	  }, [_c('h3', {
	    staticClass: "title"
	  }, [_vm._v("About us")]), _vm._v(" "), _c('hr', {
	    staticClass: "star-primary"
	  }), _vm._v(" "), _c('p', [_vm._v("We are graduates of the Coding Academy bootcamp. "), _c('br'), _vm._v("\n    This is our final project.\n    ")]), _vm._v(" "), _c('ul', {
	    staticClass: "grid"
	  }, [_c('li', [_c('img', {
	    staticClass: "profile-img2",
	    attrs: {
	      "src": __webpack_require__(372),
	      "alt": ""
	    }
	  }), _vm._v(" "), _c('h4', [_vm._v("Omer Zfira")]), _vm._v(" "), _c('p', [_vm._v("Full-stack Web Developer, passionate about solving challenges. Specializes in building cross-browser, scalable applications and websites with rich and responsive front-end.\nHighly motivated and creative, self-learning, dedicated, diligent, responsible and a team player, always learning and applying the cutting edge technologies in my projects.\n")]), _c('br'), _c('p', [_vm._v("\nSpecialties: JavaScript, Vue.js,  Angular.js, Node.js, PHP, mongoDB, CSS3/SaSS, HTML5, Fullstack Development.\n        ")])]), _vm._v(" "), _c('li', [_c('img', {
	    staticClass: "profile-img2",
	    attrs: {
	      "src": __webpack_require__(371),
	      "alt": ""
	    }
	  }), _vm._v(" "), _c('h4', [_vm._v("Mark Fridman")]), _vm._v(" "), _c('p', [_vm._v("\n          Full-stack Web Developer, devoted to building the next say in web-applications with experience in the latest web technologies. Punctual, self-reliant creative, responsible and passionate about building cool stuff with strong communication skills.\n           Specializes in building cross-browser, scalable applications and websites with rich and responsive front-end.\n        ")]), _vm._v(" "), _c('p'), _c('br'), _c('p', [_vm._v("\n            Specialties:  HTML5, CSS3/SaSS, JavaScript, Vue.js,  Angular.js, Node.js, PHP, mongoDB, Fullstack Development.\n        ")])])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('section', {
	    staticClass: "contact"
	  }, [_c('h3', {
	    staticClass: "title"
	  }, [_vm._v("Join our newsletter")]), _vm._v(" "), _c('hr', {
	    staticClass: "star-primary"
	  }), _vm._v(" "), _c('p', [_vm._v("We occasionally publish health articles and other related dietetic information.\n    "), _c('br'), _vm._v("We"), _c('span', {
	    staticStyle: {
	      "color": "red",
	      "font-weight": "bold"
	    }
	  }, [_vm._v(" will not")]), _vm._v("  send spam or pass your e-mail address to 3rd parties. ")]), _vm._v(" "), _c('form', [_c('input', {
	    attrs: {
	      "type": "email",
	      "placeholder": "Email"
	    }
	  }), _vm._v(" "), _c('a', {
	    staticClass: "btn",
	    attrs: {
	      "href": "#"
	    }
	  }, [_vm._v("Subscribe now")])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('footer', [_c('ul', [_c('li', [_c('a', {
	    attrs: {
	      "href": "#"
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-twitter-square"
	  })])]), _vm._v(" "), _c('li', [_c('a', {
	    attrs: {
	      "href": "#"
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-facebook-square"
	  })])]), _vm._v(" "), _c('li', [_c('a', {
	    attrs: {
	      "href": "#"
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-snapchat-square"
	  })])]), _vm._v(" "), _c('li', [_c('a', {
	    attrs: {
	      "href": "#"
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-pinterest-square"
	  })])]), _vm._v(" "), _c('li', [_c('a', {
	    attrs: {
	      "href": "#"
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-github-square"
	  })])])]), _vm._v(" "), _c('p', [_vm._v("© Copyrights")])])
	}]}

/***/ }),
/* 404 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "wrapper"
	  }, [_c('h2', [_c('span', [_vm._v(_vm._s(_vm.updateTime))])])])
	},staticRenderFns: []}

/***/ }),
/* 405 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('section', [_c('label', {
	    attrs: {
	      "for": "usr"
	    }
	  }, [_vm._v("Filter Meals")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.filterInput),
	      expression: "filterInput"
	    }],
	    staticClass: "form-control1",
	    attrs: {
	      "type": "text",
	      "id": "usr"
	    },
	    domProps: {
	      "value": (_vm.filterInput)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.filterInput = $event.target.value
	      }
	    }
	  })])
	},staticRenderFns: []}

/***/ }),
/* 406 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "star-rating"
	  }, _vm._l((_vm.ratings), function(rating) {
	    return _c('label', {
	      staticClass: "star-rating__star",
	      class: {
	        'is-selected': ((_vm.value >= rating) && _vm.value != null), 'is-disabled': _vm.disabled
	      },
	      on: {
	        "mouseover": function($event) {
	          return _vm.star_over(rating)
	        },
	        "mouseout": _vm.star_out,
	        "click": function($event) {
	          return _vm.set(rating)
	        }
	      }
	    }, [_c('input', {
	      directives: [{
	        name: "model",
	        rawName: "v-model",
	        value: (_vm.value),
	        expression: "value"
	      }],
	      staticClass: "star-rating star-rating__checkbox",
	      attrs: {
	        "type": "radio",
	        "name": _vm.name,
	        "required": _vm.required,
	        "id": _vm.$index + 1,
	        "disabled": _vm.disabled
	      },
	      domProps: {
	        "value": rating,
	        "checked": _vm._q(_vm.value, rating)
	      },
	      on: {
	        "change": function($event) {
	          _vm.value = rating
	        }
	      }
	    }), _vm._v(" "), _c('div', {
	      staticClass: "fa",
	      class: {
	        'under-line': _vm.isActive, 'confounded': (rating === 1), 'worried': (rating === 2), 'neutral_face': (rating === 3), 'relieved': (rating === 4), 'smiley': (rating === 5)
	      },
	      attrs: {
	        "aria-hidden": "true"
	      },
	      on: {
	        "click": function($event) {
	          _vm.isActive = !_vm.isActive
	        }
	      }
	    })])
	  }), 0)
	},staticRenderFns: []}

/***/ }),
/* 407 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "container below-nav"
	  }, [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 "
	  }, [_c('h1', {
	    staticClass: "text-center login-title"
	  }, [_vm._v("Sign in to continue (test: w@w.com, 123456)")]), _vm._v(" "), _c('div', {
	    staticClass: "account-wall"
	  }, [_c('img', {
	    staticClass: "profile-img",
	    attrs: {
	      "src": __webpack_require__(227),
	      "alt": ""
	    }
	  }), _vm._v(" "), _c('form', {
	    staticClass: "form-signin",
	    on: {
	      "submit": function($event) {
	        $event.preventDefault();
	        return _vm.signin(_vm.user)
	      }
	    }
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.user.email),
	      expression: "user.email"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "email",
	      "placeholder": "Email",
	      "autofocus": ""
	    },
	    domProps: {
	      "value": (_vm.user.email)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.user, "email", $event.target.value)
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.user.password),
	      expression: "user.password"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "placeholder": "Password",
	      "type": "password"
	    },
	    domProps: {
	      "value": (_vm.user.password)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.user, "password", $event.target.value)
	      }
	    }
	  })]), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-lg btn-success btn-block",
	    attrs: {
	      "type": "submit"
	    }
	  }, [_vm._v("\n            Sign in\n          ")]), _vm._v(" "), (_vm.error) ? _c('p', {
	    staticClass: "text-danger error"
	  }, [_vm._v(_vm._s(_vm.error))]) : _vm._e()]), _vm._v(" "), _c('router-link', {
	    staticClass: "text-center new-account",
	    staticStyle: {
	      "color": "blue"
	    },
	    attrs: {
	      "to": {
	        name: 'signup'
	      }
	    }
	  }, [_vm._v("Dont have an account yet? Create one!\n      ")])], 1)])])])
	},staticRenderFns: []}

/***/ }),
/* 408 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('section', {
	    staticClass: "contact"
	  }, [_c('h3', {
	    staticClass: "title"
	  }, [_vm._v("Contact Us")]), _vm._v(" "), _c('hr', {
	    staticClass: "star-primary"
	  }), _vm._v(" "), _vm._m(0), _c('br'), _vm._v(" "), _c('form', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.shouldShowForm),
	      expression: "shouldShowForm"
	    }],
	    attrs: {
	      "name": "sentMessage",
	      "id": "contactForm"
	    },
	    on: {
	      "submit": function($event) {
	        $event.preventDefault();
	        return _vm.submitForm(_vm.contactDetails)
	      }
	    }
	  }, [_c('label', {
	    staticClass: "sr-only"
	  }, [_vm._v("Name")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.contactDetails.name),
	      expression: "contactDetails.name"
	    }],
	    attrs: {
	      "type": "text",
	      "placeholder": "Name",
	      "id": "name",
	      "required": "",
	      "data-validation-required-message": "Please enter your name."
	    },
	    domProps: {
	      "value": (_vm.contactDetails.name)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.contactDetails, "name", $event.target.value)
	      }
	    }
	  }), _vm._v(" "), _c('p', {
	    staticClass: "help-block text-danger"
	  }), _vm._v(" "), _c('label', {
	    staticClass: "sr-only"
	  }, [_vm._v("Email Address")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.contactDetails.email),
	      expression: "contactDetails.email"
	    }],
	    attrs: {
	      "type": "email",
	      "placeholder": "Email Address",
	      "id": "email",
	      "required": "",
	      "data-validation-required-message": "Please enter your email address."
	    },
	    domProps: {
	      "value": (_vm.contactDetails.email)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.contactDetails, "email", $event.target.value)
	      }
	    }
	  }), _vm._v(" "), _c('p', {
	    staticClass: "help-block text-danger"
	  }), _vm._v(" "), _c('label', {
	    staticClass: "sr-only"
	  }, [_vm._v("Phone Number")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.contactDetails.phone),
	      expression: "contactDetails.phone"
	    }],
	    attrs: {
	      "type": "tel",
	      "placeholder": "Phone Number",
	      "id": "phone",
	      "required": "",
	      "data-validation-required-message": "Please enter your phone number."
	    },
	    domProps: {
	      "value": (_vm.contactDetails.phone)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.contactDetails, "phone", $event.target.value)
	      }
	    }
	  }), _vm._v(" "), _c('p', {
	    staticClass: "help-block text-danger"
	  }), _vm._v(" "), _c('label', {
	    staticClass: "sr-only"
	  }, [_vm._v("Message")]), _vm._v(" "), _c('textarea', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.contactDetails.msg),
	      expression: "contactDetails.msg"
	    }],
	    attrs: {
	      "rows": "5",
	      "placeholder": "Message",
	      "id": "message",
	      "required": "",
	      "data-validation-required-message": "Please enter a message."
	    },
	    domProps: {
	      "value": (_vm.contactDetails.msg)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.contactDetails, "msg", $event.target.value)
	      }
	    }
	  }), _vm._v(" "), _c('p', {
	    staticClass: "help-block text-danger"
	  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
	    attrs: {
	      "id": "success"
	    }
	  }), _vm._v(" "), _vm._m(1)]), _vm._v(" "), _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (!_vm.shouldShowForm),
	      expression: "!shouldShowForm"
	    }],
	    staticClass: "formGreeting"
	  }, [_c('br'), _vm._m(2)])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('p', [_vm._v("Please share your thoughts with us."), _c('br'), _vm._v("We would appreciate your input. ")])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "row"
	  }, [_c('button', {
	    staticClass: "btn",
	    attrs: {
	      "type": "submit"
	    }
	  }, [_vm._v("Send")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('h3', [_vm._v(" You are adorable! "), _c('br'), _vm._v("Thanks for being such a great person")])
	}]}

/***/ }),
/* 409 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('section', {
	    staticClass: "below-nav2"
	  }, [_c('filtercom', {
	    on: {
	      "getMeals": function($event) {
	        _vm.filteredMeals = $event
	      }
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "calendar"
	  })], 1)
	},staticRenderFns: []}

/***/ }),
/* 410 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('section', {
	    staticClass: "video-chat below-nav"
	  }, [_c('h4', [_vm._v("Who do you want to call to?")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.targetUser),
	      expression: "targetUser"
	    }],
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.targetUser)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.targetUser = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-success",
	    on: {
	      "click": function($event) {
	        return _vm.connectRTC()
	      }
	    }
	  }, [_vm._v("Hello " + _vm._s(_vm.user.username) + ", place your call!")]), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-warning",
	    on: {
	      "click": _vm.toggleMuteOut
	    }
	  }, [_vm._v("mute me")]), _vm._v(" "), _c('video', {
	    ref: "videoDisplay",
	    staticClass: "video-display",
	    domProps: {
	      "muted": _vm.isMutedOut
	    }
	  }), _vm._v(" "), _c('video', {
	    ref: "videoDisplayInc",
	    staticClass: "video-display-incoming"
	  })])
	},staticRenderFns: []}

/***/ }),
/* 411 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('nav', {
	    staticClass: "navbar navbar-default"
	  }, [_c('div', {
	    staticClass: "wrapper"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.checkboxVal),
	      expression: "checkboxVal"
	    }],
	    ref: "checkbox",
	    attrs: {
	      "id": "nav-bar-mobile-checkbox",
	      "type": "checkbox"
	    },
	    domProps: {
	      "checked": Array.isArray(_vm.checkboxVal) ? _vm._i(_vm.checkboxVal, null) > -1 : (_vm.checkboxVal)
	    },
	    on: {
	      "change": function($event) {
	        var $$a = _vm.checkboxVal,
	          $$el = $event.target,
	          $$c = $$el.checked ? (true) : (false);
	        if (Array.isArray($$a)) {
	          var $$v = null,
	            $$i = _vm._i($$a, $$v);
	          if ($$el.checked) {
	            $$i < 0 && (_vm.checkboxVal = $$a.concat([$$v]))
	          } else {
	            $$i > -1 && (_vm.checkboxVal = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
	          }
	        } else {
	          _vm.checkboxVal = $$c
	        }
	      }
	    }
	  }), _vm._v(" "), _c('label', {
	    staticClass: "nav-bar-mobile-icon fa nav-icon4",
	    class: {
	      open: _vm.checkboxVal
	    },
	    attrs: {
	      "for": "nav-bar-mobile-checkbox",
	      "aria-hidden": "true"
	    }
	  }, [_c('span'), _vm._v(" "), _c('span'), _vm._v(" "), _c('span')]), _vm._v(" "), _c('router-link', {
	    staticClass: "navbar-brand",
	    attrs: {
	      "to": "/",
	      "exact": ""
	    },
	    nativeOn: {
	      "click": function($event) {
	        return _vm.closeMenu($event)
	      }
	    }
	  }, [_vm._v("Feel My Meal\n      "), _c('img', {
	    staticClass: "navbar-logo",
	    class: {
	      sporty: _vm.isLoggedIn
	    },
	    attrs: {
	      "src": _vm.logoSrc
	    }
	  })]), _vm._v(" "), _c('transition', {
	    attrs: {
	      "name": "fade-long"
	    }
	  }, [_c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.checkboxVal),
	      expression: "checkboxVal"
	    }],
	    staticClass: "close-menu-mask",
	    on: {
	      "click": _vm.closeMenu
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "nav-bar_container",
	    on: {
	      "click": _vm.closeMenu
	    }
	  }, [(_vm.isLoggedIn) ? _c('ul', {
	    staticClass: "nav navbar-nav"
	  }, [_c('li', [_c('router-link', {
	    attrs: {
	      "to": {
	        name: 'video-chat'
	      }
	    }
	  }, [_vm._v("VC")])], 1), _vm._v(" "), _c('li', [_c('router-link', {
	    attrs: {
	      "to": {
	        name: 'my-meals'
	      }
	    }
	  }, [_vm._v("My Schedule")])], 1), _vm._v(" "), _c('li', [_c('router-link', {
	    attrs: {
	      "to": {
	        name: 'my-statistics'
	      }
	    }
	  }, [_vm._v("My Statistics")])], 1), _vm._v(" "), _c('li', [_c('router-link', {
	    attrs: {
	      "to": {
	        name: 'chat'
	      }
	    }
	  }, [_vm._v("Chat")])], 1)]) : _vm._e(), _vm._v(" "), _c('ul', {
	    staticClass: "nav navbar-nav navbar-right"
	  }, [(_vm.isLoggedIn) ? _c('li', [_c('router-link', {
	    attrs: {
	      "to": {
	        name: 'settings'
	      }
	    }
	  }, [_vm._v("Settings")])], 1) : _vm._e(), _vm._v(" "), (!_vm.isLoggedIn) ? _c('li', [_c('router-link', {
	    attrs: {
	      "to": {
	        name: 'signin'
	      }
	    }
	  }, [_vm._v("Sign in")])], 1) : _vm._e(), _vm._v(" "), (!_vm.isLoggedIn) ? _c('li', [_c('router-link', {
	    attrs: {
	      "to": {
	        name: 'signup'
	      }
	    }
	  }, [_vm._v("Sign up")])], 1) : _vm._e(), _vm._v(" "), (_vm.isLoggedIn) ? _c('li', [_c('a', {
	    attrs: {
	      "href": "#"
	    },
	    on: {
	      "click": _vm.signout
	    }
	  }, [_vm._v("Sign out")])]) : _vm._e()])])], 1)])
	},staticRenderFns: []}

/***/ }),
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 418 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 419 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 420 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ })
]);
//# sourceMappingURL=app.c13b4812af3ba108fc4c.js.map