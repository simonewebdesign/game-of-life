John Conway's Game of Life
==========================

![Screenshot](https://raw.github.com/simonewebdesign/game-of-life/master/screenshot.png)

The Rules
---------

The **Game of Life** was invented by John Conway (as you might have gathered). The game is played on a **field of cells**, each of which has eight neighbors (adjacent cells). A cell is either occupied (by an organism) or not. The rules for deriving a generation from the previous one are these:

### Death
If an occupied cell has 0, 1, 4, 5, 6, 7, or 8 occupied neighbors, the organism dies (0, 1: of loneliness; 4 thru 8: of overcrowding).

### Survival
If an occupied cell has two or three neighbors, the organism survives to the next generation.

### Birth
If an unoccupied cell has three occupied neighbors, it becomes occupied.

Where You Can Find More
-----------------------

The original article describing the game can be found in the April 1970 issue of [Scientific American](http://www.sciam.com/), page 120.

A [PostScript](http://www.tjhsst.edu/~edanaher/pslife/) implementation, of all things. *Very cool*!

*Here's a handy [Google query](http://www.google.com/search?q=%22john+conway%22+%22game+of+life%22+%22scientific+american%22&ie=UTF-8&oe=UTF-8).*

*****

This content was shamelessly copy-pasted from [here](http://www.tech.org/~stuart/life/rules.html).