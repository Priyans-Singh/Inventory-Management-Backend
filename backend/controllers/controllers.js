import Item from "../models/itemsModel.js";
import Category from "../models/categoryModel.js";

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.log("Error while fetching categories: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getCategory = async (req, res) => {
    try {
        const { id } = req.params || req.headers;
        const category = await Category.findById(id).populate('items');
        if(!category){
            return res.status(400).json({message: "Category not found"});
        }
       
        res.status(200).json(category); 

    } catch (error) {
        console.log("Error while fetching category ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const addCategory = async (req, res) => {
    try {
        
        const { name, description } = req.body;
        let category = await Category.findOne({ name });
        if (category) {
            return res.status(400).json({ message: "Category already exists" });
        }   

        category = new Category({
            name,
            description, 
        });

        await category.save();  
        res.status(201).json({
            id: category._id,
            name,
            description,    
        });

    } catch (error) {
        console.log("Error while adding category ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const addItem = async (req, res) => {
    try {

        const { name, description, price, category, image } = req.body;
        const parent = await Category.findById(category);
        if(!parent){
            return res.status(400).json({message: "Category not found"});
        }

        const item = new Item({
            name,
            description,
            price,
            category: parent._id,
            image
        });

        await item.save();

        parent.items.push(item._id);

        await parent.save();
        
        return res.status(201).json({
            id: item._id,
            name,
            description,
            price,
            category,
            image
        });
        
    } catch (error) {
        console.log("Error while adding item ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateItem = async (req, res) => {
    try {

        const { id } = req.params;
        const { name, description, price, category, image } = req.body;
        
        const item = await Item.findById(id);
        if(!item){
            return res.status(400).json({message: "Item not found"});
        }

        item.name = name;
        item.description = description;
        item.price = price;
        item.image = image;
        if(item.category !== category){
            let parent = await Category.findById(item.category);
            const index = parent.items.indexOf(item._id);
            parent.items.splice(index, 1);
            let newCategory = await Category.findById(category);
            item.category = category;
            newCategory.items.push(item._id);
            await newCategory.save();
            await parent.save();
        }
    

        await item.save();
        res.status(200).json({
            id: item._id,
            name,
            description,
            price,
            category,
            image
        });
        
    } catch (error) {
        console.log("Error while updating item ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateCategory = async (req,res) => {
   try {

    const { id } = req.params;
    const { name, description } = req.body;
    const category = await Category.findById(id);   
    if(!category){
        return res.status(400).json({message: "Category not found"});
    }
    category.name = name;  
    category.description = description;
    await category.save();

    res.status(200).json({
        id: category._id,
        name,
        description
    });
    
   } catch (error) {
    console.log("Error while updating category ", error.message);   
    res.status(500).json({ message: "Internal Server Error" });
   }
};

export const deleteItem = async (req, res) => {
    try { 
    
        const { id } = req.params;
        const item = await Item.findById(id);
        if(!item){
            return res.status(400).json({message: "Item not found"});
        }
        let parent = await Category.findById(item.category);

        const index = parent.items.indexOf(item._id);
        parent.items.splice(index, 1);

        await parent.save();

        await Item.findByIdAndDelete(id);
        res.status(200).json({message: "Item deleted successfully"});
        
    } catch (error) {
        console.log("Error while deleting item ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteCategory = async (req, res) => {
    try {

        const { id } = req.params;
        const category = await Category.findById(id);
        if(!category){
            return res.status(400).json({message: "Category not found"});
        };
        
        const items = category.items;
        items.forEach(async (item) => {
            await Item.findByIdAndDelete(item);
        });

        await Category.findByIdAndDelete(id);
        res.status(200).json({message: "Category deleted successfully"});
        
    } catch (error) {
        console.log("Error while deleting category ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};