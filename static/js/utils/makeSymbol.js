function makeSymbol(){
  return {
    makePoint(){
      var mySymbol = new esri.symbol.SimpleMarkerSymbol(
        esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE,
        20,
        new esri.symbol.SimpleLineSymbol(
          esri.symbol.SimpleLineSymbol.STYLE_SOLID,
          new esri.Color([0, 40, 255, 0.9]),
          1
        ),
        new esri.Color([0, 255, 255, 0.5])
      );

      return mySymbol;
    },
    makePointRelated(){
      var mySymbol = new esri.symbol.SimpleMarkerSymbol(
        esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE,
        10,
        new esri.symbol.SimpleLineSymbol(
          esri.symbol.SimpleLineSymbol.STYLE_SOLID,
          new esri.Color([128, 0, 255, 0.9]),
          1
        ),
        new esri.Color([128, 0, 255, 0.5])
      );
      return mySymbol;
    },
    makeLine(){
      var mySymbol = new esri.symbol.CartographicLineSymbol(
        esri.symbol.CartographicLineSymbol.STYLE_SOLID,
        new esri.Color([0,0,255,0.9]), 15,
        esri.symbol.CartographicLineSymbol.CAP_ROUND,
        esri.symbol.CartographicLineSymbol.JOIN_MITER, 5
      );

      return mySymbol;
    },
    makePolygon(){
      var mySymbol = "not defined yet";
      console.log("still not defined");
      return mySymbol;
    },
    makeTrackLine(){
      var mySymbol = new esri.symbol.CartographicLineSymbol(
        esri.symbol.CartographicLineSymbol.STYLE_SOLID,
        new esri.Color([255,0,51,0.9]), 5,
        esri.symbol.CartographicLineSymbol.CAP_ROUND,
        esri.symbol.CartographicLineSymbol.JOIN_MITER, 5
      );

      return mySymbol;
    },
    makePointCustomer(){
      var mySymbol = new esri.symbol.SimpleMarkerSymbol(
        esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE,
        20,
        new esri.symbol.SimpleLineSymbol(
          esri.symbol.SimpleLineSymbol.STYLE_SOLID,
          new esri.Color([0, 14, 156, 5]),
          1
        ),
        new esri.Color([0, 14, 156, 5])
      );

      return mySymbol;
    },
    makePointPipe(){
      var mySymbol = new esri.symbol.SimpleMarkerSymbol(
        esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE,
        20,
        new esri.symbol.SimpleLineSymbol(
          esri.symbol.SimpleLineSymbol.STYLE_SOLID,
          new esri.Color([156, 0, 0, 5]),
          1
        ),
        new esri.Color([156, 0, 0, 5])
      );

      return mySymbol;
    },
    makePointAddress(){
      var mySymbol = new esri.symbol.SimpleMarkerSymbol(
        esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE,
        20,
        new esri.symbol.SimpleLineSymbol(
          esri.symbol.SimpleLineSymbol.STYLE_SOLID,
          new esri.Color([152, 0, 156, 1]),
          1
        ),
        new esri.Color([152, 0, 156, 1])
      );

      return mySymbol;
    }
  }
}

export default makeSymbol();
