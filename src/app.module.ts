import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config/constants';

import { UserRoleModule } from './user-role/user-role.module';
import { UserModule } from './user/user.module';
import { ItemCategoryModule } from './item-category/item-category.module';
import { ItemModule } from './item/item.module';
import { IncomeCategoryModule } from './income-category/income-category.module';
import { IncomeModule } from './income/income.module';
import { ExpensesModule } from './expenses/expenses.module';
import { UserRoleEntity } from './user-role/entities/user-role.entity';
import { UserEntity } from './user/entities/user.entity';
import { ItemCategoryEntity } from './item-category/entities/item-category.entity';
import { ItemEntity } from './item/entities/item.entity';
import { IncomeCategoryEntity } from './income-category/entities/income-category.entity';
import { IncomeEntity } from './income/entities/income.entity';
import { ExpensesEntity } from './expenses/entities/expenses.entity';
import { ExpensesUpdateModule } from './expenses-update/expenses-update.module';
import { ExpensesUpdateEntity } from './expenses-update/entities/expenses-update.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    //Para configurar la conexion a la base de datos usando los datos del archivo src/config/constants.ts
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql', //mariadb
        host: configService.get<string>(DB_HOST),
        port: +configService.get<number>(DB_PORT),
        username: configService.get<string>(DB_USER),
        password: configService.get<string>(DB_PASSWORD),
        database: configService.get<string>(DB_DATABASE),
        // entities: [__dirname + '/../**/*.entity.{js,ts}'],
        entities: [UserRoleEntity, UserEntity, ItemCategoryEntity, ItemEntity, IncomeCategoryEntity, IncomeEntity, ExpensesEntity, ExpensesUpdateEntity],
        //synchronize: true, //true. Usar solo en desarrollo, deshabilitar en produccion
      }),
      inject: [ConfigService],
    }),
    UserRoleModule, UserModule, ItemCategoryModule, ItemModule, IncomeCategoryModule, IncomeModule, ExpensesModule, ExpensesUpdateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
