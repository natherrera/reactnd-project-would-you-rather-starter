import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { SessionAction } from './../store/actions';
import {BrowserRouter as Router,
    Switch,
    Route,
    Link} from 'react-router-dom';
import { Home, LoaderBoard, NewQuestion, UserRather } from '../components';
import {
    Image,
    Menu
} from 'semantic-ui-react';
import '../assets/styles/pages/main-page.css';


class MainPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            views: [
                'None', 'Home', 'New Question', 'Loader Board'
            ],

            activeItem: 'Home',
            users: [],
            userRather: [],
            questionId: ''
        };
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

    handleItemClick = (e) => {
        const id = e.target.id;
        this.setState({activeItem: id});
    }

    changeItem = (item, name = '', obj = []) => {

        this.setState({
            questionId: obj.id,
            activeItem: item,
            [name]: obj
        });
    }

    logout = () => {

        const { dispatch, history } = this.props;

        dispatch(
            SessionAction.Action(SessionAction.Types.LOGOUT, history)
        );

    }

    render() {
        const { activeItem, questionId, userRather } = this.state;
        const { userName, credentials, match } = this.props;


        return (

            <Router >

                <div className='main-container'>

                    <Menu stackable>

                        <Menu.Item>
                            <Image src={credentials.avatarURL} avatar />
                            <p className='userName'>Hello <span>{ userName }</span></p>
                        </Menu.Item>

                        <Link to="/main">
                            <div id='Home'
                                className={`item ${activeItem === 'Home' ? 'active' : ''}`}
                                onClick={ this.handleItemClick }>
                                Home
                            </div>
                        </Link>

                        <Link to="/add">
                            <div
                                id='New Question'
                                className={`item ${activeItem === 'New Question' ? 'active' : ''}`}
                                onClick={ this.handleItemClick}>
                                New Question
                            </div>
                        </Link>

                        <Link to="/loaderboard">
                            <div
                                id='Loader Board'
                                className={`item ${activeItem === 'Loader Board' ? 'active' : ''}`}
                                onClick={this.handleItemClick}
                                >
                                Loader Board
                            </div>
                        </Link>

                        <Menu.Menu position='right'>
                            <Menu.Item
                                name='logout'
                                className={`item ${activeItem === 'logout' ? 'active' : ''}`}
                                onClick={this.logout}
                            />
                        </Menu.Menu>

                    </Menu>

                    <Switch>

                        <Route exact path="/main">
                            <Home
                                changeItem={this.changeItem}
                            />
                        </Route>

                        <Route exact path="/loaderboard">
                            <LoaderBoard />
                        </Route>

                        <Route exact path="/add">
                            <NewQuestion
                                changeItem={this.changeItem}
                            />
                        </Route>

                        <Route exact path={`${match.path}/questions/${questionId}`}>
                            <UserRather
                                userRather={userRather}
                            />
                        </Route>

                    </Switch>

                </div>

            </Router>

        );
    }
}

function mapStateToProps({
    [SessionAction.Key]: {
        authenticated,
        credentials,
        userRather
    }
}) {
    return {
        authenticated,
        credentials,
        userName: credentials.name,
        userRather

    };
}

export default connect(mapStateToProps)(withRouter(MainPage));
