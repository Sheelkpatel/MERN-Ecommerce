import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const UpdateProduct = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState();
  const [sizes, setSizes] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [publish, setPublish] = useState();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/product/single/${id}`,
          { headers: { token } }
        );
        if (response.data.success) {
          const product = response.data.product;
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price);
          setCategory(product.category);
          setSubCategory(product.subCategory);
          setBestseller(product.bestseller);
          setSizes(product.sizes);
          setExistingImages(product.image || []);
          setPublish(product.isPublished);
        } else {
          toast.error('Failed to fetch product data');
        }
      } catch (error) {
        toast.error('Error fetching product data');
      }
    };

    fetchProduct();
  }, [id, token]);

  const handleNewImageChange = (e) => {
    const file = e.target.files[0];
    if (file && newImages.length + existingImages.length < 4) {
      setNewImages([...newImages, file]);
    } else {
      toast.error('You can upload a maximum of 4 images');
    }
  };

  const removeExistingImage = (index) => {
    const updated = existingImages.filter((_, i) => i !== index);
    setExistingImages(updated);
  };

  const removeNewImage = (index) => {
    const updated = [...newImages];
    updated.splice(index, 1);
    setNewImages(updated);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let allImages = [...existingImages];
      if (allImages.length + newImages.length > 4) {
        allImages = allImages.slice(0, 4 - newImages.length);
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));
      formData.append('existingImages', JSON.stringify(allImages));
      formData.append('isPublished', publish);
      newImages.forEach((file, idx) => {
        formData.append(`image${idx + 1}`, file);
      });

      const response = await axios.put(
        `${backendUrl}/api/product/update/${id}`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success('Product updated successfully');
        navigate('/list');
      } else {
        toast.error('Failed to update product');
      }
    } catch (error) {
      toast.error('Error updating product');
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(`${backendUrl}/api/product/remove`, { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/list');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-2 flex-wrap">
          {existingImages.map((img, idx) => (
            <div key={idx} className="relative">
              <img src={img} className="w-20 h-20 object-cover" alt={`existing ${idx}`} />
              <button type="button" onClick={() => removeExistingImage(idx)} className="absolute top-0 right-0 bg-red-500 text-white px-1">x</button>
            </div>
          ))}
          {newImages.map((img, idx) => (
            <div key={idx} className="relative">
              <img src={URL.createObjectURL(img)} className="w-20 h-20 object-cover" alt={`new ${idx}`} />
              <button type="button" onClick={() => removeNewImage(idx)} className="absolute top-0 right-0 bg-red-500 text-white px-1">x</button>
            </div>
          ))}
          {existingImages.length + newImages.length < 4 && (
            <label className="cursor-pointer">
              <img src={assets.upload_area} className="w-20 h-20 object-cover" alt="Upload" />
              <input type="file" hidden onChange={handleNewImageChange} />
            </label>
          )}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className="w-full max-w-[500px] px-3 py-2" type="text" required />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="w-full max-w-[500px] px-3 py-2" required />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className="w-full px-3 py-2">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className="w-full px-3 py-2">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
            <option value="Footwear">Footwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className="w-full px-3 py-2 sm:w-[120px]" type="Number" />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div key={size} onClick={() => setSizes((prev) => prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size])}>
              <p className={`${sizes.includes(size) ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input onChange={() => setBestseller((prev) => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
        <label className="cursor-pointer" htmlFor="bestseller">Add to bestseller</label>
      </div>
      <div className="flex gap-2 mt-2">
        <input onChange={() => setPublish((prev) => !prev)} checked={publish} type="checkbox" id="publish" />
        <label className="cursor-pointer" htmlFor="publish">Publish</label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">UPDATE</button>
      <button type="button" onClick={() => removeProduct(id)} className="w-28 py-3 mt-4 bg-red-600 text-white">DELETE</button>
    </form>
  );
};

export default UpdateProduct;
