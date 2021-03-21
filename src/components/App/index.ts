import ChannelManager from '@root/components/ChannelManager';
import Sidebar from '@root/components/Sidebar';
import Vue from 'vue';
import Component from 'vue-class-component';
import Template from './template.vue';

@Component({
	name: 'app',
	components: {
		ChannelManager,
		Sidebar,
	},
})
export default class App extends Vue.extend(Template) {
	protected isChannelManagerOpen = false;

	protected onChannelManagerClose() {
		this.isChannelManagerOpen = false;
	}

	protected onSidebarChannelsClick() {
		this.isChannelManagerOpen = true;
	}
}
