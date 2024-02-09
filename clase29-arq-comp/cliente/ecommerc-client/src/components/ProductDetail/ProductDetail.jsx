
function ProductDetail({product}) {
  return (
    <div>
        <h1>{product.title}</h1>
        <h2>{product.description}</h2>
        <h2>Precio: {product.stock}</h2>
        <h2>Stock: {product.price}</h2>
    </div>
  )
}

export default ProductDetail