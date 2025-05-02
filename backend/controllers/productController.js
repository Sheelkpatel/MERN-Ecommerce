import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"
import mongoose from 'mongoose';

// function for add product
const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subCategory, sizes, bestseller,isPublished } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now(),
            isPublished
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {
        
        const products = await productModel.find({});
        res.json({success:true,products})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({ isPublished: true });
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// function for removing product
const removeProduct = async (req, res) => {
    try {
        
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await productModel.findOne({
      _id: productId,
      isPublished: true,
    });

    if (!product) {
      return res.json({ success: false, message: "Product not found or unpublished." });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
    try {
      const { id } = req.params; // Retrieve product ID from route parameters
      const { name, description, price, category, subCategory, sizes, bestseller, existingImages,isPublished } = req.body;
  
      // Process uploaded images
      const image1 = req.files.image1 && req.files.image1[0];
      const image2 = req.files.image2 && req.files.image2[0];
      const image3 = req.files.image3 && req.files.image3[0];
      const image4 = req.files.image4 && req.files.image4[0];
  
      const newImages = [image1, image2, image3, image4].filter((item) => item !== undefined);
  
      let newImageUrls = [];
  
      if (newImages.length > 0) {
        newImageUrls = await Promise.all(
          newImages.map(async (item) => {
            const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
            return result.secure_url;
          })
        );
      }
  
      // Merge existing and new images
      let finalImages = [];
      if (existingImages) {
        const parsedExisting = typeof existingImages === "string" ? JSON.parse(existingImages) : existingImages;
        finalImages = [...parsedExisting, ...newImageUrls];
      } else {
        finalImages = newImageUrls;
      }
  
      const updatedData = {
        name,
        description,
        category,
        subCategory,
        price: Number(price),
        bestseller: bestseller === "true",
        sizes: JSON.parse(sizes),
        image: finalImages,
        date: Date.now(),
        isPublished
      };
  
      const updatedProduct = await productModel.findByIdAndUpdate(id, updatedData, { new: true });
  
      res.json({ success: true, message: "Product updated", product: updatedProduct });
  
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  

  const singleProducts = async (req, res) => {
    try {
      const { id } = req.params; // Get the product ID from URL parameters
      const product = await productModel.findById(id); // Fetch product from DB
  
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      res.json({ success: true, product }); // Send product data
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  


export { listProducts, listProduct,addProduct, removeProduct, singleProduct ,updateProduct,singleProducts}