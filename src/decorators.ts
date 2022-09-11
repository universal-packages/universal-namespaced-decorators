import { registerAccessorDecoration, registerClassDecoration, registerMethodDecoration, registerArgumentDecoration, registerPropertyDecoration } from './namespaced-decorators'
import {
  ClassDecoratorFunction,
  Decoration,
  DescriptorGenerator,
  MethodDecoratorFunction,
  ParameterDecoratorFunction,
  PropertyDecoratorFunction
} from './namespaced-decorators.types'

export function ClassDecorator(namespace: string, decoration: Decoration): ClassDecoratorFunction {
  return registerClassDecoration(namespace, decoration)
}

export function AccessorDecorator(namespace: string, decoration: Decoration): MethodDecoratorFunction {
  return registerAccessorDecoration(namespace, decoration)
}

export function MethodDecorator(namespace: string, decoration: Decoration): MethodDecoratorFunction {
  return registerMethodDecoration(namespace, decoration)
}

export function ArgumentDecorator(namespace: string, decoration: Decoration): ParameterDecoratorFunction {
  return registerArgumentDecoration(namespace, decoration)
}

export function PropertyDecorator(namespace: string, decoration: Decoration, generator?: DescriptorGenerator): PropertyDecoratorFunction {
  return registerPropertyDecoration(namespace, decoration, generator)
}
