import { loadModules, ModuleRegistry } from '@universal-packages/module-loader'
import {
  ClassType,
  ClassDecoratorFunction,
  PropertyDecoratorFunction,
  Decoration,
  MethodDecoratorFunction,
  ParameterDecoratorFunction,
  DescriptorGenerator,
  NamespaceRegistry,
  ClassRegistry,
  AccessorRegistry,
  MethodRegistry,
  PropertyRegistry,
  ArgumentRegistry
} from './namespaced-decorators.types'

const namespaceRegistries: { [name: string]: NamespaceRegistry } = {}

export async function getNamespace(namespace: string, location: string, conventionPrefix?: string): Promise<NamespaceRegistry> {
  const importedModules = await loadModules(location, { conventionPrefix })

  const namespaceRecord = namespaceRegistries[namespace]

  if (namespaceRecord) {
    namespaceRecord.importedModules = importedModules
    setClassRecordsLocation(namespaceRecord, importedModules)
  }

  return namespaceRecord
}

/** Registers a class decoration  */
export function registerClassDecoration(namespace: string, decoration: Decoration): ClassDecoratorFunction {
  return (target: ClassType): void => {
    getOrInitializeNamespaceRegistry(namespace)
    const registry = getOrInitializeClassRegistry(namespace, target)

    registry.decorations.push(decoration)
  }
}

export function registerAccessorDecoration(namespace: string, decoration: Decoration): MethodDecoratorFunction {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    getOrInitializeNamespaceRegistry(namespace)
    const classRegistry = getOrInitializeClassRegistry(namespace, target.constructor)
    const registry = getOrInitializeAccessorRegistry(classRegistry, propertyKey)

    registry.decorations.push(decoration)

    return descriptor
  }
}

export function registerMethodDecoration(namespace: string, decoration: Decoration): MethodDecoratorFunction {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    getOrInitializeNamespaceRegistry(namespace)
    const classRegistry = getOrInitializeClassRegistry(namespace, target.constructor)
    const registry = getOrInitializeMethodRegistry(classRegistry, propertyKey)

    registry.decorations.push(decoration)

    return descriptor
  }
}

export function registerArgumentDecoration(namespace: string, decoration: Decoration): ParameterDecoratorFunction {
  return (target: any, propertyKey: string, index: number): void => {
    getOrInitializeNamespaceRegistry(namespace)
    const classRegistry = getOrInitializeClassRegistry(namespace, target.constructor)
    const methodRegistry = getOrInitializeMethodRegistry(classRegistry, propertyKey)
    const registry = getOrInitializeArgumentRegistry(methodRegistry, index)

    registry.decorations.push(decoration)
  }
}

export function registerPropertyDecoration(namespace: string, decoration: Decoration, generator?: DescriptorGenerator): PropertyDecoratorFunction {
  return (target: any, propertyKey: string): PropertyDescriptor => {
    getOrInitializeNamespaceRegistry(namespace)
    const classRegistry = getOrInitializeClassRegistry(namespace, target.constructor)
    const registry = getOrInitializePropertyRegistry(classRegistry, propertyKey)

    registry.decorations.push(decoration)

    if (generator) {
      return generator(propertyKey)
    }
  }
}

function getOrInitializeNamespaceRegistry(namespace: string): NamespaceRegistry {
  namespaceRegistries[namespace] = namespaceRegistries[namespace] || { name: namespace, classes: [], importedModules: [] }

  return namespaceRegistries[namespace]
}

function getOrInitializeClassRegistry(namespace: string, target: ClassType): ClassRegistry {
  const foundClassRegistry = findClassRegisrty(namespace, target)

  if (!foundClassRegistry) {
    const classRegistry: ClassRegistry = {
      name: target.name,
      decorations: [],
      location: null,
      target: target,
      accessors: [],
      methods: [],
      properties: []
    }
    namespaceRegistries[namespace].classes.push(classRegistry)
    return classRegistry
  }

  return foundClassRegistry
}

function getOrInitializeAccessorRegistry(classRegistry: ClassRegistry, propertyKey: string): AccessorRegistry {
  const foundRegistry = findAccessorRegistry(classRegistry, propertyKey)

  if (!foundRegistry) {
    const registry: AccessorRegistry = {
      decorations: [],
      propertyKey
    }
    classRegistry.accessors.push(registry)
    return registry
  }

  return foundRegistry
}

function getOrInitializeMethodRegistry(classRegistry: ClassRegistry, propertyKey: string): MethodRegistry {
  const foundRegistry = findMethodRegistry(classRegistry, propertyKey)

  if (!foundRegistry) {
    const registry: MethodRegistry = {
      propertyKey,
      decorations: [],
      arguments: []
    }
    classRegistry.methods.push(registry)
    return registry
  }

  return foundRegistry
}

function getOrInitializeArgumentRegistry(methodRegistry: MethodRegistry, index: number): ArgumentRegistry {
  const foundRegistry = findArgumentRegistry(methodRegistry, index)

  if (!foundRegistry) {
    const registry: ArgumentRegistry = {
      index,
      decorations: []
    }
    methodRegistry.arguments.push(registry)
    return registry
  }

  return foundRegistry
}

function getOrInitializePropertyRegistry(classRegistry: ClassRegistry, propertyKey: string): PropertyRegistry {
  const foundRegistry = findPropertyRegistry(classRegistry, propertyKey)

  if (!foundRegistry) {
    const registry: PropertyRegistry = {
      propertyKey,
      decorations: []
    }
    classRegistry.properties.push(registry)
    return registry
  }

  return foundRegistry
}

function setClassRecordsLocation(namespaceRegistry: NamespaceRegistry, importedModules: ModuleRegistry[]): void {
  for (let i = 0; i < namespaceRegistry.classes.length; i++) {
    const currentclassRegistry = namespaceRegistry.classes[i]

    if (!currentclassRegistry.location) {
      const importedModule = findModule(currentclassRegistry.target, importedModules)

      if (importedModule) {
        currentclassRegistry.location = importedModule.location
      }
    }
  }
}

function findModule(target: ClassType, importedModules: ModuleRegistry[]): ModuleRegistry {
  return importedModules.find((moduleRegistry: ModuleRegistry): boolean => moduleRegistry.exports === target)
}

function findClassRegisrty(namespace: string, target: ClassType): ClassRegistry {
  return namespaceRegistries[namespace].classes.find((classRegistry: ClassRegistry): boolean => classRegistry.target === target)
}

function findAccessorRegistry(classRegistry: ClassRegistry, propertyKey: string): AccessorRegistry {
  return classRegistry.accessors.find((registry: AccessorRegistry): boolean => registry.propertyKey === propertyKey)
}

function findMethodRegistry(classRegistry: ClassRegistry, propertyKey: string): MethodRegistry {
  return classRegistry.methods.find((registry: MethodRegistry): boolean => registry.propertyKey === propertyKey)
}

function findArgumentRegistry(methodRegistry: MethodRegistry, index: number): ArgumentRegistry {
  return methodRegistry.arguments.find((registry: ArgumentRegistry): boolean => registry.index === index)
}

function findPropertyRegistry(classRegistry: ClassRegistry, propertyKey: string): PropertyRegistry {
  return classRegistry.properties.find((registry: PropertyRegistry): boolean => registry.propertyKey === propertyKey)
}
