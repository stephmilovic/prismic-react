import flux from 'flux-react';
import actions from './actions.js';
import { Prismic } from 'prismic.io';

module.exports = flux.createStore({
	endpoint: 'http://pliskovicparty.prismic.io/api',
	prismicApi: '',
	eventInfo: '',
	accessToken: null,
	actions: [
		actions.loadPageData,
		actions.loadEventInfo
	],
	loadPageData() {

		return new Promise((resolve, reject) => {
			Prismic.Api(this.endpoint, (err, api) => {
				if (err) {
					reject(err);
				} else {
					resolve(api);
					this.prismicApi = api;
					this.loadEventInfo();
					this.emit('event_loadApi');
				}
			}, this.accessToken);
		});
	},
	loadEventInfo() {
		this.prismicApi.form('everything').query(Prismic.Predicates.at('document.type', 'event-info')).ref(this.prismicApi.master()).submit((err, res) => {
			this.eventInfo = res.results[0];
			this.emit('event_loadEventInfo');
		});
	},
	exports: {
		getPrismicApi() {
			return this.prismicApi;
		},
		getEventInfo() {
			return this.eventInfo;
		}
	}
});
