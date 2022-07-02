import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas';
import { UserService } from './user/user.service';

@Module({
    providers: [UserService],
    exports: [UserService, MongooseModule],
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
})
export class UserModule {}
