import { ModuleRegistry } from '@universal-packages/module-loader'

export type ClassType<T = any> = { new (...args: any[]): T; [key: string]: any }
export type AccessorDecoratorFunction = (target: any, propertyKey: string, desciptor: PropertyDescriptor) => PropertyDescriptor
export type ClassDecoratorFunction = (constructor: ClassType) => void
export type MethodDecoratorFunction = (target: any, propertyKey: string, desciptor: PropertyDescriptor) => PropertyDescriptor
export type ParameterDecoratorFunction = (target: any, propertyKey: string, index: number) => void
export type PropertyDecoratorFunction = (target: any, propertyKey: string) => void
export type DescriptorGenerator = (propertyKey: string) => PropertyDescriptor

export interface Decoration {
  __type: string
  [key: string]: any
}

export interface NamespaceRegistry {
  name: string
  classes: ClassRegistry[]
  importedModules: ModuleRegistry[]
}

export interface ClassRegistry {
  name: string
  decorations: Decoration[]
  location: string
  target: ClassType
  accessors: AccessorRegistry[]
  methods: MethodRegistry[]
  properties: PropertyRegistry[]
}

export interface AccessorRegistry {
  propertyKey: string
  decorations: Decoration[]
}

export interface MethodRegistry {
  propertyKey: string
  decorations: Decoration[]
  arguments: ArgumentRegistry[]
}

export interface ArgumentRegistry {
  index: number
  decorations: Decoration[]
}

export interface PropertyRegistry {
  propertyKey: string
  decorations: Decoration[]
}
