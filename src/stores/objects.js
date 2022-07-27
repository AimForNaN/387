import { shallowReactive } from 'vue';
import {
	defineStore
} from 'pinia';
import { v5 as uuidv5 } from 'uuid';

export const useObjectStore = defineStore({
	id: 'objects',
	state: () => ({
		Objects: new Map(),
	}),
	actions: {
		addImage() {
			var {uuid} = this;

			var img = new Img();
			img.classList.add('image');
			img.name = 'Image';
			div.id = uuid;

			var {style} = img;
			style.left = 0;
			style.top = 0;

			this.Objects.set(uuid, img);
		},
		addRect() {
			var {uuid} = this;

			var div = document.createElement('div');
			div.classList.add('rect');
			div.name = 'Rect';
			div.id = uuid;

			var {style} = div;
			style.backgroundColor = 'black';
			style.left = 0;
			style.top = 0;
			style.height = 100;
			style.width  = 100;

			this.Objects.set(uuid, div);
		},
	},
	getters: {
		uuid(state) {
			var uuid = uuidv5();
			while (state.Objects.has(uuid)) {
				uuid = uuidv5();
			}
			return uuid;
		},
	},
});
