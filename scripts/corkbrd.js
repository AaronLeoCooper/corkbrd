

// Corkbrd isolated main script
(function(window){

  var defaults = {
    canvasOpts: {
      parent: "body",
      tag: "div",
      id: "",
      classes: "",
      styles: {},
      position: [0, 0],
      size: [800, 600]
    },
    panelOpts: {
      tag: "div",
      classes: "",
      styles: {},
      position: [],
      size: []
    },
  };

  // Init
  this.Corkbrd = function(opts, data) {

    var _this = this;

    this.options = extend(defaults, opts);

    // Generate the panels
    var panelsHTMLArr = newPanels(data, this.options.panelOpts);

    // Generate the canvas
    this.canvasHTML = buildHTML(this.options.canvasOpts);

    // Append all panels to the canvas
    this.appendToCanvas(panelsHTMLArr);

    console.log(this);

    // Finally append the constructed canvas to the parent element specified
    $(this.options.canvasOpts.parent).append(this.canvasHTML);

  };

  Corkbrd.prototype.appendToCanvas = function (HTMLArr) {
    for ( var i = 0; i < HTMLArr.length; i++ ) {
      this.canvasHTML.append( HTMLArr[i] );
    }
  };

  Corkbrd.prototype.serialise = function () {
    var json = [];
    this.canvasHTML.children().each(function() {
      var $this = $(this);
      json.push({
        id: $this.attr('id') || "",
        classes: $this.attr('class') || "",
        position: [ ($this.css('left') || ""), ($this.css('top') || "") ],
        size: [ ($this.css('width') || ""), ($this.css('height') || "") ],
        contentHTML: $this.html(),
      })
    });
    return json;
  };

  // Extend objects
  function extend(base, extend) {
    for (var k in extend) {
      base[k] = extend[k];
    }
    return base;
  }

  function buildHTML(opts) {
    var newHTML = $('<'+opts.tag+' id="'+opts.id+'" class="'+opts.classes+'"/>');
    if ( opts.styles ) newHTML.css(opts.styles);
    if ( opts.contentHTML ) newHTML.html( opts.contentHTML );

    if ( opts.hasOwnProperty('panel') && opts.panel === true ) {
      newHTML.css({
        position: 'absolute',
        display: 'block',
        left: typeof opts.position[0] !== "undefined" ? opts.position[0] : 0,
        top: typeof opts.position[1] !== "undefined" ? opts.position[1] : 0,
        width: typeof opts.size[0] !== "undefined" ? opts.size[0] : '',
        height: typeof opts.size[1] !== "undefined" ? opts.size[1] : '',
      });
    }
    else {
      newHTML.css({
        position: 'relative',
        display: 'block',
      });
    }

    return newHTML;
  }

  function newPanels(data, opts) {
    var panels = [];
    for ( var i = 0; i < data.length; i++ ) {
      data[i].panel = true;
      panels.push( buildHTML(data[i]) );
    }
    return panels;
  }

})(window);

window.onload = function() {

  var options = {
    canvasOpts: {
      parent: "#corkbrd",
      tag: "div",
      id: "",
      classes: "",
      styles: {
        background: "#eee"
      },
      position: [0, 0],
      size: [800, 600]
    },
    panelOpts: {
      tag: "div",
      classes: "",
      styles: {},
      position: [],
      size: []
    },
  };

  var data = [
    {
      id: "",
      classes: "",
      position: [0, 0],
      size: [200, 300],
      contentHTML: "<p>Something goes here</p>",
    },
    {
      id: "",
      classes: "",
      position: [100, 400],
      size: [150, 350],
      contentHTML: "<p>Here too!</p>",
    },
  ];

  var cb = new Corkbrd(options, data);

  console.log( cb.serialise() );

  $('body').click(function() {
    console.log( cb.serialise() );
  });

};
