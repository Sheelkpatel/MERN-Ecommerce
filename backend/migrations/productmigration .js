import productModel from "../models/productModel.js"

const migrateProducts = async () => {
  const result = await productModel.updateMany(
    { isPublished: { $exists: true } },
    { $set: { isPublished: true } }
  );
  console.log(`🛠️ Migrated ${result.modifiedCount} products`);
};

export default migrateProducts;
