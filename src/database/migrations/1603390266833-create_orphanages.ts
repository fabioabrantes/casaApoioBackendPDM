import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createOrphanages1603390266833 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orphanages',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'latitude',
            type: 'decimal',
            scale: 10,
            precision: 2,
          },
          {
            name: 'longitude',
            type: 'decimal',
            scale: 10, // número depois da vírgula
            precision: 2, // números antes da vírgula
          },
          {
            name: 'about', // informações sobre o orfanato
            type: 'text',
          },
          {
            name: 'instructions', // instruções para visita no orfanato
            type: 'text',
          },
          {
            name: 'opening_hours', //
            type: 'varchar',
          },
          {
            name: 'open_on_weekends', // se é aberto no final de semana. por default não é
            type: 'boolean',
            default: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orphanages');
  }
}
