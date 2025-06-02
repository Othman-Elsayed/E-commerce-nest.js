import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsNonEmptyObject(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNonEmptyObject',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return (
            value === undefined ||
            (typeof value === 'object' &&
              value !== null &&
              Object.keys(value).length > 0)
          );
        },
        defaultMessage() {
          return 'avatar must be a non-empty object or undefined';
        },
      },
    });
  };
}
