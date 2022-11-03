export class Product{
    title! : string;
    mrp!: number;
    img_url!: string[];

    Product(title: string ,mrp: number,img_url:string[]){
        this.title = title;
        this.mrp = mrp;
        this.img_url = img_url
    }
}