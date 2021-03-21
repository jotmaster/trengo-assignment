import Vue from 'vue';
import Vuex from 'vuex';
import * as utils from '@root/utils';

export type Channel = {
	count?: number;
	icon?: string;
	title: string;
}

Vue.use(Vuex);

export default new Vuex.Store<{ channels: Channel[] }>({
	state: {
		channels: [
			{
				count: utils.getRandomCount(1, 100),
				icon: utils.getRandomIcon(),
				title: 'Team@trengo.com',
			},
			{
				count: utils.getRandomCount(1, 100),
				icon: utils.getRandomIcon(),
				title: 'Call center',
			},
			{
				count: utils.getRandomCount(1, 100),
				icon: utils.getRandomIcon(),
				title: 'Whatsapp Business',
			},
			{
				count: utils.getRandomCount(1, 100),
				icon: utils.getRandomIcon(),
				title: '(test) development California',
			},
			{
				count: utils.getRandomCount(1, 100),
				icon: utils.getRandomIcon(),
				title: 'Whatsapp Business Iceland',
			},
		]
	},
	mutations: {
		updateChannels(state, channels: Channel[]) {
			state.channels = channels;
		},
	},
	actions: {
		channelsUpdated() {

		},
		updateChannels({ commit, dispatch }, channels: Channel[]) {
			commit('updateChannels', channels);
			dispatch('channelsUpdated');
		},
	},
	modules: {
	}
});