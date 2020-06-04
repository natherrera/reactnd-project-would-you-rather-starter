import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {
    Image,
    Menu
} from 'semantic-ui-react';
import '../assets/styles/pages/main-page.css';
import { SessionAction } from './../store/actions';
import { Home, LoaderBoard, NewQuestion, UserMain, UserRather } from '../components';



class MainPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            views: [
                'None', 'Home', 'New Question', 'Loader Board'
            ],

            activeItem: 'Home',
            users: [],
            userRather: []
        };
    }

    handleItemClick = (e, {name}) => this.setState({activeItem: name})

    changeItem = (item, name = '', obj = []) => {
        this.setState({
            activeItem: item,
            [name]: obj
        })
    }

    logout = () => {

        const { dispatch, history } = this.props;

        dispatch(
            SessionAction.Action(SessionAction.Types.LOGOUT, history)
        );

    }

    componentDidMount = () => {
        const { dispatch } = this.props;

        dispatch(
            SessionAction.Action(SessionAction.Types.GET_USERS),
        );

        dispatch(
            SessionAction.Action(SessionAction.Types.GET_QUESTION),
        );
    }


    render() {
        const { activeItem, userRather } = this.state;
        const { userName, credentials } = this.props;

        return (
            <div className='main-container'>
                <Menu stackable>
                    <Menu.Item>
                        <Image src={credentials.avatarURL} avatar />
                        <p className='userName'>Hello <span>{ userName }</span></p>

                    </Menu.Item>

                    <Menu.Item name='Home'
                        active={ activeItem === 'Home' }
                        onClick={ this.handleItemClick }>
                        Home
                    </Menu.Item>

                    <Menu.Item name='New Question'
                        active={ activeItem === 'New Question'}
                        onClick={ this.handleItemClick}>
                        New Question
                    </Menu.Item>

                    <Menu.Item name='Loader Board'
                        active={activeItem === 'Loader Board'}
                        onClick={this.handleItemClick}>
                        Loader Board
                    </Menu.Item>

                    <Menu.Menu position='right'>
                        <Menu.Item
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={this.logout}
                        />
                    </Menu.Menu>
                </Menu>
                    {
                        activeItem === 'Home' && (
                            <Home
                                changeItem={this.changeItem}
                            />
                        )
                    }{
                        activeItem === 'Loader Board' && (
                            <LoaderBoard />
                        )
                    }{
                        activeItem === 'New Question' && (
                            <NewQuestion
                                changeItem={this.changeItem}
                            />
                        )
                    }{
                        activeItem === 'User Rather' && (
                            <UserRather
                                userRather={userRather}
                            />
                        )
                    }
            </div>

        );
    }
}

function mapStateToProps({
    [SessionAction.Key]: {
        authenticated,
        credentials
    }
}) {
    return {
        authenticated,
        credentials,
        userName: credentials.name,
    };
}

export default connect(mapStateToProps)(withRouter(MainPage));
