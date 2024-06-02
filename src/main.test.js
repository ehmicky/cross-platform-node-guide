import test from 'ava'

test('Newlines inside template strings', (t) => {
  t.is(
    `a
b`,
    'a\nb',
  )
})
