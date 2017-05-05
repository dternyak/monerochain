import React, {Component} from "react";
import Paragraph from "grommet/components/Paragraph";
import Box from "grommet/components/Box";
import GFooter from "grommet/components/Footer";


export default class Footer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container column">
                <hr className="is-desktop"/>
                <GFooter justify='between'>
                    <Box direction='row'
                         pad={{"between": "medium"}}>
                        <Paragraph margin='none'>
                            {'                     '} © 2017 MoneroChain
                        </Paragraph>
                        <a>
                            <i className="fa fa-github" aria-hidden="true"></i> Fork on GitHub</a>
                        {/*<Menu direction='row'*/}
                        {/*size='small'*/}
                        {/*dropAlign={{"right": "right"}}>*/}
                        {/*<Anchor href='#'>*/}
                        {/*Support*/}
                        {/*</Anchor>*/}
                        {/*<Anchor href='#'>*/}
                        {/*Contact*/}
                        {/*</Anchor>*/}
                        {/*<Anchor href='#'>*/}
                        {/*About*/}
                        {/*</Anchor>*/}
                        {/*</Menu>*/}
                    </Box>
                </GFooter>
            </div>
        )
    }
}
