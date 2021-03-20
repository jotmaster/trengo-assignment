import Vue from 'vue';
import Component from 'vue-class-component';
import Template from './template.vue';

@Component({
	name: 'app',
})
export default class App extends Vue.extend(Template) {
}
