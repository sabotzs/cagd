# cagd
This is a course project for the subject Computer Aided Geometric Design. It implements the degree elevation of a Bezier curve. The drawing is done with the de Casteljau's algorithm

## Requirements
To run this project, you must have [node.js](https://nodejs.org/en/download).

When you have `node` installed on your machine, run the following scripts:
```bash
npm install # Install needed dependencies
npx vite # Run the surver
```
When you've started the server, go to [http://localhost:5173/]()

## Interacting with the program
### Interaction with the canvas
* Left click to add a control point
* Right click on control point to remove it
* Drag the point to move it where you want
### Interaction with the sidebar controls
The input field, labeled "Elevated degree" sets the degree to which we want to elevate the input polygon. After you interact with it, it draws an additional polygon, whose degree is the provided value. Its value can not go lower than the input polygon degree. **N.B:** Any innteraction with the input polygon resets the elevated degree.

The input field, labeled "Curve steps" represent the number of lines used to draw the curve. The higher the number, the smoother the curve.

The 2 checkboxes set whether the respective polygon is drawn on the canvas.

The reset button clears the canvas and resets the elevated degree and curve step values.
