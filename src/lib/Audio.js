import Node from './Node.js';

export default class Audio extends Node {
    constructor(params = {}) {
        super(Object.assign(params, {
            id: 'Audio',
            name: 'Audio',
            src: '',
        }));
    }
}
