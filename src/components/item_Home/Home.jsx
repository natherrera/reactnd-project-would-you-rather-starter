import React from 'react';
import PropTypes from 'prop-types';

import {
    Card,
    Tab,
    Item
} from 'semantic-ui-react';
import { HomeTab } from '../elements';
import Answered from './Answered';
import Unanswered from './Unanswered';
import './../../assets/styles/components/home.css';


class Home extends React.PureComponent
{
    constructor(props) {
        super(props);

        this.state = {
            views: [
                'None', 'Home', 'New Question', 'Loader Board'
            ],
            activeItem: 'None',
            panes: ['Unanswered Questions', 'Answered Questions']
        };
    }

    render()
    {
        const { panes } = this.state;
        const { changeItem } = this.props;

        return (
            <Card.Group>
                <Card>
                    <Card.Content>
                        <Tab className="tabCard"
                            menu={ {pointing: true}}
                            panes={ panes.map(e => (HomeTab({
                                    key: e,
                                    title: e,
                                    render: () => (
                                        <>
                                            <Item.Group relaxed className="item-card">
                                                {
                                                    e === 'Answered Questions' ? (
                                                        <Answered
                                                            changeItem={changeItem}
                                                        />
                                                    ) : (
                                                        <Unanswered
                                                            changeItem={changeItem}
                                                        />
                                                    )
                                                }
                                            </Item.Group>
                                        </>
                                    )
                            })))}
                        />
                    </Card.Content>
                </Card>
            </Card.Group>
        );
    }
}

Home.propTypes = {

    changeItem: PropTypes.func
};


export default Home;

