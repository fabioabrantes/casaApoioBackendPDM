import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import orphanageView from '../views/orphanages_view';
import Orphanage from '../models/Orphanage';

// métodos create, index, show, update, delete
const OrphanagesController = {
  async create(request: Request, response: Response): Promise<Orphanage | any> {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const orphanagesRepository = getRepository(Orphanage);
    const reqImages = request.files as Express.Multer.File[];

    const images = reqImages.map(img => {
      return { path: img.filename };
    });

    const dataOrphanage = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    };

    // criando o esquema para validação  dos dados
    const schema = Yup.object().shape({
      name: Yup.string().trim().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        }),
      ),
    });

    await schema.validate(dataOrphanage, {
      abortEarly: false, // faz com que todas as mensagens de erros aapareçam
    });

    const orphanage = orphanagesRepository.create(dataOrphanage);

    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanage);
  },
  async index(
    request: Request,
    response: Response,
  ): Promise<Orphanage[] | any> {
    const orphanagesRepository = getRepository(Orphanage);
    const orphanages = await orphanagesRepository.find({
      relations: ['images'],
    });
    return response.status(200).json(orphanageView.renderMany(orphanages));
  },
  async show(request: Request, response: Response): Promise<Orphanage | any> {
    const { id } = request.params;
    const orphanagesRepository = getRepository(Orphanage);
    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images'],
    });
    return response.status(200).json(orphanageView.render(orphanage));
  },
};

export default OrphanagesController;
