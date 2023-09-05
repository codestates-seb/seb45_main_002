const style = {
  layout: {
    maxWidth: window.innerWidth,
    realWidth: window.innerWidth-(window.innerWidth/8*2),
    maxHeight: window.innerHeight,
    sideMargin: window.innerWidth/8,
    wideMargin: {
      width: window.innerWidth-(window.innerWidth/8*2)/20,
      height: window.innerHeight/20
    },
    narrowMargin: {
      width: window.innerWidth-(window.innerWidth/8*2)/20/2,
      height: window.innerHeight/20/2
    },
    header: {
      height: window.innerHeight/16
    },
    main: {
      width: window.innerWidth/4*3,
      height: window.innerHeight-(window.innerHeight/16)-(window.innerHeight/20)
    },
    sidebar: {
      width: window.innerWidth/8/3-(window.innerWidth-(window.innerWidth/8*2)/20),
      icon: {
        height: window.innerHeight/16-(window.innerHeight/20/2)
      }
    }
  }
}
export default style;