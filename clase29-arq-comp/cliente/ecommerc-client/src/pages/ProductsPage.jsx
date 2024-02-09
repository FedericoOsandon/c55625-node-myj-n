import { useEffect, useState } from "react"
import ProductsList from "../components/ProductsList/ProductsList"

export const ProductsPage = () => {
    // manejo de los estado llmadas a als api
    const [products, setProducts] = useState([]) // variable tipo const pero que tiene persistencia

    useEffect(()=>{
        const getRoducts = async () => {
            const dataJson = await fetch('http://localhost:8080/api/products')
            const data = await dataJson.json() 
            setProducts(data.payload)
        } 
        getRoducts()
    }, []) 

    return (
        <div>
            <ProductsList products={products} />
        </div>
    )
}

