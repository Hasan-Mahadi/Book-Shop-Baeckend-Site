import { TProduct } from "./product.interface";
import Product from "./Product.model"


// for POST
const createBook = async (bookload:TProduct): Promise<TProduct> => {

 const result = await Product.create(bookload)
 return result;

}

// for GET ALL

const getBook = async () =>{
    const result = await Product.find()
    return result;
}


// for GET SINGLE


const getSingleBook = async (id:string) =>{
    const result = await Product.findById(id)
    return result;
}

// FOR  PUT

const UpdateBook = async (id:string, data:TProduct) =>{
    const result = await Product.findByIdAndUpdate(id, data, {
           new: true,

    })
 
    return result;
}


// for  DELETE

const DeleteBook = async (id:string) =>{
    const result = await Product.findByIdAndDelete(id)
    return result;
}


export const BookService = {
    createBook,
    getBook,
    getSingleBook,
    UpdateBook,
    DeleteBook

}