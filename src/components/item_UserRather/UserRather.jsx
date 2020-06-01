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

    getVotes = () => {

    }

    close = () => this.setState({ activeResult: false })

    render() {

        const { userRather } = this.props;
        const { activeResult } = this.state;
        console.log(userRather);

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
                                        <Progress percent={100}
                                            success>
                                            The progress was successful
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
                                        <Progress percent={100}
                                            success>
                                            The progress was successful
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

