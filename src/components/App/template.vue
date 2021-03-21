<template lang="pug">
	div#app
		div.assignment-title Trengo Assignment
		div.mx-auto.w-80
			sidebar(
				@channels-click="onSidebarChannelsClick",
				v-show="!isChannelManagerOpen",
			)
			channel-manager(
				@close="onChannelManagerClose",
				v-if="isChannelManagerOpen",
			)
</template>
<style lang="scss">
div.assignment-title {
	display: flex;
	font-size: 40px;
	justify-content: center;
	margin: 16px auto;
}
</style>