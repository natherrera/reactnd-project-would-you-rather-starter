import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { SessionAction } from '../../store/actions';
import {Link} from 'react-router-dom';

import {
    Item,
    Button
} from 'semantic-ui-react';


const getQuestions = (questions, credentials, users) => {
    const q = Object.values(questions);
    const cq = Object.keys(credentials.answers);
    const userQuestions = q.filter(e => cq.indexOf(e.id) !== -1);
    userQuestions.forEach(e => {
        e.avatarURL = users[e.author].avatarURL
        e.name = users[e.author].name
        e.section = 'answered'
    });
    return userQuestions;
}

class Answered extends React.PureComponent {

    constructor(props) {
        super(props);

        this.handleButtonChange = this.handleButtonChange.bind(this);
    }


    getAnswer = (user) => {
        const { credentials} = this.props;
        const option = credentials.answers[user.id]
        const answer =  option === 'optionOne' ? user.optionOne.text : user.optionTwo.text;
        user.answer = [{ option: option, text: answer }];
        return answer
    }

    handleButtonChange(item) {
        const { changeItem } = this.props;
        const userRather = item;
        changeItem && changeItem('User Rather', 'userRather', userRather);
    }

    render() {

        const { answered, match } = this.props;

        return (
            <>
            {
                answered.map((user) =>

                <Item key={user.id}>
                    <Item.Image size='small' src={user.avatarURL} />

                    <Item.Content >
                        <Item.Header>{user.name} asks: </Item.Header>
                        <Item.Description>
                            <h3>Would you rather ...</h3>
                            <p> {this.getAnswer(user)}  </p>
                            <Link to={`${match.url}/questions/${user.id}`} onClick={ (event) => this.handleButtonChange(user)}>
                                <Button basic color='teal'>View Poll</Button>
                            </Link>
                        </Item.Description>
                    </Item.Content>
                </Item>

                )
            }
            </>
        )
    }
}

Answered.propTypes = {
    handleButtonChange: PropTypes.func,
    getAnswer: PropTypes.func,
    users: PropTypes.objectOf(PropTypes.any),
    answered: PropTypes.arrayOf(PropTypes.any),
    credentials: PropTypes.objectOf(PropTypes.any)
}

function mapStateToProps({
    [SessionAction.Key]: {
        credentials,
        users,
        questions
    }
}) {
    return {
        credentials: credentials || {},
        answered: getQuestions(questions, credentials, users),
    };
}

export default connect(mapStateToProps)(withRouter(Answered));

