import React, { useEffect, useState } from 'react';

const PDPleftMargin = () => {
  const [ancho, setAncho] = useState(0);

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

  return ancho
}

export default PDPleftMargin



