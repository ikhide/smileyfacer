import React from 'react';
import './FaceRecognition.css';
import Logo from '../Logo/face.png'


const FacialRecognition = ({imageUrl, box}) => {
    return (
        <div className = 'center ma'>
            <div className = 'absolute mt2'>
                <img alt='' id = 'image' src ={imageUrl} width = '500px' height ='auto'/>
                <div className='bounding-box' style={{
                    top: box.topRow, 
                    right: box.rightCol, 
                    bottom: box.bottomRow, 
                    left: box.leftCol}}> <img src={Logo} alt='' style={{padding: 'auto', paddingTop: '5px'}}/>
                </div>
            </div>
       </div>
    );
};

export default FacialRecognition;   