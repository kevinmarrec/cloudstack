import assert from 'node:assert'

import { type Bar, baz } from 'Bar'
import type { Foo } from 'Foo'

import { A, B, C, a, b, c } from '~/alphabet'

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
  regex: /foo/u,
})
