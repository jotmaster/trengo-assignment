import App from '@root/components/App';
import store from '@root/store';
import Vue from 'vue';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@root/styles';
import 'tailwindcss/dist/tailwind.min.css';

Vue.config.productionTip = false;

new Vue({
	store,
	render: h => h(App),
}).$mount('#app');
