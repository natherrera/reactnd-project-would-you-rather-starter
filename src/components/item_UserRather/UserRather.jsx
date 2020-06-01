import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { SessionAction } from '../../store/actions';

import {
    Card,
    Image,
    Form,
    Progress,
    Button
} from 'semantic-ui-react';

class UserRather extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            activeResult: true
        };
    }

    getPercent = (votes) => {
        const { users } = this.props;
        const totalUsers = Object.keys(users).length
        const calcPercent = (votes * 100) / totalUsers;
        return calcPercent;
    }

    close = () => this.setState({ activeResult: false })

    render() {

        const { userRather, users } = this.props;
        const { activeResult } = this.state;
        const totalUsers = Object.keys(users).length

        return(
            <>
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
                                    <Form.Field label={userRather.optionOne.text} control='input' type='radio' name='htmlRadios'/>
                                    <Form.Field label={userRather.optionTwo.text} control='input' type='radio' name='htmlRadios'/>
                                </Form.Group>
                            </>
                        ) : (
                            <>
                                <Card.Description>
                                    <strong>Results</strong>
                                </Card.Description>
                                <div className="item-result">
                                    {
                                        userRather.answer[0].option === 'optionOne' && (
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
                                        <Progress percent={this.getPercent(userRather.optionOne.votes.length)}
                                            success>
                                                {userRather.optionOne.votes.length} out of {totalUsers} votes
                                        </Progress>
                                    </div>
                                </div>
                                <br/>
                                <div className="item-result">
                                    <div className="item-title">
                                    {
                                        userRather.answer[0].option === 'optionTwo' && (
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
                                        <Progress percent={this.getPercent(userRather.optionTwo.votes.length)}
                                            success>
                                            {userRather.optionTwo.votes.length} out of {totalUsers} votes
                                        </Progress>
                                    </div>
                                </div>
                            </>
                        )
                    } </Card.Content>
                    {
                    activeResult && (

                        <Card.Content extra>
                            <div className='ui two buttons'>
                                <Button onClick={this.close} color='teal'>Submit</Button>
                            </div>
                        </Card.Content>

                    )
                } </Card>

            </>
        )
    }
}

UserRather.propTypes = {

    getVotes: PropTypes.func,
    close: PropTypes.func,
    users: PropTypes.objectOf(PropTypes.any),
    userRather: PropTypes.objectOf(PropTypes.any),
    activeResult: PropTypes.bool
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
        users
    };
}

export default connect(mapStateToProps)(withRouter(UserRather));

