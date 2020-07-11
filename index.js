const fs = require('fs')
const path = require('path')

function query(dir, reg, filelist) {
	let list = fs.readdirSync(dir)
	list.forEach(item => {
		const fpath = path.resolve(dir, item)
		if (fs.statSync(fpath).isDirectory()) {
			query(fpath, reg, filelist)
		} else {
			if (reg.test(fpath)) {
				filelist.push(fpath)
			}
		}
	})
	return filelist
}

function verification(dir, suffix) {
	if (!dir || !suffix) {
		return false
	}

	let bool = fs.existsSync(dir)
	if (!bool) {
		return false
	}

	return true
}

module.exports = {
	 select(dir, suffix) {
		
		if (!verification(dir, suffix)) {
			return []
		}

		let reg = new RegExp(`\.${suffix}$`, `i`)
		return query(dir, reg, [])
	},

	advanceSelect(dir, regExp) {

		if (!verification(dir, regExp)) {
			return []
		}

		return query(dir, regExp, [])
	}
}