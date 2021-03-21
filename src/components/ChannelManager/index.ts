import { Channel } from '@root/store';
import * as utils from '@root/utils';
import Vue from 'vue';
import Component from 'vue-class-component';
import Template from './template.vue';

type ReorderItem = {
	channelTitle: string;
	newIndex: number;
}

@Component({
	name: 'channel-manager',
})
export default class ChannelManager extends Vue.extend(Template) {
	protected get channelsModified() {
		return JSON.stringify(this.originalChannels) !== JSON.stringify(this.channels);
	}
	protected get filteredChannels() {
		return this.channels.filter(channel => channel.title.toLowerCase().includes(this.filterOrNewChannel.toLowerCase()));
	}
	private channelDragging?: Channel;
	protected channels: Channel[] = [];
	protected filterOrNewChannel = '';
	protected originalChannels: Channel[] = [];

	private close() {
		this.$emit('close');
	}

	protected created() {
		this.channels = [...this.$store.state.channels];
		this.originalChannels = [...this.$store.state.channels];
	}

	protected onApplyClick() {
		this.$store.dispatch('updateChannels', this.channels);
		this.close();
	}

	protected onCancelClick() {
		this.close();
	}

	protected onChannelInputClick() {
		(this.$refs.channelInput as HTMLInputElement).focus();
	}

	protected onDragEnd() {
		this.channelDragging = undefined;
	}

	protected onDragOver(event: DragEvent, index: number) {
		const channelItemHeight = (event.currentTarget as HTMLElement | null)?.offsetHeight;

		if (channelItemHeight && this.channelDragging) {
			if (event.offsetY < (channelItemHeight / 2)) {
				this.reorderChannel({ channelTitle: this.channelDragging.title, newIndex: index } as ReorderItem);
			} else {
				this.reorderChannel({ channelTitle: this.channelDragging.title, newIndex: index + 1 } as ReorderItem);
			}
		}
	}

	protected onDragStart(event: DragEvent, channel: Channel) {
		const element = document.elementFromPoint(event.clientX, event.clientY);

		if (!element?.matches('.channel-dragger') && !element?.parentElement?.matches('.channel-dragger')) {
			event.preventDefault();
			return;
		}

		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'move';
			event.dataTransfer.effectAllowed = 'move';
			this.channelDragging = channel;
		}
	}

	protected onChannelInputEnter() {
		const alreadyExists = !!this.channels.find(channel => channel.title.toLowerCase() === this.filterOrNewChannel.toLowerCase());

		if (!alreadyExists) {
			this.channels.push({
				icon: utils.getRandomIcon(),
				title: this.filterOrNewChannel,
			})
			this.filterOrNewChannel = '';
		}
	}

	protected onRemoveClick(index: number) {
		this.channels.splice(index, 1);
	}

	private reorderChannel(reorderItem: ReorderItem) {
		const item = this.channels.find(channel => channel.title === reorderItem.channelTitle);

		if (item) {
			this.channels.splice(this.channels.indexOf(item), 1);
			this.channels.splice(reorderItem.newIndex, 0, item);
		}
	}
}