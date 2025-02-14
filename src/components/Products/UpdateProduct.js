import axios from "axios";
import { useState } from "react";

const UpdateProduct = ({product, onProductUpdated}) => {

    console.log(product)
    //States
    const current_product_object = {
        id: product.id,
        product_name: product.product_name,
        product_description: product.product_description,
        product_price: product.product_price,
        product_image: product.product_image
    };
    const [current_product__object, setCurrentProductObject] = useState(product);
    const [formIsSubmit, setFormIsSubmit] = useState(false);
    const [file, setFile] = useState(null);
    //Actions
    //Analyse de l'etat des champs
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setCurrentProductObject({
            ...current_product__object,
            [name]: value
        });
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };


    const update_current_product = async (id) => {
        if(file){
            const form_data = new FormData();
            form_data.append('file', file);

            try {
                const upload_response = await axios.post("http://localhost:3002/upload", form_data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                current_product__object.product_image = upload_response.data.filePath;
            } catch (error) {
                console.error("Erreur lors de l'upload du fichier !" + error);
                return;
            }
        }
        try{
            const response = await axios.put(`http://localhost:3000/produits/${id}`, current_product__object);
            if (
                response.data.product_name === "" ||
                response.data.product_description === "" ||
                response.data.product_price === "" ||
                response.data.product_image === ""
            ) {
                alert("Merci de remplir tous les champs du formulaire !");
            } else {
                setCurrentProductObject({
                    id: response.data.id,
                    product_name: response.data.product_name,
                    product_description: response.data.product_description,
                    product_price: response.data.product_price,
                    product_image: response.data.product_image
                });
                setFormIsSubmit(true);
                reset_product_form();
                //Mettre a jour la liste des produits apres ajout
            }
        } catch (error) {
            console.error("Erreur lors de la mise a jour du produit !" + error);
        }
    }

    const reset_product_form = () => {
        setCurrentProductObject(current_product__object)
        setFormIsSubmit(false);
    };
    


    //Render
    return(
        <div className="card p-3">
            {formIsSubmit ? (
                <div className="alert alert-success">
                <h4>Le produit a été mis à jour avec succès !</h4>
                <button className="btn btn-info" onClick={reset_product_form}>Ajouter un autre produit</button>
            </div>
            ):(
                <div>
                    <h3 className="text-info">Editer un produit</h3>
                    <div className="mt-2">
                        <label htmlFor="product_name">Nom du produit</label>
                        <input
                            type="text"
                            className="form-control"
                            id="product_name"
                            placeholder={product.product_name}
                            required
                            name="product_name"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="product_description">Description du produit</label>
                        <textarea
                            className="form-control"
                            id="product_description"
                            required
                            placeholder={product.product_description}
                            name="product_description"
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
                            placeholder={product.product_price}
                            required
                            name="product_price"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="product_image">Image du produit</label>
                        <input
                            type="file"
                            className="form-control"
                            id="product_image"
                            placeholder={product.product_image}
                            required
                            name="product_image"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-dark mt-3" onClick={() => update_current_product(product.id)}>Mettre à jour le produit</button>
                </div>
            )}
        </div>
    )
}

export default UpdateProduct;