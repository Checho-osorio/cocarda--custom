import React, { useEffect, useMemo, useState } from 'react'
import { useProductPriceState } from '../hooks/UseStateProduct'
import CocardaItemText from '../ProductCocarda/CocardaItemText';
import CocardaItemImage from '../ProductCocarda/CocardaItemImage';
import { useRuntime } from 'vtex.render-runtime'
import { useProduct } from 'vtex.product-context';

import Styles from '../ProductCocarda/StylesCocarda.css'

const calcularDescuento = (precioAnterior, precioActual) => {
  if (precioAnterior && precioActual) {
    const descuento = ((precioAnterior - precioActual) / precioAnterior) * 100;
    return Math.round(descuento);
  }
  return 0; // Si no se proporcionan los precios, el descuento es 0.
};


const ProductCocardaPDP = () => {
  const [descuento, setDescuento] = useState(0); // Inicializado en 0
  const [listPrice, setListPrice] = useState();
  const [sellerPrice, setSellerPrice] = useState();
  const [ancho, setAncho] = useState(0);
  const { route } = useRuntime()
  const { product } = useProduct();

  if (!product) {
    return null;
  }

  if (route.id == "store.product") {
    useEffect(() => {
      const handleResize = () => {
        const div = document.querySelector('.vtex-store-components-3-x-carouselGaleryThumbs');
        if (div) {
          const { width } = div.getBoundingClientRect();
          setAncho(width);
        }
      };

      handleResize(); // Obtener el ancho inicial
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  }

  // const anchoPDP = useMemo(() => PDPleftMargin(), [])


  const stylesPDP = {
    content: {
      marginLeft: `${ancho}px`,
      width: `calc(100% - ${ancho}px)`
    }
  }

  const status = useProductPriceState()
  if (status.cocarda === undefined) return null
  const { cocarda: { cocardas } } = status;

  useEffect(() => {
    if (product.items[0].sellers[0].commertialOffer.ListPrice) {
      setListPrice(product.items[0].sellers[0].commertialOffer.ListPrice);
    }

    if (product.items[0].sellers[0].commertialOffer.Price) {
      setSellerPrice(product.items[0].sellers[0].commertialOffer.Price + product.items[0].sellers[0].commertialOffer.Tax);
    }

    setDescuento(calcularDescuento(listPrice, sellerPrice));
  }, [product, listPrice, sellerPrice]);


  return (
    <div className={Styles.contentFlag} style={{padding:"10px"}}>
            {
        descuento > 0 &&
        <div className={Styles.productsummaryimg_container_img_descuento}>{descuento}% Dto</div>
      }
      <div className={Styles.ContentCocardas} style={stylesPDP.content} >

        <div className={Styles.ContentCocardas_Item__left_PDP}>
          {
            cocardas?.map((item, index) => (

              item.viewSite === "Ambos" || item.viewSite === "PDP" ?

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

        <div className={Styles.ContentCocardas_Item__right_PDP} >

          {
            cocardas?.map((item, index) => (

              item.viewSite === "Ambos" || item.viewSite === "PDP" ?

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

export default ProductCocardaPDP
