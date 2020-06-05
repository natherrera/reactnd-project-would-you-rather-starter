import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { SessionAction } from '../../store/actions';
import {Link} from 'react-router-dom';

import {
    Card,
    Form
} from 'semantic-ui-react';
import './../../assets/styles/components/newQuestion.css';

const getUnanswered = (questions = [], credentials = [], users = []) => {
    const q = Object.values(questions);
    const userAnswers = Object.keys(credentials.answers);
    const userUnanswered = q.filter(e => userAnswers.indexOf(e.id) === -1);

    userUnanswered.forEach(e => {
        e.avatarURL = users[e.author].avatarURL
        e.name = users[e.author].name
        e.section = 'unanswered'
    });
    return userUnanswered;
}
class NewQuestion extends React.PureComponent
{
    state = {
        values: {
            questionOne: '',
            questionTwo: ''
        }
    };

    onQuestionsSubmit = () =>
    {

        const userRather = unanswered[0];

        changeItem && changeItem('User Rather', 'userRather', userRather);

        const { dispatch, credentials, changeItem, unanswered } = this.props;
        const { questionOne, questionTwo } = this.state.values;

        const response = {
            author: credentials.id,
            optionOneText: questionOne,
            optionTwoText: questionTwo
        }

        dispatch(
            SessionAction.Action(SessionAction.Types.FETCH_QUESTION, response)
        );


    };

    onInputChange = (e, { id, value }) =>
    {
        this.setState(prevState =>
        {
            const newValues = {
                ...prevState.values,
                [id]: value
            };

            return {
                values: newValues,
            };
        });
    };

    render()
    {
        const { match, unanswered } = this.props;

        return (
            <Form id='questions-form' onSubmit={ this.onQuestionsSubmit }>
            <Card.Group>
            <Card>
                <Card.Content>
                    <Card.Header>Create a new question!</Card.Header>
                    <Card.Meta>Complete the question</Card.Meta>
                    <Card.Description>

                            <strong className="titleRather">Would You Rather ...</strong>

                            <Form.Field
                                fluid
                                control={ Form.Input }
                                id="questionOne"
                                placeholder='Question one'
                                onChange={ this.onInputChange }
                                value={ this.state.values.questionOne }
                                required
                            />

                            <strong className="titleRather">or</strong>

                            <Form.Field
                                fluid
                                control={ Form.Input }
                                id="questionTwo"
                                placeholder='Question teo'
                                onChange={ this.onInputChange }
                                value={ this.state.values.questionTwo }
                                required
                            />

                    </Card.Description>

                </Card.Content>
                <Card.Content extra>

                    <Link to="main" >
                        <Form.Button
                            fluid
                            color='teal'
                            type='submit'
                        >
                            Submit
                        </Form.Button>
                    </Link>

                </Card.Content>
            </Card>
        </Card.Group>
        </Form>
        );
    }
}

NewQuestion.propTypes = {

    onInputChange: PropTypes.func,
    onQuestionsSubmit: PropTypes.func,
    credentials: PropTypes.objectOf(PropTypes.any),

};

function mapStateToProps({
    [SessionAction.Key]: {
        credentials,
        users,
        questions
    }
}) {
    return {
        credentials,
        unanswered: getUnanswered(questions, credentials, users)
    };
}

export default connect(mapStateToProps)(withRouter(NewQuestion));
