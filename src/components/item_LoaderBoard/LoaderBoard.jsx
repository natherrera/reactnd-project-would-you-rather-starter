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
                            users
                            .sort((a,b) => { return b.score - a.score })
                            .map((e) => (
                                <div key={
                                        e.id
                                    }
                                    className="item info-box">
                                    <div className="image"><img src={
                                            e.avatarURL
                                        } alt={e.name} /></div>
                                    <div className="content">
                                        <div className="header">
                                            {
                                            e.name
                                        }</div>
                                        <div className="meta">Answered questions: {
                                            Object.keys(e.answers).length
                                        }</div>
                                        <span className="line-box"></span>
                                        <div className="description">Created questions: {
                                            e.questions.length
                                        }</div>
                                        <div className="extra">
                                            <div className="score-box">
                                                <div className="title-item">Score:</div>
                                                <div className="score-item">{e.score}</div>
                                            </div>
                                        </div>
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

