import React from 'react'
import searchCollection from '../../utils/searchCollection'

import Styles from './StylesCocarda.css'
import ValidateActive from '../../utils/ValidateActive'


const CocardaItemImage = ({collection, tipoCocarda: {tabSelect}, anchoFlag, marginTop = 0, flagProgramable, initialDate, finalDate}) => {

  const searchCluster = searchCollection(collection)
  if (searchCluster === false) return <></>



  const {imagenCocarda} =tabSelect


  const styles = {
    position: {
      maxWidth: anchoFlag ? anchoFlag : '60px',
      marginTop: marginTop,
    }
  }

  if (flagProgramable == true ) {
    const dateValidation =   ValidateActive(initialDate,finalDate)


    if(dateValidation == false ) return <></>
  }

  return (
    <div style={ styles.position }>
      <img src={imagenCocarda} alt="Cocarda Promoción" />
    </div>
  )
}

export default CocardaItemImage
