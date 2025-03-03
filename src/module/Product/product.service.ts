import { TProduct } from './product.interface';
import Product from './Product.model';

// for POST
const createBook = async (bookload: TProduct): Promise<TProduct> => {
  const result = await Product.create(bookload);
  return result;
};

// for GET ALL and (seraching,filtering);

const getproducts = async (query: Record<string, unknown>) => {
  console.log('main', query);

  const queryObj = { ...query };

  const excludingImportant = [
    'searchTerm',
    'page',
    'limit',
    'minPrice',
    'maxPrice',
  ];
  excludingImportant.forEach((key) => delete queryObj[key]);
  console.log(queryObj);

  const searchTerm = query?.searchTerm || '';

  //"name","author", "category",

  const searchablFields = ['name', 'author', 'category'];

  // const result = await Product.find({$or:[
  // {name:{$regex:searchTerm, $options:"i"}},
  // {author:{$regex:searchTerm, $options: "i"}},
  // ]});

  //  const result = await Product.find({
  // $or:searchablFields.map((field) => ({
  // [field]: {$regex: searchTerm, $options: "i"},
  // })),
  //  });

  //searching
  const searchQuery = Product.find({
    $or: searchablFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  // pricefilter
  const priceFilter: Record<string, unknown> = {};
  if (query.minPrice) {
    priceFilter.$gte = Number(query.minPrice);
  }
  if (query.maxPrice) {
    priceFilter.$lte = Number(query.maxPrice);
  }

  if (query.minPrice || query.maxPrice) {
    queryObj.price = priceFilter;
  }

  //filtering
  // const result = await searchQuery.find(queryObj);
  const filterquery = searchQuery.find(queryObj);

  //skip limit pagination,
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;

  const skiped = (page - 1) * limit;

  // const result =await filterquery.skip(skiped).limit(limit);
  const result = filterquery.skip(skiped).limit(limit);

  return result;
};

// for GET SINGLE

const getSingleBook = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

// FOR  PUT

const UpdateBook = async (id: string, data: TProduct) => {
  const result = await Product.findByIdAndUpdate(id, data, {
    new: true,
  });

  return result;
};

// for  DELETE

const DeleteBook = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const BookService = {
  createBook,
  getproducts,
  getSingleBook,
  UpdateBook,
  DeleteBook,
};
