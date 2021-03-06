import React, { Component } from "react";
import { Route, Switch,Redirect } from "react-router-dom";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import Page from "./Page"
import seedColors from "./seedColors";
import NewPaletteForm from "./NewPaletteForm";
import { generatePalette } from "./colorHelpers";
import {TransitionGroup,CSSTransition} from "react-transition-group"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { palettes: [] };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }

  addToLocalStorage = (addItem) => {
    window.localStorage.setItem("palettes",JSON.stringify(addItem))
    const parse = window.localStorage.getItem("palettes")
    console.log(JSON.parse(parse))
  }
  findPalette(id) {
    console.log(this.state.palettes)
    const result = this.state.palettes.find(function(palette) {
      return palette.id === id;
    });
    console.log(result)
    return result
  }

  componentDidMount(){
    try{
     const savedPalette = JSON.parse(window.localStorage.getItem("palettes"))
     if(savedPalette === null){
       this.addToLocalStorage(seedColors)
      }
       this.setState(curSt => ({
         palettes:savedPalette
       }))
    }catch(e){
      console.log(e)
    }
  }


  gatherPaletteName = () => {
    let arr = []
    this.state.palettes.map(m => arr.push(m.paletteName))
    return arr 
  }
 
  savePalette(newPalette) {
    const addPalette =[ 
      ...this.state.palettes,newPalette
    ]
    this.setState(curSt => ({
      palettes:[...curSt.palettes,newPalette]
    }),this.addToLocalStorage(addPalette))
    }

  deletePalette = (id) => {
    const newPalette = this.state.palettes.filter(m => m.id !== id)
    this.setState(curSt => ({
      palettes:[...newPalette]
    }),
    this.addToLocalStorage(newPalette))
    console.log(newPalette.length)
  }

  render() {
    const isReady = this.state.palettes.length < 1
    console.log(this.state.palettes)
    if(!isReady){
    return (
      <Route render={({location}) => (
        <TransitionGroup>
          <CSSTransition
          classNames="page" timeout={300}
          key={location.key}
          >
        <Switch location={location}>
   
        <Route
          exact
          path='/palette/new'
          render={routeProps => (
            <Page>
            <NewPaletteForm
              paletteNames={this.gatherPaletteName()}
              savePalette={this.savePalette}
              // palettes={this.state.palettes}
              {...routeProps}
            />
            </Page>
          )}
        />
        <Route
          exact
          path='/palette/:paletteId/:colorId'
          render={routeProps => (
            <Page>
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
            />
            </Page>
          )}
        />
        <Route
          exact
          path='/'
          render={routeProps => (
            <Page>
            <PaletteList palettes={this.state.palettes} 
            handleDelete={this.deletePalette} {...routeProps} />
            </Page>
          )}
        />
        <Route
          exact
          path='/palette/:id'
          render={routeProps => (
            <Page>
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
              routeProps ={routeProps}
            />
            </Page>
          )}
        />
        <Route render = { () => <Redirect to="/" /> } />
      </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} />
    )}else{
      return(
        <h1>Loading</h1>
      )
    }
  }
}

export default App;
