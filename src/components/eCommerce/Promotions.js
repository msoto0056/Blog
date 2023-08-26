import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import { useEffect, useRef, useState } from "react";
import { MessageText, PromotionsContainer } from "../../styles/product";
import {useProductState} from '../../context/eCommerce/ProductStore';

export default function Promotions() {

  const [{promotionMessages},] = useProductState();
  const containerRef = useRef();
  const [show, setShow] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  
  useEffect(() => {
            setTimeout(() => {
              setShow(false);
            }, 3000);
    const intervalId = setInterval(() => {
      // get next message
      setMessageIndex((i) => (i + 1) % promotionMessages.length);

      // slide the message in
        setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 3000);
  }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, [promotionMessages.length]);

  return (
    <PromotionsContainer ref={containerRef} overflow="hidden">
      <Slide
        direction={show ? "left" : "right"}
        in={show}
        container={containerRef.current}
        timeout={{
          enter: 500,
          exit: 100,
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <MessageText>
            {promotionMessages[messageIndex].message}
          </MessageText>
        </Box>
      </Slide>
    </PromotionsContainer>
  );
}