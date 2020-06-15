import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

export default function Title(props) {
    return (
        <React.Fragment>
            <CssBaseline />
            <Typography component="h1" variant="h4" className="title" align={props.align}>
            {props.children}
            </Typography>
        </React.Fragment>
    )
}

//so you just write <Title>Write Title</Title> and whatever is between the two <></> will be rendered with the above styling
//if you put <Title align="center"></Title> it'll center it