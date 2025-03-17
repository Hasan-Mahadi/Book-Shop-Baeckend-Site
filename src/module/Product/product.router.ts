import { Router } from 'express';
import { productController } from './product.controller';
import auth from '../../middleweres/auth';

const productrouter = Router();

productrouter.post('/', auth('user', 'admin'), productController.createBook);
productrouter.get('/:bookId', auth('admin'), productController.getSingleBook);
productrouter.put('/:bookId', auth('admin'), productController.UpdateBook);
productrouter.delete('/:bookId', auth('admin'), productController.DeleteBook);
productrouter.get('/', auth('admin', 'user'), productController.getProducts);

export default productrouter;

/**productrouter.post('/create-book', productController.createBook);
productrouter.get('/:bookId', productController.getSingleBook);
productrouter.put('/:bookId', productController.UpdateBook);
productrouter.delete('/:bookId', productController.DeleteBook);
productrouter.get('/', productController.getBook);  |||| previous wrong |||*/
