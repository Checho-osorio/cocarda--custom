import { useContext } from 'react'
import { ProductContextCocarda } from '../context/ProductContex'


const useProductPriceState = () => {
  const context = useContext(ProductContextCocarda)

  if (context === undefined) {
    throw new Error(
      `useProductState must be used within a ProductCocardaContext`
    )
  }

  return context
}

export { useProductPriceState }
""