import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { SessionAction } from '../../store/actions';

import {
    Card
} from 'semantic-ui-react';
import './../../assets/styles/components/loaderBoard.css';


const allUsers = (users, id) => {
    const postUsers = Object.values(users).filter(e => e.id !== id)
    return postUsers
}

class LoaderBoard extends React.PureComponent
{

    render()
    {
        const { users } = this.props;

        return (
            <Card.Group>
                <Card>
                    <Card.Content>
                        <div className="ui items">
                            {
                            users.map((e) => (
                                <div key={
                                        e.id
                                    }
                                    className="item">
                                    <div className="image"><img src={
                                            e.avatarURL
                                        }/></div>
                                    <div className="content">
                                        <div className="header">
                                            {
                                            e.name
                                        }</div>
                                        <div className="meta">Answered questions: {
                                            Object.keys(e.answers).length
                                        }</div>
                                        <div className="description">Created questions: {
                                            e.questions.length
                                        }</div>
                                        <div className="extra">Score: {
                                            //NOTE: pendiente
                                            e.ScorePoints

                                        }</div>
                                    </div>
                                </div>
                            ))
                        } </div>
                    </Card.Content>
                </Card>
            </Card.Group>
        );
    }
}

LoaderBoard.propTypes = {

    credentials: PropTypes.objectOf(PropTypes.any),
    users: PropTypes.arrayOf(PropTypes.any),

};

function mapStateToProps({
    [SessionAction.Key]: {
        credentials,
        users
    }
}) {
    return {
        credentials: credentials || {},
        users: allUsers(users, credentials.id)
    };
}

export default connect(mapStateToProps)(withRouter(LoaderBoard));

