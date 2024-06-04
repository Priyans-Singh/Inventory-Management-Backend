import express from 'express';
import { getAllCategories, getCategory, addCategory, addItem, deleteItem, updateItem, deleteCategory, updateCategory } from './controllers/controllers.js';

const router = express.Router();

router.get('/categories', getAllCategories);

router.get('/category/:id',getCategory );

router.post('/newCategory', addCategory );

router.post('/newItem', addItem );

router.put('/updateItem/:id', updateItem );

router.put('/updateCategory/:id', updateCategory );

router.delete('/deleteItem/:id', deleteItem );

router.delete('/deleteCategory/:id', deleteCategory);

export default router;