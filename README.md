# Namespaced Decorators

[![npm version](https://badge.fury.io/js/@universal-packages%2Fnamespaced-decorators.svg)](https://www.npmjs.com/package/@universal-packages/namespaced-decorators)
[![Testing](https://github.com/universal-packages/universal-namespaced-decorators/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-namespaced-decorators/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-namespaced-decorators/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-namespaced-decorators)

Easily track and decide which and how decorators will transform your classes. [Decorators](https://github.com/tc39/proposal-decorators) are still in stage: 3, so they are experimental either in [Typescript](https://www.typescriptlang.org/docs/handbook/decorators.html) and [Babel](https://babeljs.io/docs/en/babel-plugin-proposal-decorators).

## Install

```shell
npm install @universal-packages/namespaced-decorators
```

## Decorators

The base decorators are meant to be used to register decorations in a certain namespace, with a single decoration object to be passed to whoever is going to finally decorate the class depending on what is in that decoration object.

You shouldn't use these base decorators directly in your classes, instead you create a new decorator function that takes your custom arguments to be collected into a decoration object.

All decorators take a namespace as first argument to be grouped accordingly, and a decoration object with a required `__type` property useful to know what to do with the decorated element.

- **`ClassDecorator`**
  Registers a class decoration
- **`AccessorDecorator`**
  Registers an accessor decoration
- **`MethodDecorator`**
  Registers a method decoration
- **`ArgumentDecorator`**
  Registers a method's argument decoration
- **`PropertyDecorator`**
  Registers a property decoration, it also takes a third argument, a `DescriptorGenerator` which is a function that returns a descriptor to describe the property, useful to make properties read only.

### Usage

```js
import { ClassDecorator, PropertyDecorator, AccessorDecorator, MethodDecorator, ArgumentDecorator } from '@universal-packages/namespaced-decorators'

function Controller(path) {
  return ClassDecorator('web', { __type: 'controller', path })
}

function RequestBody(parser) {
  return PropertyDecorator('web', { __type: 'request-body', parser }, () => {
    return { configurable: false }
  })
}

function Globals() {
  return AccessorDecorator('web', { __type: 'globals' })
}

function Endpoint(verb) {
  return MethodDecorator('web', { __type: 'endpoint', verb })
}

function Param(key) {
  return ArgumentDecorator('web', { __type: 'param', key })
}

@Controller('/')
export default class ApplicationController {
  @RequestBody('json')
  body

  @Globals()
  get globals(): string {
    return this.settedGlobals
  }

  @Endpoint('get')
  async root(@Param('id') id) {
    this.settedGlobals = (user: { name: 'David' })
  }
}
```

## getNamespace()

Get the namespaced decorators registry as a useful structured decorations object. It loads a directory and import modules to trigger decorarions, get class directory location and share imported modules that may have errors.

> In order to get the location of a decorated class all imported modules should have that class as a default export.

```js
import { getNamespace } from '@universal-packages/namespaced-decorators'

const namespaceRegistry = getNamespace('web', './src', 'controller')
```

### NamespaceRegistry

The namespace registry is structured as follow:

- **`name`** `String`
  The name of the namespace
- **`classes`** `ClassRegistry[]`
  An array of all classes decorated in order of activation. The class registry is structured as follow:
  - **`name`** `String`
    The name of the class
  - **`decorations`** `Decoration[]`
    All the decorations are being applied to the class in order of activation.
  - **`location`** `String`
    If a loading location object is provided when getting a namespace this property will be populated with the class src file path.
  - **`target`** `ClassType`
    The actual reference to the decorated class.
  - **`accessors`** `AccessorRegistry[]`
    An array of all the decorated accessors in this class. The Accessor Registry is structured as follow:
    - **`propertyKey`** `String`
      The accessor name
    - **`decorations`** `Decoration[]`
      All the decorations being applied to the accessor in order of activation.
  - **`methods`** `MethodRegistry[]`
    An array of all the decorated methods in this class. The Method Registry is structured as follow:
    - **`propertyKey`** `String`
      The accessor name
    - **`decorations`** `Decoration[]`
      All the decorations being applied to the method in order of activation.
    - **`arguments`** `ArgumentRegistry[]`
      An array of all the decorated arguments in this method. The Argument Registry is structured as follow:
      - **`index`** `number`
        The index of the method argument from left to right.
      - **`decorations`** `Decoration[]`
        All the decorations being applied to the argument in order of activation.
  - **`properties`** `PropertyRegistry[]`
    An array of all the decorated properties in this class. The Property Registry is structured as follow:
    - **`propertyKey`** `String`
      The accessor name
    - **`decorations`** `Decoration[]`
      All the decorations being applied to the property in order of activation.
- **`importedModules`** `ModuleRegisrty[]`
  All modules imported when loading namespace, useful to know if any module may have an error.

#### How does it look?

```js
const namespace = {
  name: 'web',
  classes: [
    {
      name: 'ApplicationController',
      decorations: [{ __type: 'controller', path: '/' }],
      location: '/Users/david/project/src/Application.controller.ts',
      target: ApplicationController,
      accessors: [
        {
          decorations: [{ __type: 'globals' }],
          propertyKey: 'globals'
        }
      ],
      methods: [
        {
          propertyKey: 'root',
          decorations: [{ __type: 'endpoint', verb: 'get' }],
          arguments: [
            {
              index: 0,
              decorations: [{ __type: 'param', key: 'id' }]
            }
          ]
        }
      ],
      properties: [
        {
          propertyKey: 'body',
          decorations: [{ __type: 'request-body', parser: 'json' }]
        }
      ]
    }
  ],
  importedModules: [
    {
      export: [ApplicationController],
      location: '/Users/david/project/src/Application.controller.ts',
      error: null
    },
    {
      export: null,
      location: '/Users/david/project/src/Users.controller.ts',
      error: Error('Unexpected error')
    }
  ]
}
```

## Typescript

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
