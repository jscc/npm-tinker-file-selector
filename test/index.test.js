const assert = require('assert')
const selector = require('../index')
const path = require('path')

describe('文件选择器', function() {
  describe('.select(dir, fileReg)', function() {
    it('参数传递不匹配时返回空数组', function() {
      assert.equal(Array.isArray(selector.select()), true)
    })

    it (`验证正常状态下获取文件列表`, function() {
      let filelist = selector.select(path.resolve(__dirname, './index.test.dir'),`js`)
      assert.equal(filelist.length, 2)
    })

    it (`高级筛选-自定义筛选条件`, function() {
      let filelist = selector.advanceSelect(path.resolve(__dirname, './index.test.dir'),/\.js$/i)
      assert.equal(filelist.length, 2)
    })
  })

})