import React, { useEffect, useMemo, useState } from 'react'
import { useProductPriceState } from '../hooks/UseStateProduct'
import CocardaItemText from '../ProductCocarda/CocardaItemText';
import CocardaItemImage from '../ProductCocarda/CocardaItemImage';
import { useRuntime } from 'vtex.render-runtime'


import Styles from '../ProductCocarda/StylesCocarda.css'

const ProductCocardaPDP = () => {
  const [ancho, setAncho] = useState(0);
  const { route } = useRuntime()


  if (route.id == "store.product"  ) {
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
  content:{
    marginLeft: `${ancho}px`,
    width: `calc(100% - ${ancho}px)`
  }
 }

  const status = useProductPriceState()
  if (status.cocarda === undefined) return null






  const { cocarda:{cocardas} } = status;

  return (
    <div className={Styles.ContentCocardas} style={stylesPDP.content} >

      <div className={Styles.ContentCocardas_Item__left_PDP}>
        {
          cocardas?.map((item,index)=>(

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
          cocardas?.map((item,index)=>(

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
  )
}

export default ProductCocardaPDP
