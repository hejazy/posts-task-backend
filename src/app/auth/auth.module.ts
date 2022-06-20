import { Module } from '@nestjs/common';
import { BasicStrategy } from './strategies/basic.strategy';

@Module({
    providers: [ BasicStrategy],
    exports: [BasicStrategy],
})
export class AuthModule { }
