import React from 'react';
import LoginPage from '../../pages/LoginPage';
import { wallPaper } from '../../assets/images';
import { Card, Image } from 'semantic-ui-react';


export default function Login()
{

    return  (
        <div>
            <Card style={{marginTop: 3 + 'em'}} centered>
                <Image src={wallPaper}  wrapped ui={false}  />
                <Card.Content>
                <Card.Header>Hello Friend!</Card.Header>
                <Card.Description>
                    Please choose your user, and enjoy the game!
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <LoginPage />
                </Card.Content>
            </Card>
        </div>
    );
}
