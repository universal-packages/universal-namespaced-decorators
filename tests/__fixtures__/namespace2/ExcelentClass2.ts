import { ClassDecorator, PropertyDecorator, AccessorDecorator, MethodDecorator, ArgumentDecorator } from '../../../src'

@ClassDecorator('namespace2', { __type: 'ClassDecoratorA', extra: 'A' })
export default class ExcelentClass2 {
  @PropertyDecorator('namespace2', { __type: 'PropertyDecoratorA', extra: 'A' })
  public propertyA = 10

  @PropertyDecorator('namespace2', { __type: 'readonly', extra: 'only' }, (_propertyKey: string): PropertyDescriptor => {
    return { value: 20, writable: false }
  })
  public propertyB = 10

  @AccessorDecorator('namespace2', { __type: 'AccessorDecoratorA', extra: 'A' })
  public get getterA(): string {
    return 'dommy'
  }

  @AccessorDecorator('namespace2', { __type: 'AccessorDecoratorA', extra: 'A' })
  public set setterA(value: string) {}

  @MethodDecorator('namespace2', { __type: 'MethodDecoratorA', extra: 'A' })
  public methodA(
    @ArgumentDecorator('namespace2', { __type: 'ArgumentDecoratorA', extra: 'A' }) argumentA: any,
    @ArgumentDecorator('namespace2', { __type: 'ArgumentDecoratorA', extra: 'A' }) argumentB: any
  ): any {
    return argumentA + argumentB
  }
}
