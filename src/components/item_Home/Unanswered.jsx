import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { SessionAction } from '../../store/actions';

import {
    Item,
    Button
} from 'semantic-ui-react';


const getUnQuestions = (questions, credentials) => {
    const q = Object.values(questions);
    const cq = Object.keys(credentials.answers);
    const userUnQuestions = q.filter(e => cq.indexOf(e.id) === -1);
    return userUnQuestions;
}
class Unanswered extends React.PureComponent {


    changeItem = () => {
        const { changeItem } = this.props;
        changeItem && changeItem('None');
    }

    render() {


        const { users, unanswered} = this.props;

        return (
            <>
            {
                unanswered.map((user) =>

                <Item key={user.id}>
                    <Item.Image size='small' src={users[user.author].avatarURL} />

                    <Item.Content >
                        <Item.Header>{users[user.author].name} asks: </Item.Header>
                        <Item.Description>
                            <h3>Would you rather ...</h3>
                            <p> { user.optionOne.text }  </p>
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

Unanswered.propTypes = {

    changeItem: PropTypes.func,
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
        users: users,
        unanswered: getUnQuestions(questions, credentials)
    };
}

export default connect(mapStateToProps)(withRouter(Unanswered));
