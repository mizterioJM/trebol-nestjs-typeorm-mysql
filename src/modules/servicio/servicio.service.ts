import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicioRepository } from './repository/servicio.repository';
import { plainToClass } from 'class-transformer';
import { ReadServicioDto, CreateServicioDto, UpdateServicioDto } from './dto';
import { Servicio } from './entity/servicio.entity';
import { ConfigService } from '../../config/config.service';
import { Configuration } from '../../config/config.enum';
import { ServicioGaleryRepository } from './repository/servicio-galey.repository';
import { ImgDetail } from './entity/servicio-img-detail.entity';

// tslint:disable-next-line: no-var-requires
const Cloudinary = require('cloudinary');

@Injectable()
export class ServicioService {
  constructor(
    @InjectRepository(ServicioRepository)
    private readonly _servicioRepository: ServicioRepository,
    @InjectRepository(ServicioGaleryRepository)
    private readonly _servicioGaleyRepository: ServicioGaleryRepository,
    private readonly _configService: ConfigService,
  ) {}

  async getServicio(servId: number): Promise<ReadServicioDto> {
    if (!servId) {
      throw new BadRequestException('El ID es requerido');
    }

    const existServicio = await this._servicioRepository.findOne(servId);

    if (!existServicio) {
      throw new NotFoundException('No existe');
    }

    return plainToClass(ReadServicioDto, existServicio);
  }

  async getServicios(): Promise<ReadServicioDto[]> {
    const servicios = await this._servicioRepository.find({
      relations: ['img_detail'],
    });

    return servicios.map((servicio: Servicio) =>
      plainToClass(ReadServicioDto, servicio),
    );
  }

  async createServicio(
    servicio: Partial<CreateServicioDto>,
    files: any,
  ): Promise<ReadServicioDto> {
    const pathsImg = await this.cloudinaryConfig(files);

    const newServicio = new Servicio();

    newServicio.ruta = servicio.ruta;
    newServicio.jaula = servicio.jaula;
    newServicio.chofer = servicio.chofer;
    newServicio.apoyoA = servicio.apoyoA;
    newServicio.apoyoB = servicio.apoyoB;

    const createServicio = await this._servicioRepository.save(newServicio);

    if (pathsImg.length) {
      pathsImg.forEach(async pathImg => {
        const result = await Cloudinary.v2.uploader.upload(pathImg);

        const newImgDetail = new ImgDetail();

        newImgDetail.img_id = result.public_id.toString();
        newImgDetail.img_url = result.url.toString();
        newImgDetail.secure_url = result.secure_url.toString();
        newImgDetail.servicio = createServicio;

        const createImgDetail = await this._servicioGaleyRepository.save(
          newImgDetail,
        );
        newServicio.img_detail = [createImgDetail];
      });
    }

    if (!createServicio) {
      throw new InternalServerErrorException();
    }
    // return null;
    return plainToClass(ReadServicioDto, createServicio);
  }

  async updateService(
    servId: number,
    servicio: Partial<UpdateServicioDto>,
  ): Promise<ReadServicioDto> {
    if (!servId) {
      throw new BadRequestException('Id necesario');
    }

    const existService = await this._servicioRepository.findOne(servId);

    if (!existService) {
      throw new NotFoundException('Servicio no existe');
    }

    existService.ruta = servicio.ruta;
    existService.jaula = servicio.jaula;
    existService.chofer = servicio.chofer;
    existService.apoyoA = servicio.apoyoA;
    existService.apoyoB = servicio.apoyoB;

    const updateServicio = await this._servicioRepository.save(existService);

    if (!updateServicio) {
      throw new InternalServerErrorException();
    }

    return plainToClass(ReadServicioDto, updateServicio);
  }

  async deleteServicio(servId: number): Promise<void> {
    if (!servId) {
      throw new BadRequestException('Id requerido');
    }

    const existServicio = await this._servicioRepository.delete(servId);

    if (!existServicio) {
      throw new NotFoundException('No existe registro del servicio');
    }
  }

  async cloudinaryConfig(files: any): Promise<[]> {
    const pathImages: [] = await files.map((file: any) => file.path);

    if (!pathImages) {
      return;
    }

    Cloudinary.config({
      cloud_name: this._configService.get(Configuration.CLOUD_NAME),
      api_key: this._configService.get(Configuration.CLOUD_API_KEY),
      api_secret: this._configService.get(Configuration.CLOUD_API_SECRET),
    });

    return pathImages;
  }
}
