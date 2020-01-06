import React, { Component } from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteListStyles";
import {TransitionGroup,CSSTransition} from "react-transition-group"
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from "@material-ui/core/Avatar"
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from "@material-ui/icons/Check"
import CloseIcon from "@material-ui/icons/Close"
import blue from "@material-ui/core/colors/blue"
import red from "@material-ui/core/colors/red"


class PaletteList extends Component {
  state={
    openDialog:false,
    currentId:""
  }

toggleDialog = (curId) => {
  this.setState(curSt => ({
    openDialog:!curSt.openDialog,
    currentId:curId
  }))
}


doDelete = () => {
  this.props.handleDelete(this.state.currentId)
  this.toggleDialog()
}

  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }
  render() {
    const { palettes, classes,handleDelete } = this.props;
    const {openDialog} = this.state
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors</h1>
            <Link to='/palette/new'>Create Palette</Link>
          </nav>
            <TransitionGroup className={classes.palettes}> 
            {palettes.map(palette => (
              <CSSTransition
              key={palette.id}
              classNames="fade"
              timeout={500}
              >

              <MiniPalette
              key={palette.id}
              handleDelete={handleDelete}
                {...palette}
                toggleDialog={this.toggleDialog }
                handleClick={() => this.goToPalette(palette.id)}
              />

              </CSSTransition>
            ))}
            </TransitionGroup>
        </div>
        <Dialog
        onClose={this.toggleDialog}
        open={openDialog} aria-labelledby="delete-dialog-title">
          <DialogTitle>Delete This Palette ?</DialogTitle>
          <List>
            <ListItem button onClick={this.doDelete} >
              <ListItemAvatar>
                <Avatar style={{backgroundColor:blue[100],color:blue[400]}}>
                  <CheckIcon></CheckIcon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete"/>
            </ListItem>

            <ListItem button onClick={this.toggleDialog}>
              <ListItemAvatar>
                <Avatar style={{backgroundColor:red[100],color:red[400]}}>
                  <CloseIcon></CloseIcon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel"/>
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(PaletteList);
