import sizes from "./sizes"
import bg from "./bg.svg"
export default {
  "@global":{
    ".fade-exit":{
      opacity:'1'
    },
    ".fade-exit-active":{
      opacity:"0",
      transition:'opacity .3s ease-out'
    }
  },
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    overflow:"scroll",
       /* background by SVGBackgrounds.com */
    backgroundColor:"#1e8feb",
    backgroundImage:`url(${bg})`
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    [sizes.down("xl")]:{
      width:"80%"
    },
    [sizes.down("xs")]:{
      width:"70%"
    }
    },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    "& a": {
      color: "white"
    }
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "5%",
    [sizes.down("sm")]:{
      gridTemplateColumns:"repeat(2,50%)",
      gridGap:".7rem"
    },
    [sizes.down("xs")]:{
      gridTemplateColumns:"repeat(1,100%)",
      gridGap:".5rem"
    }
  }
};
