import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'
import dateFilter from './filters/date';
import currencyFilter from './filters/currency.filter';
import localizeFilter from './filters/localize.filter';
import tooltipDirective from './directives/tolltip.directive';
import messagePlugin from '../src/utils/message.plugin';
import Loader from '../src/components/app/Loader';
import 'materialize-css/dist/js/materialize.min';
import './registerServiceWorker'

import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'
import Paginate from 'vuejs-paginate'



Vue.config.productionTip = false;
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);
Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.component('Loader', Loader);
Vue.directive('tooltip', tooltipDirective);
Vue.component('Paginate', Paginate);


const firebaseConfig = {
  apiKey: "AIzaSyC8iqIVm1wgutHG3V-I8IXwbxfXHJ35SQM",
  authDomain: "bugalteria-vue.firebaseapp.com",
  databaseURL: "https://bugalteria-vue.firebaseio.com",
  projectId: "bugalteria-vue",
  storageBucket: "bugalteria-vue.appspot.com",
  messagingSenderId: "81965835410",
  appId: "1:81965835410:web:622d327f1cc68f00ea324b"
};

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});




