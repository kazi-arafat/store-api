import {PrismaClient} from '@prisma/client';


export class DbContext{
    public static readonly prisma = new PrismaClient();
    DbContext(){}

    async connect(){
        await DbContext.prisma.$connect();
    }

}