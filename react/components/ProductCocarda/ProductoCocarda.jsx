import React from 'react'
import { useProductPriceState } from '../hooks/UseStateProduct'
import CocardaItemText from './CocardaItemText';
import CocardaItemImage from './CocardaItemImage';


import Styles from './StylesCocarda.css'

const ProductoCocarda = () => {



  const status = useProductPriceState()
  if (status.cocarda === undefined) return null





  const { cocarda:{cocardas} } = status;
  return (
    <div className={Styles.ContentCocardas} >

      <div className={Styles.ContentCocardas_Item__left}>
        {
          cocardas?.map((item,index)=>(

            item.viewSite === "Ambos" || item.viewSite === "PLP"?

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
          cocardas?.map((item,index)=>(

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
  )
}

export default ProductoCocarda
