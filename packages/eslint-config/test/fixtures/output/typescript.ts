import assert from 'node:assert'

import { type Bar, baz } from 'Bar'

import type { Foo } from 'Foo'

import { A, a, B, b, C, c } from '~/alphabet'

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
