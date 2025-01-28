import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { fs } from '../Config/Config'; // Import the initialized Firestore service

export const Addproducts = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageError, setImageError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');

    const handleImageUrl = (e) => {
        const url = e.target.value;
        setImageUrl(url);
        // Basic validation for URL format (you can expand this as needed)
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            setImageError('Please provide a valid URL.');
        } else {
            setImageError('');
        }
    };

    const handelAddProduct = async (e) => {
        e.preventDefault();
        if (!imageUrl) {
            setImageError('Please provide an image URL');
            return;
        }

        try {
            await addDoc(collection(fs, 'Products'), {
                title,
                description,
                price: Number(price),
                url: imageUrl,
            });
            setSuccessMsg('Product added successfully');
            setTitle('');
            setDescription('');
            setPrice('');
            setImageUrl('');
            setImageError('');
            setUploadError('');
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (error) {
            setUploadError(error.message);
        }
    };

    return (
        <div className="container">
            <br />
            <h1>Add Products</h1>
            <hr />
            {successMsg && (
                <div className="success-msg">
                    {successMsg}
                    <br />
                </div>
            )}
            <form autoComplete="off" className="form-group" onSubmit={handelAddProduct}>
                <label>Product Title</label>
                <input
                    type="text"
                    className="form-control"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <br />
                <label>Product Description</label>
                <input
                    type="text"
                    className="form-control"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
                <br />
                <label>Product Price</label>
                <input
                    type="number"
                    className="form-control"
                    required
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                />
                <br />
                <label>Product Image URL</label>
                <input
                    type="text"
                    className="form-control"
                    required
                    onChange={handleImageUrl}
                    value={imageUrl}
                />
                {imageError && (
                    <div className="error-msg">
                        {imageError}
                        <br />
                    </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn btn-success mt-3">
                        ADD
                    </button>
                </div>
            </form>
            {uploadError && (
                <div className="error-msg">
                    {uploadError}
                    <br />
                </div>
            )}
        </div>
    );
};
