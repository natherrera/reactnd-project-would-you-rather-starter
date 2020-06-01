import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { SessionAction } from '../../store/actions';

import {
    Item,
    Button
} from 'semantic-ui-react';


const getUnQuestions = (questions, credentials, users) => {
    const q = Object.values(questions);
    const cq = Object.keys(credentials.answers);
    const userUnQuestions = q.filter(e => cq.indexOf(e.id) === -1);
    userUnQuestions.forEach(e => {
        e.avatarURL = users[e.author].avatarURL
        e.name = users[e.author].name
        e.section = 'unanswered'
    });
    return userUnQuestions;
}
class Unanswered extends React.PureComponent {

    constructor(props) {
        super(props);

        this.handleButtonChange = this.handleButtonChange.bind(this);
    }

    handleButtonChange(item) {
        const { changeItem } = this.props;
        const userRather = item;
        changeItem && changeItem('User Rather', 'userRather', userRather);
    }

    render() {


        const { unanswered } = this.props;

        return (
            <>
            {
                unanswered.map((user) =>

                <Item key={user.id}>
                    <Item.Image size='small' src={user.avatarURL} />

                    <Item.Content >
                        <Item.Header>{user.name} asks: </Item.Header>
                        <Item.Description>
                            <h3>Would you rather ...</h3>
                            <p> { user.optionOne.text }  </p>
                            <Button basic color='teal'
                            onClick={ (event) => this.handleButtonChange(user)
                            }
                            >View Poll</Button>
                        </Item.Description>
                    </Item.Content>
                </Item>

                )
            }
            </>
        )
    }
}

Unanswered.propTypes = {

    handleButtonChange: PropTypes.func,
    users: PropTypes.objectOf(PropTypes.any),
    unanswered: PropTypes.arrayOf(PropTypes.any),
    credentials: PropTypes.objectOf(PropTypes.any)
};

function mapStateToProps({
    [SessionAction.Key]: {
        credentials,
        users,
        questions
    }
}) {
    return {
        credentials: credentials || {},
        unanswered: getUnQuestions(questions, credentials, users)
    };
}

export default connect(mapStateToProps)(withRouter(Unanswered));
