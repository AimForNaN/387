import { shallowReactive } from 'vue';
import {
	defineStore
} from 'pinia';

import anime from 'animejs/lib/anime.es.js';
import { v4 as uuidv4 } from 'uuid';

export const useObjectStore = defineStore({
	id: 'objects',
	state: () => ({
		ActiveObject: null,
		Objects: new Map(),
		Timeline: anime.timeline({
			autoplay: false,
		}),
	}),
	actions: {
		addImage() {
			var {uuid} = this;

			var img = new Img();
			img.className = 'image';
			img.name = 'Image';
			img.id = uuid;

			var {style} = img;
			style.position = 'relative';
			style.left = '0px';
			style.top = '0px';
			style.zIndex = this.Objects.size;

			this.Objects.set(uuid, img);
		},
		addNode(obj) {
			this.Timeline.add({
				targets: `[id="${obj.id}"]`,
				duration: 1000,
			});
		},
		addRect() {
			var {uuid} = this;

			var div = document.createElement('div');
			div.className = 'rect';
			div.name = 'Rect';
			div.id = uuid;

			var {style} = div;
			style.background = 'black';
			style.display = 'inline-block';
			style.position = 'relative';
			style.left = '0px';
			style.top = '0px';
			style.height = '100px';
			style.width  = '100px';
			style.zIndex = this.Objects.size;

			this.Objects.set(uuid, div);
		},
		moveUp(obj) {},
		removeObject(obj) {
			if (this.ActiveObject && this.ActiveObject.id == obj.id) {
				this.ActiveObject = null;
			}
			this.Objects.delete(obj.id);
		},
		setActiveObject(obj) {
			if (this.Objects.has(obj.id)) {
				this.ActiveObject = obj;
			} else {
				this.ActiveObject = null;
			}
		},
	},
	getters: {
		ObjectList(state) {
			return Array.from(state.Objects.values());
		},
		uuid(state) {
			var uuid = uuidv4();
			while (state.Objects.has(uuid)) {
				uuid = uuidv4();
			}
			return uuid;
		},
	},
});
