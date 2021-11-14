module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/**/*.migrations.{js,ts}'],
  synchronize: true,
};
