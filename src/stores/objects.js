import { shallowReactive, unref } from 'vue';
import {
	defineStore
} from 'pinia';

import anime from 'animejs/lib/anime.es.js';
import { v4 as uuidv4 } from 'uuid';

import Node from './../lib/Node.js';

export const useObjectStore = defineStore({
	id: 'objects',
	state: () => ({
		ActiveObject: null,
		Objects: new Map(),
		Nodes: new Map(),
	}),
	actions: {
		addImage() {
			var {uuid} = this;

			var img = document.createElement('img');
			img.className = 'image';
			img.name = 'Image';
			img.id = uuid;

			var {style} = img;
			style.position = 'absolute';
			style.left = '0px';
			style.top = '0px';
			style.zIndex = this.Objects.size;

			this.Objects.set(uuid, img);
		},
		addNode(obj) {
			var {Nodes, Timeline} = this;
			if (!Nodes.has(obj.id)) {
				Nodes.set(obj.id, []);
			}
			var arr = Nodes.get(obj.id);
			arr.push(new Node({
				duration: 1000,
				offset: Timeline.duration,
			}));
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
			style.position = 'absolute';
			style.left = '0px';
			style.top = '0px';
			style.height = '100px';
			style.width  = '100px';
			style.zIndex = this.Objects.size;

			this.Objects.set(uuid, div);
		},
		getNodes(obj) {
			return this.Nodes.get(obj.id) ?? [];
		},
		moveUp(obj) {},
		removeObject(obj) {
			if (this.ActiveObject && this.ActiveObject.id == obj.id) {
				this.ActiveObject = null;
			}
			this.Nodes.delete(obj.id);
			this.Objects.delete(obj.id);
		},
		setActiveObject(obj) {
			if (this.Objects.has(obj.id)) {
				this.ActiveObject = obj;
			} else if (obj instanceof Node) {
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
		Timeline(state) {
			var t = anime.timeline({
				autoplay: false,
			});
			Array.from(state.Nodes.entries()).forEach(([target, nodes]) => {
				nodes.forEach((params) => {
					var {
						offset,
						...other
					} = unref(params);
					var targets = state.Objects.get(target);
					t.add({
						targets,
						...other,
					}, offset);
				});
			});
			return t;
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
