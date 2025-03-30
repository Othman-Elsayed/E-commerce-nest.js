import { SetMetadata } from '@nestjs/common';
import { RolesType } from '../../utils/constants';

export const RolesDecorator = (...roles: RolesType[]) => {
  return SetMetadata('roles', roles);
};
