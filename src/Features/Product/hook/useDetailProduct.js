import productsApi from "api/productsApi"
import { useEffect, useState } from "react"

const useDetailProduct = (productId) => {
    const [isLoading, setIsLoading] = useState(true)
    const [product, setProduct] = useState({})

    useEffect(() => {
        (async () => {
            const result = await productsApi.get(productId)
            console.log("res", result.data);
            setProduct(result.data)
            setIsLoading(false)
        })()
        setIsLoading(true)
    }, [productId])

    return ({
        isLoading,
        product
    })
}
export default useDetailProduct