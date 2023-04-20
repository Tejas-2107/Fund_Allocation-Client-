import React from 'react';
import './content.css';
import url from './light.png'
function Content() {
    return (
        <div className="content">
            <div className="text-box">
                <div className="fixed-text">
                    <h2 style={{color:"grey"}}>We provide</h2>&nbsp;
                </div>
                <div className="animate-text">
                <h2> Best soluion to your idea</h2>
                </div>
            </div>
            <div className="mid">
                <div className="left">
                  <h1>Got an idea?</h1>
                   <h3>Talk to us</h3>
                   <p>We'd love to talk about what matters to you</p>
                   <button className='btn'><a href="user/signup">Register now</a></button>
                </div>
                <div className="right">
                    <img src={url} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Content;