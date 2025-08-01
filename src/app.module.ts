import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller'; // ✅ Add this
import { UserModule } from './user/user.module';
import { ChatCreationModule } from './chat_creation/chat_creation.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // ✅ Serve public/ as web root
    }),
    AuthModule,
    UserModule,
    ChatCreationModule,
  ],
  controllers: [AppController], // ✅ Add this line
})
export class AppModule {}
