import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import ProductDetails from './ProductDetails';
import AddProduct from './AddProduct';


const Products = () => {

  //States
  const [products, setProducts] = useState([]);
  //Un seul produit
  const [selectedProduct, setSelectedProduct] = useState(null);

  //Actions
  const display_products = () => {
    //Requete HTTPS => get
    axios.get("http://localhost:3000/produits/")
      .then(response => {
        setProducts(response.data)
      })
      .catch(error => console.error("Erreur de la requète HTTPS GET " + error));
  }

  //Afficher un seul produits
  const display_one_product = (product) => {
    //Le mutateur 
    setSelectedProduct(product);
  }

  //Mettre a jour la liste des produits
  const handle_product_added = (new_product) => {
    setProducts(
      [...products, new_product]
    );
  }

  //Supprimer un produit
  const delete_product = (id) => {
       
         //Requete HTTP delete
        axios.delete(`http://localhost:3000/produits/${id}`)
        .then(response => {
          setProducts(products.filter(product => product.id !== id));
          alert("Valider la supression de ce produit ?");
        })
        .catch(error => console.error("Erreur lors de la supression du produit !"));
    
  }

  //Auto call via use effect
  useEffect(() => {
    display_products();
  }, []);
  //Render

  return(
    <div>
      <NavBar/>
      <div className='container shadow rounded'>
          <div className='row'>
            <div className='col-md-8 col-sm-12'>
              {products.map((product, index) =>
                <div className='card mt-3 p-3' key={index}>
                {product.product_image ? (
                  <img src={product.product_image} alt={product.product_name} title={product.product_name} className='img-fluid' width="10%" />
                ) : (
                  <div className='img-placeholder' style={{ width: '10%', height: 'auto', backgroundColor: '#f0f0f0' }}></div>
                )}
                <div className='card-body'>
                  <h2 className='text-info'>{product.product_name}</h2>
                  <div>
                    <p className='text-success'>Prix : <b>{product.product_price} €</b></p>
                  </div>
                  <button type='button' className='btn btn-info' onClick={() => display_one_product(product)}>Détails du produit</button>
                  <button className='btn btn-danger mx-3' onClick={() => delete_product(product.id)}>X</button>
                </div>
              </div>
              )}
            </div>
            <div className='col-md-4 col-sm-12'>
                <ProductDetails product={selectedProduct}/>
                <AddProduct onProductAdded={handle_product_added}/>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Products;
