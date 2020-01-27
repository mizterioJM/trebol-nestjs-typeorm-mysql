import { RoleType } from '../../role/role.enum';

export interface IJwtPayload {
  id: number;

  nDocument: string;

  roles: RoleType[];

  iat?: string;
}
