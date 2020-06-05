import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {BrowserRouter as Router,
    Switch,
    Route,
    Link} from 'react-router-dom';
import {
    Image,
    Menu
} from 'semantic-ui-react';
import '../assets/styles/pages/main-page.css';
import { SessionAction } from './../store/actions';
import { Home, LoaderBoard, NewQuestion, UserMain, UserRather } from '../components';
import NotFoundPage from './NotFoundPage';



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

        this.props.history.push('/main')

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

        this.props.history.push(`/questions/${obj.id}`)

    }

    logout = () => {

        const { dispatch, history } = this.props;

        dispatch(
            SessionAction.Action(SessionAction.Types.LOGOUT, history)
        );

    }




    render() {
        const { activeItem, userRather, questionId } = this.state;
        const { userName, credentials } = this.props;

        return (

            <Router>

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
                        <Route path="/main">
                            <Home
                                changeItem={this.changeItem}
                            />
                        </Route>

                        <Route path="/loaderboard">
                            <LoaderBoard />
                        </Route>

                        <Route path="/add">
                            <NewQuestion
                                changeItem={this.changeItem}
                            />
                        </Route>

                        {/* <Route path={`questions/${questionId}`}> */}
                        <Route path="/questions">
                            <UserRather
                                userRather={userRather}
                            />
                        </Route>

                    </Switch>

                </div>

            </Router>


                    // {
                    //     activeItem === 'Home' && (
                    //         <Route path='/main/home'
                    //             render= {
                    //                 <Home
                    //                     changeItem={this.changeItem}
                    //                 />
                    //         }/>
                    //     )
                    // }{
                    //     activeItem === 'Loader Board' && (
                    //         <Route path='/loaderboard'
                    //             render= {
                    //             <LoaderBoard />
                    //         }/>
                    //     )
                    // }{
                    //     activeItem === 'New Question' && (
                    //         <Route path='/add'
                    //             render= {
                    //             <NewQuestion
                    //                 changeItem={this.changeItem}
                    //             />
                    //         }/>
                    //     )
                    // }{
                    //     activeItem === 'User Rather' && (

                    //         questionId === "" ? (
                    //             <>
                    //             <Route path={`questions/${questionId}`}
                    //                 render= {
                    //                 <UserRather
                    //                     userRather={userRather}
                    //                 />
                    //             }/>
                    //             </>
                    //         ) : (
                    //             <>
                    //             <Route path='/error'
                    //                 render= {
                    //                 <NotFoundPage />
                    //             }/>
                    //             </>
                    //         )
                    //     )

                    // }

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
