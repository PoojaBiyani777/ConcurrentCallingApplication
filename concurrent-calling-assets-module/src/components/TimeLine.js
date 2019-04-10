import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme =>
({
    timeLineBackground :
    {
        backgroundColor: "white",
        paddingTop: "50px",
        marginTop: "70px",
        marginRight: "100px",
        width: "70%",
        height: "100%",
        float: "right",
    
    }
})

export class TimeLine extends Component 
{
  constructor(props)
  {
    super(props);
  }
    
  render() 
  {
    const { classes } = this.props;
    return (
      <div className = { classes.timeLineBackground }>
        TimeLine
      </div>
    )
  }
}

export default withStyles(styles)(TimeLine);
