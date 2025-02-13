import axios from "axios";
import { useState } from "react";

const AddProduct = ({onProductAdded}) => {
    // States
    const product_object = {
        id: null,
        product_name: "",
        product_description: "",
        product_price: 0,
        product_image: ""
    };
    const [product, setProduct] = useState(product_object);
    const [formIsSubmit, setFormIsSubmit] = useState(false);
    const [file, setFile] = useState(null);

    // Actions
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const save_product = async () => {
        let new_product = {
            product_name: product.product_name,
            product_description: product.product_description,
            product_price: product.product_price,
            product_image: product.product_image
        };

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const upload_response = await axios.post("http://localhost:3002/upload", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                new_product.product_image = upload_response.data.filePath;
            } catch (error) {
                console.error("Erreur lors de l'upload du fichier !" + error);
                return;
            }
        }

        try {
            const response = await axios.post("http://localhost:3000/produits", new_product);
            if (
                response.data.product_name === "" ||
                response.data.product_description === "" ||
                response.data.product_price === "" ||
                response.data.product_image === ""
            ) {
                alert("Merci de remplir tous les champs du formulaire !");
            } else {
                setProduct({
                    id: response.data.id,
                    product_name: response.data.product_name,
                    product_description: response.data.product_description,
                    product_price: response.data.product_price,
                    product_image: response.data.product_image
                });
                setFormIsSubmit(true);
                //reset_product_form();
                onProductAdded(response.data); //Mettre a jour la liste des produits apres ajout
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout du produit !" + error);
        }
    };

    const reset_product_form = () => {
        setProduct(product_object);
        setFormIsSubmit(false);
    };

    return (
        <div className='card mt-3 p-3'>
            {formIsSubmit ? (
                <div className="alert alert-success">
                    <h4>Le produit a été ajouté avec succès !</h4>
                    <button className="btn btn-info" onClick={reset_product_form}>Ajouter un autre produit</button>
                </div>
            ) : (
                <div>
                    <h3 className="text-warning">Ajouter un produit</h3>
                    <div className="mt-2">
                        <label htmlFor="product_name">Nom du produit</label>
                        <input
                            type="text"
                            className="form-control"
                            id="product_name"
                            placeholder="Nom du produit"
                            required
                            name="product_name"
                            value={product.product_name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="product_description">Description du produit</label>
                        <textarea
                            className="form-control"
                            id="product_description"
                            required
                            name="product_description"
                            value={product.product_description}
                            onChange={handleInputChange}
                        >
                        </textarea>
                    </div>
                    <div className="mt-2">
                        <label htmlFor="product_price">Prix du produit (€ TTC)</label>
                        <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            id="product_price"
                            placeholder="Prix du produit"
                            required
                            name="product_price"
                            value={product.product_price}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="product_image">Image du produit</label>
                        <input
                            type="file"
                            className="form-control"
                            id="product_image"
                            placeholder="Image du produit"
                            required
                            name="product_image"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-success mt-3" onClick={save_product}>Ajouter le produit</button>
                </div>
            )}
        </div>
    );
};

export default AddProduct;