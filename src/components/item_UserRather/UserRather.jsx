import React, { Suspense } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { SessionAction } from '../../store/actions';

import {
    Card,
    Image,
    Form,
    Progress,
    Button,
    Dimmer,
    Loader,
    Segment
} from 'semantic-ui-react';

class UserRather extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            activeResult: true,
            answer: {}
        };
    }

    getPercent = (votes) => {
        const { users } = this.props;
        const nrVotes = this.getVotes(votes);
        const totalUsers = Object.keys(users).length
        const calcPercent = (nrVotes * 100) / totalUsers;
        return calcPercent;
    }

    onRadioChange = (answer, event) =>
    {
        const { authUser, userRather } = this.props;
        answer.id = event.target.id;
        answer.authUser = authUser;
        answer.qid = userRather.id;
        userRather.answer = answer;
        this.setState({ answer });
    };

    sendQuestionAnswer = () => {

        Promise.all([
            this.fetchQuestionAnswer()
          ]).then(this.setState({ activeResult: false }))
    }

    fetchQuestionAnswer = () => {
        const { dispatch } = this.props;
        const { answer } = this.state;
        return dispatch(
            SessionAction.Action(SessionAction.Types.FETCH_QUESTION_ANSWER, answer),
        )
    }

    getVotes = (option) => {
        const { userRather, questions} = this.props;
        const idQ = userRather.id;
        const q = Object.keys(questions).filter(e => e === idQ);
        const question = questions[q][option];
        const votesQ = question && question.votes;
        const sizer = votesQ && Object.keys(votesQ).length;
        const result = isNaN(sizer) ? 0 : sizer;

        return result;
    }

    render() {

        const { userRather, users, credentials } = this.props;
        const { activeResult } = this.state;
        const totalUsers = Object.keys(users).length;

        return(
            <>
                <Loader message='Cargando' />
                <Card>
                    <Card.Content>
                        <Image circular size='mini' src={userRather.avatarURL}/>
                        <Card.Header>{ userRather.name }</Card.Header>
                        <Card.Meta>asks:</Card.Meta>
                        {
                            activeResult && userRather.section === 'unanswered' ? (
                            <>
                                <Card.Description>
                                    <strong>Would You Rather ...</strong>
                                </Card.Description>
                                <Form.Group grouped>
                                    <Form.Field label={userRather.optionOne.text} id='optionOne' control='input' type='radio' name='answer' onChange={ (event) => this.onRadioChange(userRather.optionOne, event) }/>
                                    <Form.Field label={userRather.optionTwo.text} id='optionTwo' control='input' type='radio' name='answer' onChange={ (event) => this.onRadioChange(userRather.optionTwo, event) }/>
                                </Form.Group>
                            </>
                        ) : (
                            <>
                            <Suspense fallback={ <Loader message='Cargando' /> }>
                                <Card.Description>
                                    <strong>Results</strong>
                                </Card.Description>
                                <div className="item-result">
                                    {
                                        (credentials.answers[userRather.id] && credentials.answers[userRather.id] === 'optionOne') && (
                                            <div className="insign" >
                                                <p>You choose this!</p>
                                            </div>
                                        )
                                    }
                                    <div className="item-title">
                                        <p>Would you rather

                                            <span>{userRather.optionOne.text}</span>
                                        </p>
                                    </div>
                                    <div className="item-progressBar">
                                        <Progress percent={this.getPercent('optionOne')}
                                            success>
                                                {this.getVotes('optionOne')} out of {totalUsers} votes
                                        </Progress>
                                    </div>
                                </div>
                                <br/>
                                <div className="item-result">
                                    <div className="item-title">
                                    {
                                        (credentials.answers[userRather.id] && credentials.answers[userRather.id] === 'optionTwo') && (
                                            <div className="insign" >
                                                <p>You choose this!</p>
                                            </div>
                                        )

                                    }
                                        <p>Would you rather
                                        <span>{userRather.optionTwo.text}</span>
                                        </p>
                                    </div>
                                    <div className="item-progressBar">
                                        <Progress percent={this.getPercent('optionTwo')}
                                            success>
                                            {this.getVotes('optionTwo')} out of {totalUsers} votes
                                        </Progress>
                                    </div>
                                </div>
                                </Suspense>
                            </>
                        )
                    } </Card.Content>
                    {
                    activeResult && userRather.section === 'unanswered' && (

                        <Card.Content extra>
                            <div className='ui two buttons'>
                                <Button onClick={this.sendQuestionAnswer} color='teal'>Submit</Button>
                            </div>
                        </Card.Content>

                    )
                }

                </Card>

            </>
        )
    }
}

UserRather.propTypes = {

    getPercent: PropTypes.func,
    getVotes: PropTypes.func,
    sendQuestionAnswer: PropTypes.func,
    fetchQuestionAnswer: PropTypes.func,
    onRadioChange: PropTypes.func,
    close: PropTypes.func,
    users: PropTypes.objectOf(PropTypes.any),
    userRather: PropTypes.objectOf(PropTypes.any),
    activeResult: PropTypes.bool,
    totalUsers: PropTypes.number,
};

function mapStateToProps({
    [SessionAction.Key]: {
        credentials,
        users,
        questions,
    }
}) {
    return {
        credentials: credentials || {},
        users,
        authUser: credentials.id,
        questions
    };
}

export default connect(mapStateToProps)(withRouter(UserRather));

