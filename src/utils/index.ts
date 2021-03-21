import { fas } from '@fortawesome/free-solid-svg-icons';

const icons = Object.keys(fas);

export function getRandomCount(min = Number.MIN_VALUE, max = Number.MAX_VALUE) {
	return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomIcon() {
	return fas[icons[icons.length * Math.random() << 0]].iconName;
}
