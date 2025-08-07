import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CustomerService = {
    async getCustomers(id:number){
        const customer = await prisma.customer.findUnique({
            data:{name,email}
        });
    return customer;
    },
}