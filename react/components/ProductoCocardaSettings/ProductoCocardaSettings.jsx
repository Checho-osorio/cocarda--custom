import React, { useState } from 'react'
import { ProductContextCocarda } from '../context/ProductContex'

const ProductoCocardaSettings = (props) => {

const [cocarda, setCocarda] = useState(props.productCocarda)

console.log('checho props', props);

  return (
    <ProductContextCocarda.Provider value= { {cocarda, setCocarda} }>
      {props.children}
    </ProductContextCocarda.Provider>
  )
}

ProductoCocardaSettings.schema = {
  title: 'Flags',
}


export default ProductoCocardaSettings
