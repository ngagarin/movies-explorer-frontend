import React from 'react'
import Lottie from 'lottie-react';
import './Preloader.css'
import PreloaderImg from "../../images/preloader/preloader.json";

const Preloader = () => {
    return (
        <div className="preloader">
            <div className="preloader__container">
                <Lottie
                  animationData={PreloaderImg}
                  loop
                  autoplay
                />
            </div>
        </div>
    )
};

export default Preloader
