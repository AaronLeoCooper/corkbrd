# Experimental 'corkboard' HTML layout creator

This is a little plugin of sorts written in Javascript that allows adding/removing and serialising of HTML tags to and from JSON.

I wanted to create this to make creating and editing custom layouts for a variety of media easy. One specific use case I want to address is the maintaining of restaurant menus.


## Main Goals

1. It **must** be extremely user-friendly and gorgeous to look at (UI/UX-centric)
2. It **must** be universally applicable - one use case isn't good enough
3. It **must** be maintainable and be as modular as possible - I see this being ported to JS frameworks and in different flavours to suit developer needs in more than one scenario

Not all functionality is here yet; there's _much_ more to come in due course.


## Requirements

For now, just jQuery. This won't always be the case however, but for rapid development in the short amount of free development time I have (this is a personal project, after all) I'm making use of jQuery to sidestep annoyances in vanilla JS.

Older browser compatibility will be considered further down the line. Right now, this isn't a concern of mine.


## Basic usage

```javascript
// Define your options
var options = {
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
  }
};

// Define your data that will convert to HTML
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

// Create a new instance of Corkbrd, HTML is generated on instantiation
var cb = new Corkbrd(options, data);

// ... do some things with the html ...

// Later convert the HTML back into JSON
var json = cb.serialise();

```


## Todo:

- Many more options to add
- Editability of the generated HTML via inline WYSIWYG (this is key for this project)
- Conversion of HTML to `<canvas>` and then exporting options for image formats for web & print
- Create a much better write-up here once the project is more well-established and usable
- Easy repositioning & resizing of elements in the canvas


#### But aren't there other plugins and stuff out there like this?

Sure, but I've yet to find one that does, for free, and is distributed on an open-source license, the things I have in mind for this plugin.
