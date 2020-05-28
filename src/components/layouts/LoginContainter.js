import React from 'react';
import LoginPage from '../../pages/LoginPage';
import { wallPaper } from '../../assets/images'


export default function Login()
{

    return  (
        <div>
            <div className="ui card centered" style={{marginTop: 3 + 'em'}} >
                <div className="image"><img src={wallPaper} /></div>
                <div className="content">
                    <div className="header">Hello Friend!</div>
                    <div className="description">
                    Please choose your user, and enjoy the game!
                    </div>
                </div>
                <div className="extra content">
                <LoginPage />
                </div>
                </div>
        </div>
    );
}
