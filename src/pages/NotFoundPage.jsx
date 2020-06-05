import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Statistic } from 'semantic-ui-react';


class NotFoundPage extends React.Component
{

    render()
    {
        return (
            <Grid>
                <Grid.Row className='container' centered>
                    <Statistic>
                        <Statistic.Value className='notfound-404'>Error</Statistic.Value>
                        <Statistic.Label>An error happens!</Statistic.Label>
                    </Statistic>
                </Grid.Row>

                <Grid.Row centered>
                    <Link to='/main'>
                        <Button
                            color='teal'
                            content='Home'
                        />
                    </Link>
                </Grid.Row>
            </Grid>
        );
    }
}

export default NotFoundPage;
