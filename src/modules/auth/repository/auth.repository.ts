import { Repository, EntityRepository, getConnection } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { RegistroDto } from '../dto/registro.dto';
import { RoleRepository } from '../../role/repository/role.repository';
import { Role } from '../../role/entity/role.entity';
import { RoleType } from '../../role/role.enum';
import { UserDetails } from '../../user/entity/user.details.entity';
import { genSalt, hash } from 'bcryptjs';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async register(registroDto: RegistroDto) {
    const { nDocument, password, name, lastname, fecha_nac } = registroDto;

    // SE CREA NUEVO USER
    const user = new User();

    user.nDocument = nDocument;

    const roleRepository: RoleRepository = await getConnection().getRepository(
      Role,
    );

    const defaultRole: Role = await roleRepository.findOne({
      where: { name: RoleType.GENERAL },
    });

    user.roles = [defaultRole];

    // SE CREA NUEVO DETALLE DE USUARIO
    const details = new UserDetails();

    details.name = name;
    details.lastname = lastname;
    details.fechaNac = fecha_nac;

    user.details = details;

    // ENCRIPTAMOS LA CONTRASEÑA
    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    await user.save();
  }
}
