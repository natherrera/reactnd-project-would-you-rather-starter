import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { SessionAction } from '../../store/actions';

import {
    Item,
    Button
} from 'semantic-ui-react';


const getQuestions = (questions, credentials) => {
    const a = credentials.id;
    const q = Object.values(questions);
    const cq = Object.keys(credentials.answers);
    const userQuestions = q.filter(e => cq.indexOf(e.id) !== -1);

    return userQuestions;
}

class Answered extends React.PureComponent {

    getAnswer = (user) => {
        const { credentials} = this.props;
        const option = credentials.answers[user.id]
        const answer =  option === 'optionOne' ? user.optionOne.text : user.optionTwo.text;

        return answer
    }

    changeItem = () => {
        const { changeItem } = this.props;
        changeItem && changeItem('None');
    }

    render() {

        const { users, answered} = this.props;


        return (
            <>
            {
                answered.map((user) =>

                <Item key={user.id}>
                    <Item.Image size='small' src={users[user.author].avatarURL} />

                    <Item.Content >
                        <Item.Header>{users[user.author].name} asks: </Item.Header>
                        <Item.Description>
                            <h3>Would you rather ...</h3>
                            <p> {this.getAnswer(user)}  </p>
                            <Button basic color='teal'
                            onClick={
                                this.changeItem
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

Answered.propTypes = {
    changeItem: PropTypes.func,
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
        users: users,
        answered: getQuestions(questions, credentials),
    };
}

export default connect(mapStateToProps)(withRouter(Answered));

