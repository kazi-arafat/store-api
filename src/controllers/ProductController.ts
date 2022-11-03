import { Request,Response } from "express";
import { Product } from "../Models/Product";
import * as ProductDal from "../DAL/ProductDal";

export async function getProducts(req:Request, res:Response){
    try{
        const products = await ProductDal.getProducts();
        return res.status(200).json(products)
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: "Error occurred while fetching data"});
    }
}

export function getProductById(req:Request, res:Response){
    res.status(200).json({message:"From Product"})

}

export async function addProduct(req:Request, res:Response){
    try{
        const newProduct = new Product();
        newProduct.title = req.body.title;
        newProduct.mrp =  req.body.mrp;
        newProduct.img_url = req.body.img_url;

        const resProduct = await ProductDal.addProduct(newProduct);
        if(resProduct){
            return res.status(201).json(resProduct);
        }
        else{
            return res.status(500).json({message: "Product Not added"})
        }
    }catch(error){
        console.log(error);
        return res.status(505).json({message: "Error occurred while inserting the product."})
    }
}