<template lang="pug">
	div.border-gray-200.border-4.flex.flex-col.p-4.channel-manager
		div.flex.font-bold.items-center.mb-2.text-2xl
			div.flex-grow Channels
			i(@click="close").cursor-pointer.fas.fa-window-close
		div(@click="onChannelInputClick").border-2.border-gray-200.flex.h-10.items-center.rounded-full.text-gray-700
			div.flex.justify-center.min-w-10.text-gray-400
				i.fas.fa-search
			input(
				@keyup.enter="onChannelInputEnter",
				placeholder="Add channels",
				ref="channelInput",
				v-model="filterOrNewChannel",
			).outline-none.channel-input
		div.border-b-2.flex.flex-col.py-4
			div(
				:data-title="channel.title.toLowerCase()",
				:draggable="!filterOrNewChannel",
				:key="channel.title",
				@dragend="onDragEnd",
				@dragover="onDragOver($event, index)",
				@dragstart="onDragStart($event, channel)",
				v-for="(channel, index) in channels",
				v-show="filteredChannels.includes(channel)",
			).flex.h-10.items-center.text-gray-600.channel-item
				div.cursor-move.flex.justify-center.min-w-4.select-none.text-gray-300.channel-dragger
					i(v-show="!filterOrNewChannel").fas.fa-grip-vertical
				div.flex.justify-center.min-w-10
					i(:class="{ [`fa-${channel.icon}`]: true }").fas
				div(:title="channel.title").flex-grow.overflow-ellipsis.overflow-hidden.whitespace-nowrap.channel-title {{ channel.title }}
				button(
					@click="onRemoveClick(index)",
					class="focus:outline-none",
				).font-bold.ml-4.text-sm.remove-channel Remove
		div(v-show="channelsModified").flex.justify-end.pt-4
			button(
				data-action="cancel",
				class="focus:outline-none mr-1.5 py-0.5",
				@click="onCancelClick",
			).border-2.border-gray-100.font-bold.px-5.rounded-full.text-gray-600 Cancel
			button(
				data-action="apply",
				class="focus:outline-none ml-1.5 py-0.5",
				@click="onApplyClick",
			).bg-black.border-2.border-transparent.font-bold.px-5.rounded-full.text-white Apply
</template>