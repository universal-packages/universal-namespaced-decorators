import { ClassDecorator, PropertyDecorator, AccessorDecorator, MethodDecorator, ArgumentDecorator } from '../../../src'

@ClassDecorator('namespace1', { __type: 'ClassDecoratorA', extra: 'A' })
@ClassDecorator('namespace1', { __type: 'ClassDecoratorB', extra: 'B' })
export default class GoodClass {
  @PropertyDecorator('namespace1', { __type: 'PropertyDecoratorA', extra: 'A' })
  @PropertyDecorator('namespace1', { __type: 'PropertyDecoratorB', extra: 'B' })
  public propertyA = 10

  @PropertyDecorator('namespace1', { __type: 'readonly', extra: 'only' }, (_propertyKey: string): PropertyDescriptor => {
    return { value: 20, writable: false }
  })
  public propertyB = 10

  @AccessorDecorator('namespace1', { __type: 'AccessorDecoratorA', extra: 'A' })
  @AccessorDecorator('namespace1', { __type: 'AccessorDecoratorB', extra: 'B' })
  public get getterA(): string {
    return 'dommy'
  }

  @AccessorDecorator('namespace1', { __type: 'AccessorDecoratorA', extra: 'A' })
  @AccessorDecorator('namespace1', { __type: 'AccessorDecoratorB', extra: 'B' })
  public set setterA(value: string) {}

  @MethodDecorator('namespace1', { __type: 'MethodDecoratorA', extra: 'A' })
  @MethodDecorator('namespace1', { __type: 'MethodDecoratorB', extra: 'B' })
  public methodA(
    @ArgumentDecorator('namespace1', { __type: 'ArgumentDecoratorA', extra: 'A' }) @ArgumentDecorator('namespace1', { __type: 'ArgumentDecoratorB', extra: 'B' }) argumentA: any,
    @ArgumentDecorator('namespace1', { __type: 'ArgumentDecoratorA', extra: 'A' }) @ArgumentDecorator('namespace1', { __type: 'ArgumentDecoratorB', extra: 'B' }) argumentB: any
  ): any {
    return argumentA + argumentB
  }
}
