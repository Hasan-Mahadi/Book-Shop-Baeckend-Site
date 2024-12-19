import { Router } from 'express';
import { productController } from './product.controller';

const productrouter = Router();

productrouter.post('/', productController.createBook);
productrouter.get('/:bookId', productController.getSingleBook);
productrouter.put('/:bookId', productController.UpdateBook);
productrouter.delete('/:bookId', productController.DeleteBook);
productrouter.get('/', productController.getBook);

export default productrouter;


/**productrouter.post('/create-book', productController.createBook);
productrouter.get('/:bookId', productController.getSingleBook);
productrouter.put('/:bookId', productController.UpdateBook);
productrouter.delete('/:bookId', productController.DeleteBook);
productrouter.get('/', productController.getBook);  |||| previous wrong |||*/