//var theTable = document.getElementById('tableId');
// theTable.tBodies[0].appendChild(document.createElement('tr'));

var table = document.getElementById('table');
var tbody = table.tBodies[0];

var DEAD = '',
    ALIVE = 'rgb(255, 0, 0)';

//var a, b, x, y = 0;

//var firstRow = tbody.rows[0];

//var c2x3 = tbody.rows[2].cells[3];
//c2x3.style.backgroundColor = DEAD;
//var c0x0 = tbody.rows[0].cells[0];
//c0x0.style.backgroundColor = ALIVE;


/* LOOPING
for (var a=0; a < tbody.rows.length; a++) {
//console.log(tbody.rows[a]);
  for (var b=0; b < tbody.rows[a].cells.length; b++) {
  //console.log(tbody.rows[a].cells[b]);
  }
}
*/

//console.log(tbody.rows[3].cells[4].style.backgroundColor);

/*
if (c0x0.style.backgroundColor == ALIVE) {
  console.log('alive');
}
*/

/* BINDING THE ALIVE EVENT TO EACH CELL */
for (i=0; i < tbody.rows.length; i++) {
  //console.log(tbody.rows[a]);
  for (j=0; j < tbody.rows[i].cells.length; j++) {
    //console.log(tbody.rows[a].cells[b]);
    tbody.rows[i].cells[j].addEventListener('click', function(ev){

      this.style.backgroundColor == DEAD ? 
      this.style.backgroundColor = ALIVE : 
      this.style.backgroundColor = DEAD;

    }, false);
  }
}

/* THE GAME OF LIFE
**
** 1st rule
** Any live cell with fewer than two live neighbours dies, as if caused by under-population.
**
** 2nd rule
** Any live cell with two or three live neighbours lives on to the next generation.
**
** 3rd rule
** Any live cell with more than three live neighbours dies, as if by overcrowding.
**
** 4th rule
** Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
**
*/


document.getElementById('start').addEventListener('click', function(){

  setInterval(function(){

    for (var a=0; a < tbody.rows.length; a++) {
      //console.log(tbody.rows[a]);
      for (var b=0; b < tbody.rows[a].cells.length; b++) {
        //console.log(tbody.rows[a].cells[b]);

        var cell = tbody.rows[a].cells[b];

        x = cell.cellIndex;
        y = cell.parentNode.rowIndex;
        // logging coords
        //console.log('X: ' + x + '; Y: ' + y);
        /*console.log('A: ' + a + '; B: ' + b);*/

        // I call neighbours top, right, bottom and left.

        /* TOP */
        var top = (y <= 0) ? 
        null :
        tbody.rows[y-1].cells[x];
        /*
        if (top !== null) { 
          top.style.backgroundColor = 'orange'; 
        }
        */

        /* RIGHT */
        var right = (x >= 9) ?
        null :
        tbody.rows[y].cells[x+1];
        /*
        if (right !== null) {
          right.style.backgroundColor = 'yellow';
        }
        */

        /* BOTTOM */
        var bottom = (y >= 9) ?
        null :
        tbody.rows[y+1].cells[x];
        /*
        if (bottom !== null) {
          bottom.style.backgroundColor = 'green';
        }
        */

        /* LEFT */
        var left = (x <= 0) ?
        null :
        tbody.rows[y].cells[x-1];
        /* 
        if (left !== null) {
          left.style.backgroundColor = 'blue';
        }
        */

        //console.log(a);
        //var top = (a == 0 || b == 0) ? null : tbody.rows[a].cells[b-1];
        //top.style.backgroundColor = '#ff0000';

        /* NEIGHBOURS COUNT */
        var neighbours = 0;

        if (top !== null && top.style.backgroundColor == ALIVE) {
          neighbours++;
        }

        if (right !== null && right.style.backgroundColor == ALIVE) {
          neighbours++;
        }

        if (bottom !== null && bottom.style.backgroundColor == ALIVE) {
          neighbours++;
        }

        if (left !== null && left.style.backgroundColor == ALIVE) {
          neighbours++;
        }

        /* RULES BEGIN */
        if (cell.style.backgroundColor == ALIVE) {

          if (neighbours < 2) {

            cell.className = 'dead';
          }

          if (neighbours == 2 || neighbours == 3) {

            cell.className = 'alive';
          }

          if (neighbours > 3) {

            cell.className = 'dead';
          }

        } else { // cell is dead
          if (neighbours == 3) {

            cell.className = 'alive';
          }
        }
        /* RULES END */
      }
    }


    /* RENDERING THE NEXT GENERATION */
//    if (a >= 9 && b >= 9) {
      for (var c=0; c < tbody.rows.length; c++) {
        //console.log(tbody.rows[c]);
        for (var d=0; d < tbody.rows[c].cells.length; d++) {
          console.log(tbody.rows[c].cells[d]);
          var nextCell = tbody.rows[c].cells[d];
          if (nextCell.className == 'alive') {
            nextCell.style.backgroundColor = ALIVE;
          } else {
            nextCell.style.backgroundColor = DEAD;
          }
          nextCell.removeAttribute('class');
        }
      }
//   }


  }, 1000);

}, false);
