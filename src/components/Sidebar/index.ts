import Vue from 'vue';
import Component from 'vue-class-component';
import Template from './template.vue';

type List = {
	actions?: ListAction[];
	children?: ListChild[];
	expanded?: boolean;
	title: string;
}
type ListAction = {
	action: string;
	click: (...args: any[]) => any;
	icon: string;
}
type ListChild = {
	count?: number;
	icon?: string;
	title: string;
}

@Component({
	name: 'sidebar',
})
export default class Sidebar extends Vue.extend(Template) {
	protected categories: List[] = [
		{
			title: 'Inbox',
			children: [
				{
					count: 17,
					icon: 'inbox',
					title: 'New',
				},
				{
					count: 110,
					icon: 'user-friends',
					title: 'Assigned',
				},
				{
					icon: 'check',
					title: 'Closed',
				},
				{
					icon: 'exclamation-circle',
					title: 'Spam',
				},
			],
			expanded: true,
		},
		{
			title: 'Personal'
		},
		{
			title: 'Teams'
		},
		{
			title: 'Channels',
			actions: [
				{
					action: 'popup',
					click: () => this.$emit('channels-click'),
					icon: 'ellipsis-h',
				},
				{
					action: 'add',
					click: () => { },
					icon: 'plus',
				}
			],
			children: this.$store.state.channels,
			expanded: true,
		},
	];

	protected created() {
		this.$store.subscribeAction((action) => {
			if (action.type === 'channelsUpdated') {
				const channelsCategory = this.categories.find(category => category.title === 'Channels') as List;
				channelsCategory.children = this.$store.state.channels;
			}
		});
	}

	protected onCategoryClick(category: List) {
		category.expanded = !category.expanded;
	}
}
