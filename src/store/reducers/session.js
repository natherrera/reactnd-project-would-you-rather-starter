import SessionAction from '../actions/session';
import {SessionDefaults} from './defaults';

function SessionReducer(state = SessionDefaults, action) {
    switch (action.type) {
        case SessionAction.Types.GET_USERS:
            return {
                ...state
            };

        case SessionAction.Types.FETCH_USERS:
            return {
                ...state,
                usersLoading: ! state.users || Object.keys(state.users).length === 0
            };

        case SessionAction.Types.FETCH_USERS_SUCCESS:
            delete state.errorMessage;

            return {
                ...state,
                users: action.payload.users,
                usersLoading: false
            };

        case SessionAction.Types.FETCH_USERS_ERROR:

            return {
                ...state,
                usersLoading: false,
                errorMessage: action.payload.errorMessage
            };

        case SessionAction.Types.GET_QUESTION:
            return {
                ...state
            };

        case SessionAction.Types.GET_QUESTION_SUCCESS:
        {
                delete state.errorMessage;

            return {
                ...state,
                questions: action.payload.questions,
                questionLoading: false
            }
        }

        case SessionAction.Types.GET_QUESTION_ERROR:
            return {
                ...state,
                questionLoading: false,
                errorMessage: action.payload.errorMessage
            };

        case SessionAction.Types.FETCH_QUESTION:
            return {
                ...state
            };

        case SessionAction.Types.FETCH_QUESTION_SUCCESS:

            {
                const {id, author} = action.payload.response;
                const setScore = state.users[author].score + 10;

                return {
                    ...state,
                    credentials: {
                        ...state.credentials,
                        questions: {
                            ...state.credentials.questions,
                            id,
                        }
                    },
                    users: {
                        ...state.users,
                        [author]: {
                            ...state.users[author],
                            questions: [
                                ...state.users[author].questions,
                                id,
                            ],
                            score: setScore
                        }
                    },
                    questions: {
                        ...state.questions,
                        [id]: action.payload.response
                    }
                };
            }


        case SessionAction.Types.FETCH_QUESTION_ERROR:

            return {
                ...state,
                questionLoading: false,
                errorMessage: action.payload.errorMessage
            };


        case SessionAction.Types.FETCH_QUESTION_ANSWER:
            return {
                ...state
            };

        case SessionAction.Types.FETCH_QUESTION_ANSWER_SUCCESS:

            {
                const {authUser, qid, id} = action.payload;
                const setScore = state.users[authUser].score + 10;

                return {
                    ...state,
                    credentials: {
                        ...state.credentials,
                        answers: {
                            ...state.credentials.answers,
                            [qid]: id
                        }
                    },
                    users: {
                        ...state.users,
                        [authUser]: {
                            ...state.users[authUser],
                            answers: {
                                ...state.users[authUser].answers,
                                [qid]: id
                            },
                            score: setScore
                        }
                    },
                    questions: {
                        ...state.questions
                    }
                };
            }

        case SessionAction.Types.FETCH_QUESTION_ANSWER_ERROR:

            return {
                ...state,
                questionLoading: false,
                errorMessage: action.payload.errorMessage
            };

        case SessionAction.Types.LOGIN:
            return {
                ...state,
                loading: true
            };

        case SessionAction.Types.LOGIN_SUCCESS:
            delete state.errorMessage;

            return {
                ...state,
                loading: false,
                authenticated: true,
                credentials: action.payload
            };

        case SessionAction.Types.LOGIN_ERROR:

            return {
                ...state,
                loading: false,
                authenticated: false,
                errorMessage: action.payload.errorMessage
            };

        case SessionAction.Types.LOGOUT:
            return {
                loading: false,
                authenticated: false
            };

        default:
            return state;
    }
}

export default SessionReducer;
