import { C, c, B, b, A, a  } from '~/alphabet'
import { Foo } from 'Foo'
import { baz, Bar } from 'Bar'
import assert from 'node:assert'

assert({
  A,
  B,
  C,
  a,
  b,
  c,
  foo: {} as Foo,
  bar: {} as Bar,
  baz,
})
