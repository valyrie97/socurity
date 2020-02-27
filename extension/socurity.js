
const initEvent = {
	source: 'socurity',
	event: 'loaded',
	version: '0.0.1'
};
window.postMessage(initEvent, '*');
