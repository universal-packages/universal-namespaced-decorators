import { loadModules } from '@universal-packages/module-loader'

import { getNamespace } from '../src'
import ExcellentClass from './__fixtures__/namespace1/ExcellentClass'
import GoodClass from './__fixtures__/namespace1/GoodClass'
import ExcellentClass2 from './__fixtures__/namespace2/ExcellentClass2'
import GoodClass2 from './__fixtures__/namespace2/GoodClass2'

describe('namespaced-decorators', (): void => {
  describe('getNamespace', (): void => {
    it('gets a registered namespace and additionally can take an array of module registries to calculate class registries', async (): Promise<void> => {
      const modules = await loadModules('./tests/__fixtures__')

      expect(await getNamespace('namespace1', modules)).toEqual({
        name: 'namespace1',
        classes: [
          {
            name: 'ExcellentClass',
            decorations: [
              { __type: 'ClassDecoratorB', extra: 'B' },
              { __type: 'ClassDecoratorA', extra: 'A' }
            ],
            location: expect.stringMatching(/__fixtures__\/namespace1\/ExcellentClass.ts/),
            target: ExcellentClass,
            accessors: [
              {
                decorations: [
                  { __type: 'AccessorDecoratorB', extra: 'B' },
                  { __type: 'AccessorDecoratorA', extra: 'A' }
                ],
                propertyKey: 'getterA'
              },
              {
                decorations: [
                  { __type: 'AccessorDecoratorB', extra: 'B' },
                  { __type: 'AccessorDecoratorA', extra: 'A' }
                ],
                propertyKey: 'setterA'
              }
            ],
            methods: [
              {
                propertyKey: 'methodA',
                decorations: [
                  { __type: 'MethodDecoratorB', extra: 'B' },
                  { __type: 'MethodDecoratorA', extra: 'A' }
                ],
                arguments: [
                  {
                    index: 1,
                    decorations: [
                      { __type: 'ArgumentDecoratorB', extra: 'B' },
                      { __type: 'ArgumentDecoratorA', extra: 'A' }
                    ]
                  },
                  {
                    index: 0,
                    decorations: [
                      { __type: 'ArgumentDecoratorB', extra: 'B' },
                      { __type: 'ArgumentDecoratorA', extra: 'A' }
                    ]
                  }
                ]
              }
            ],
            properties: [
              {
                propertyKey: 'propertyA',
                decorations: [
                  { __type: 'PropertyDecoratorB', extra: 'B' },
                  { __type: 'PropertyDecoratorA', extra: 'A' }
                ]
              },
              { propertyKey: 'propertyB', decorations: [{ __type: 'readonly', extra: 'only' }] }
            ]
          },
          {
            name: 'GoodClass',
            decorations: [
              { __type: 'ClassDecoratorB', extra: 'B' },
              { __type: 'ClassDecoratorA', extra: 'A' }
            ],
            location: expect.stringMatching(/__fixtures__\/namespace1\/GoodClass.ts/),
            target: GoodClass,
            accessors: [
              {
                decorations: [
                  { __type: 'AccessorDecoratorB', extra: 'B' },
                  { __type: 'AccessorDecoratorA', extra: 'A' }
                ],
                propertyKey: 'getterA'
              },
              {
                decorations: [
                  { __type: 'AccessorDecoratorB', extra: 'B' },
                  { __type: 'AccessorDecoratorA', extra: 'A' }
                ],
                propertyKey: 'setterA'
              }
            ],
            methods: [
              {
                propertyKey: 'methodA',
                decorations: [
                  { __type: 'MethodDecoratorB', extra: 'B' },
                  { __type: 'MethodDecoratorA', extra: 'A' }
                ],
                arguments: [
                  {
                    index: 1,
                    decorations: [
                      { __type: 'ArgumentDecoratorB', extra: 'B' },
                      { __type: 'ArgumentDecoratorA', extra: 'A' }
                    ]
                  },
                  {
                    index: 0,
                    decorations: [
                      { __type: 'ArgumentDecoratorB', extra: 'B' },
                      { __type: 'ArgumentDecoratorA', extra: 'A' }
                    ]
                  }
                ]
              }
            ],
            properties: [
              {
                propertyKey: 'propertyA',
                decorations: [
                  { __type: 'PropertyDecoratorB', extra: 'B' },
                  { __type: 'PropertyDecoratorA', extra: 'A' }
                ]
              },
              { propertyKey: 'propertyB', decorations: [{ __type: 'readonly', extra: 'only' }] }
            ]
          }
        ],
        importedModules: expect.any(Array)
      })

      expect(await getNamespace('namespace2', './tests/__fixtures__')).toEqual({
        name: 'namespace2',
        classes: [
          {
            name: 'ExcellentClass2',
            decorations: [{ __type: 'ClassDecoratorA', extra: 'A' }],
            location: expect.stringMatching(/__fixtures__\/namespace2\/ExcellentClass2.ts/),
            target: ExcellentClass2,
            accessors: [
              {
                decorations: [{ __type: 'AccessorDecoratorA', extra: 'A' }],
                propertyKey: 'getterA'
              },
              {
                decorations: [{ __type: 'AccessorDecoratorA', extra: 'A' }],
                propertyKey: 'setterA'
              }
            ],
            methods: [
              {
                propertyKey: 'methodA',
                decorations: [{ __type: 'MethodDecoratorA', extra: 'A' }],
                arguments: [
                  {
                    index: 1,
                    decorations: [{ __type: 'ArgumentDecoratorA', extra: 'A' }]
                  },
                  {
                    index: 0,
                    decorations: [{ __type: 'ArgumentDecoratorA', extra: 'A' }]
                  }
                ]
              }
            ],
            properties: [
              {
                propertyKey: 'propertyA',
                decorations: [{ __type: 'PropertyDecoratorA', extra: 'A' }]
              },
              { propertyKey: 'propertyB', decorations: [{ __type: 'readonly', extra: 'only' }] }
            ]
          },
          {
            name: 'GoodClass2',
            decorations: [{ __type: 'ClassDecoratorA', extra: 'A' }],
            location: expect.stringMatching(/__fixtures__\/namespace2\/GoodClass2.ts/),
            target: GoodClass2,
            accessors: [
              {
                decorations: [{ __type: 'AccessorDecoratorA', extra: 'A' }],
                propertyKey: 'getterA'
              },
              {
                decorations: [{ __type: 'AccessorDecoratorA', extra: 'A' }],
                propertyKey: 'setterA'
              }
            ],
            methods: [
              {
                propertyKey: 'methodA',
                decorations: [{ __type: 'MethodDecoratorA', extra: 'A' }],
                arguments: [
                  {
                    index: 1,
                    decorations: [{ __type: 'ArgumentDecoratorA', extra: 'A' }]
                  },
                  {
                    index: 0,
                    decorations: [{ __type: 'ArgumentDecoratorA', extra: 'A' }]
                  }
                ]
              }
            ],
            properties: [
              {
                propertyKey: 'propertyA',
                decorations: [{ __type: 'PropertyDecoratorA', extra: 'A' }]
              },
              { propertyKey: 'propertyB', decorations: [{ __type: 'readonly', extra: 'only' }] }
            ]
          }
        ],
        importedModules: expect.any(Array)
      })
    })
  })
})
