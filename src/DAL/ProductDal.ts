import { Product } from "../Models/Product";
import {DbContext} from "./DbContext";

export async function addProduct(product:Product):Promise<any>{
    let urls = product.img_url.map((u) => {
        return {url: u}
    });
    //console.log(urls);
    DbContext.prisma.$connect();
    const newProd = await DbContext.prisma.product.create({
        data: {
            title : product.title,
            mrp: product.mrp,
            img_url: {
                set:urls
            }
        }
    });
    DbContext.prisma.$disconnect;
    return newProd;
}

export async function getProducts() : Promise<any> {
    DbContext.prisma.$connect();
    const products = DbContext.prisma.product.findMany();
    DbContext.prisma.$disconnect();
    return products;
    
}