import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpToGrpcExceptionFilter } from './shared/filters/http-grpc.filter';
import { RpcDomainExceptionFilter } from './shared/filters/rpc.filter';
import { HttpDomainExceptionFilter } from './shared/filters/http.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const validationPipe = new ValidationPipe({
    transform: true,
    whitelist: true,
  });

  app.useGlobalPipes(validationPipe);
  app.useGlobalFilters(new HttpDomainExceptionFilter());

  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.GRPC,
      options: {
        url: configService.getOrThrow<string>('GRPC_URL'),
        package: 'auth',
        protoPath: 'node_modules/nest-proto/auth.proto',
      },
    });

  microservice.useGlobalPipes(validationPipe);
  microservice.useGlobalFilters(
    new RpcDomainExceptionFilter(),
    new HttpToGrpcExceptionFilter(),
  );

  await microservice.listen();
  await app.listen(configService.getOrThrow<number>('HTTP_PORT'));
}

bootstrap();
