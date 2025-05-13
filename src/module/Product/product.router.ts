import { Router } from 'express';
import { productController } from './product.controller';
import auth from '../../middleweres/auth';

const productrouter = Router();

productrouter.post('/', auth('admin'), productController.createBook);
productrouter.get('/:bookId', productController.getSingleBook);
productrouter.put('/:bookId', productController.UpdateBook);
productrouter.delete('/:bookId', auth('admin'), productController.DeleteBook);
productrouter.get('/', productController.getProducts);

export default productrouter;
