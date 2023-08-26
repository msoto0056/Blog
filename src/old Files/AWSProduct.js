import React, {useState,  useRef } from 'react';
import { useProductState} from '../../context/eCommerce/ProductStore';
//MaterialUI
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import MuiContainer from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';
import { ProductThumbnail, ProductImage, ProductImageIcon } from '../../styles/product';
import '../../styles/product/thumbNail.css'
import ReactImageMagnify from 'react-image-magnify-newtest';

import Avatar from '@mui/material/Avatar';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

export default function AWSProduct() {
  const [{product},] = useProductState();
  const [img, setImg] = useState(product.image);
  console.log ("product.image",product.image)
  const hoverHandler = (image, i) => {
      setImg(image);
      refs.current[i].classList.add('active');
      for (var j = 0; j < product.productImages.length; j++) {
          if (i !== j) {
              refs.current[j].classList.remove('active');
          }
      }
  };
  const refs = useRef([]);
  refs.current = [];
  const addRefs = (el) => {
      if (el && !refs.current.includes(el)) {
          refs.current.push(el);
      }
  };
	return (
        <div className="container">
            <div className="left">
                <div className="left_1">
                    {product.productImages.map((image,i) => (
                        <div
                         className={i == 0 ? 'img_wrap active' : 'img_wrap'}
                         key={i}
                         onMouseOver={() => hoverHandler(image, i)}
                         ref={addRefs}
                        >
                         <img src={image.pictures} alt="" />
                        </div>
                 ))}
                </div>
                <div className="left_2">
                    <ReactImageMagnify
                        {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                src: img.pictures,
                            },
                            largeImage: {
                                src: img.pictures,
                                width: 1200,
                                height: 1800,
                            },
                            enlargedImageContainerDimensions: {
                                src: img.pictures,
                                width: '150%',
                                height: '150%',
                            },
                        }}
                    />
                </div>
            </div>
            <div className="right"></div>
        </div>
    );
}