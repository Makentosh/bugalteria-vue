import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'
import dateFilter from './components/filters/date';
import messagePlugin from '../src/utils/message.plugin';
import 'materialize-css/dist/js/materialize.min';
import './registerServiceWorker'

import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'


Vue.config.productionTip = false;
Vue.filter('date', dateFilter);
Vue.use(Vuelidate);
Vue.use(messagePlugin);


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




