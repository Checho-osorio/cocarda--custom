import { useProduct } from 'vtex.product-context'

const searchCollection = ( collection = 0 ) => {
  const { product: { productClusters } } = useProduct()
  const exists = productClusters?.find(objeto => objeto.id === collection);

  if (exists != undefined) {
    return true
  } else{

    return false
  }

}

export default searchCollection
