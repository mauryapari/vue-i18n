import { getText, url } from '../helper'
;['composition', 'petite'].forEach(pattern => {
  describe(`${pattern}`, () => {
    beforeAll(async () => {
      await page.goto(url(`/examples/${pattern}/scope/local.html`))
    })

    test('initial rendering', async () => {
      expect(await getText(page, '#app p.parent')).toMatch('こんにちは、世界！')
      expect(await getText(page, '#app p.child')).toMatch('やあ！')
    })

    test('change locale', async () => {
      // root
      await page.selectOption('#app select', 'en')
      expect(await getText(page, '#app p.parent')).toMatch('hello world!')
      expect(await getText(page, '#app p.child')).toMatch('Hi there!')

      // Child
      await page.selectOption('#app div.child select', 'ja')
      expect(await getText(page, '#app p.parent')).toMatch('hello world!')
      expect(await getText(page, '#app p.child')).toMatch('やあ！')
    })
  })
})
