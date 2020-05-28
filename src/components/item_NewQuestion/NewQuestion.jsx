import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Card,
    Form
} from 'semantic-ui-react';
import './../../assets/styles/components/newQuestion.css';
import { SessionAction } from '../../store/actions';


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

        const { dispatch, credentials } = this.props;
        const { questionOne, questionTwo } = this.state.values;

        const response = {
            author: credentials.name,
            id: credentials.id,
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

        return (
            <Form id='questions-form' onSubmit={ this.onQuestionsSubmit }>
            <Card.Group>
            <Card>
                <Card.Content>
                    <Card.Header>Create a new question!</Card.Header>
                    <Card.Meta>Complete the question</Card.Meta>
                    <Card.Description>

                            <strong>Would You Rather ...</strong>

                            <Form.Field
                                fluid
                                control={ Form.Input }
                                id="questionOne"
                                placeholder='Question one'
                                onChange={ this.onInputChange }
                                value={ this.state.values.questionOne }
                                required
                            />

                            <strong>or</strong>

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

                    <Form.Button
                        fluid
                        color='teal'
                        type='submit'
                    >
                        Submit
                    </Form.Button>

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
        authenticated,
        credentials
    }
}) {
    return {
        authenticated,
        credentials,
    };
}

export default connect(mapStateToProps)(withRouter(NewQuestion));
