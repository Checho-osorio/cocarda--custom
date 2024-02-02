import React, { useEffect, useState } from 'react'
import { useProductPriceState } from '../hooks/UseStateProduct'
import CocardaItemText from './CocardaItemText';
import CocardaItemImage from './CocardaItemImage';
import { useProduct } from 'vtex.product-context';


import Styles from './StylesCocarda.css'

const calcularDescuento = (precioAnterior, precioActual) => {
  if (precioAnterior && precioActual) {
    const descuento = ((precioAnterior - precioActual) / precioAnterior) * 100;
    return Math.round(descuento);
  }
  return 0; // Si no se proporcionan los precios, el descuento es 0.
};

const ProductoCocarda = () => {
  const { product } = useProduct();
  const [descuento, setDescuento] = useState(0); // Inicializado en 0
  const [listPrice, setListPrice] = useState();
  const [sellerPrice, setSellerPrice] = useState();

  if (!product) {
    return null;
  }

  const status = useProductPriceState()
  if (status.cocarda === undefined) return null

  useEffect(() => {
    if (product.items[0].sellers[0].commertialOffer.ListPrice) {
      setListPrice(product.items[0].sellers[0].commertialOffer.ListPrice);
    }

    if (product.items[0].sellers[0].commertialOffer.Price) {
      setSellerPrice(product.items[0].sellers[0].commertialOffer.Price + product.items[0].sellers[0].commertialOffer.Tax);
    }

    setDescuento(calcularDescuento(listPrice, sellerPrice));
  }, [product, listPrice, sellerPrice]);



  const { cocarda: { cocardas } } = status;
  return (

    <div className={Styles.contentFlag}>
      {
        descuento > 0 &&
        <div className={Styles.productsummaryimg_container_img_descuento}>{descuento}% Dto</div>
      }
      <div className={Styles.ContentCocardas} >

        <div className={Styles.ContentCocardas_Item__left}>
          {
            cocardas?.map((item, index) => (

              item.viewSite === "Ambos" || item.viewSite === "PLP" ?

                item.posicionHorizontal == "izquierda" &&
                <>
                  {
                    item.tipoCocarda?.additionalDef == "Texto" ?

                      <CocardaItemText key={index} {...item} />
                      :
                      <CocardaItemImage key={index} {...item} />

                  }


                </>

                :

                <></>
            ))
          }
        </div>

        <div className={Styles.ContentCocardas_Item__right} >

          {
            cocardas?.map((item, index) => (

              item.viewSite === "Ambos" || item.viewSite === "PLP" ?

                item.posicionHorizontal == "derecha" &&

                <>
                  {
                    item.tipoCocarda?.additionalDef == "Texto" ?

                      <CocardaItemText key={index} {...item} />
                      :
                      <CocardaItemImage key={index} {...item} />

                  }


                </>

                :

                <></>
            ))
          }
        </div>

      </div>
    </div>

  )
}

export default ProductoCocarda
