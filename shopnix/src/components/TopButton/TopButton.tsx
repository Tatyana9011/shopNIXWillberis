import React from 'react';
import s from './TopButton.module.css';
import top from "../../img/top.svg";
import { useAppSelector } from '../../hook/redux';


const TopButton:React.FC = () => {

  const btnTopShow = useAppSelector(state => state.goods.btnTopShow);
  const scroll = (event: React.UIEvent<HTMLElement>) => {
    event.preventDefault();
    const deviceWindow:HTMLElement | null = document.getElementById('up');
    if (deviceWindow) {
      deviceWindow.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  if (btnTopShow) {
    return(
            <div id='top'>
                <img src={top} alt="up" onClick={scroll} className={s.up}/>
            </div>
    )
  } else {
    return (<></>);
  }

}
export default TopButton;