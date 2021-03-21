<template lang="pug">
	div.border-gray-200.border-l-2.flex.flex-col.sidebar
		div(
			:class="{ 'category--expanded': category.expanded }",
			:data-title="category.title.toLowerCase()",
			:key="category.title",
			v-for="(category, index) in categories",
		).flex.flex-col.category
			div.cursor-pointer.flex.h-10.items-center
				div(@click="onCategoryClick(category)").flex.justify-center.min-w-10.expanded-icon
					i.fas.fa-chevron-right
				div(@click="onCategoryClick(category)").flex.flex-grow.font-bold {{ category.title }}
				div.flex.justify-end.text-gray-400
					div(
						:data-action="action.action",
						:key="index",
						@click="action.click",
						v-if="category.actions",
						v-for="(action, index) in category.actions",
					).flex.justify-center.w-8
						i(:class="{ [`fa-${action.icon}`]: true }").fas
			div(
				:data-title="children.title.toLowerCase()",
				:key="children.title",
				v-for="(children, index) in category.children",
				v-if="category.children",
				v-show="category.expanded",
			).flex.h-10.items-center.mx-10.text-gray-600.category-child
				div.flex.justify-center.min-w-10
					i(:class="{ [`fa-${children.icon}`]: true }").fas
				div(:title="children.title").flex-grow.overflow-ellipsis.overflow-hidden.whitespace-nowrap {{ children.title }}
				div.flex.justify-end.text-sm.min-w-10 {{ children.count }}
</template>
<style lang="scss">
.sidebar {
	.category {
		&.category--expanded {
			.expanded-icon {
				transform: rotate(90deg);
			}
		}
	}
}
</style>