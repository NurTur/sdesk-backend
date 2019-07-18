const forward = require(`$home/misc/forward`)
class Reference {
	constructor() {
		this.uri = `api/v1/`
		this.store = [
			{data: [], url: `cities`},
			{data: [], url: `service-types`},
			{data: [], url: `statuses`},
			{data: [], url: `types`},
			{data: [], url: `vendors`},
			{data: [], url: `devices`}
		]
	}
	async fetch(ref) {
		const url = this.uri + ref.url
		const query = {checksum: ref.checksum}
		const html = await forward.get(`ts`, url, query)
		ref.checksum = html.headers[`Data-Check-Sum`] || ref.checksum
		html.statusCode === 200 && (ref.data = JSON.parse(html.body))
	}
	async get(hash = ``) {
		const checksums = Buffer.from(hash, `base64`).toString().split(`;`)
		const fetching = this.store.map((item, idx) => {
			item.checksum = checksums[idx] || 0
			return this.fetch(item)
		})
		await Promise.all(fetching)
		const result = this.store
			.reduce((all, next) => {
				next.data.length && (all[next.url] = next.data)
				return all
			}, {})
		if (!Object.keys(result).length) {
			return null
		}
		const all = this.store.map(item => item.checksum).join(`;`)
		result.hash = Buffer.from(all).toString(`base64`)
		return result
	}
}

module.exports = Reference
