
const ProductDetails = ({product}) =>{
    //States
    //Action
    const show_product = (product) => {
        console.log(product)
    } 

    //Render
    return(
        <div className='card mt-3 p-3'>
            <h3 className="text-warning">Détails du produit</h3>
            {product ?(
                <div>
                    <p>Description : {product.product_description}</p>
                </div>
            ):(
                <div className="alert alert-warning">
                    <p>Aucun produit selectionné !</p>
                </div>
            )}
        </div>
    )
}



export default ProductDetails;