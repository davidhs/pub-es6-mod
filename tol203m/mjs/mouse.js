
export const mouse = {
  // Current mouse coordinates.
  x: 0,
  y: 0,

  // Previous mouse coordinates.
  px: 0,
  py: 0,

  // Whether mouse is over element.
  over: false,

  // Mouse buttons
  button: {
    // Whether any button is down
    down: false,
    x: 0,
    y: 0,

    // Where and whether left, middle or right buttons are down
    left: {
      down: false,

      x: 0,
      y: 0,
    },
    middle: {
      down: false,

      x: 0,
      y: 0,
    },
    right: {
      down: false,

      x: 0,
      y: 0,
    }
  }
};
