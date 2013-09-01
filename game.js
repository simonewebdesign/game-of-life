var DEAD  = '',
    ALIVE = 'rgb(0, 255, 255)'

HTMLElement.prototype.live = function() {
  if (this.nodeName === 'TD') {
    if (this.style.backgroundColor == ALIVE) {
      // cell is already alive
      return false
    }
    this.style.backgroundColor = ALIVE
    return true
  }
}

HTMLElement.prototype.die = function() {
  if (this.nodeName === 'TD') {  
    if (this.style.backgroundColor == DEAD) {
      // cell is already dead
      return false
    }
    this.style.backgroundColor = DEAD
    return true
  }
}

HTMLElement.prototype.isAlive = function() {
  return (this.nodeName === 'TD') && (this.style.backgroundColor == ALIVE)
}


function World () { 

  this.rows = 60
  this.cols = 90
  this.speed = 200 // ms
  this.tbody = null

  this.create = function(){

    this.table = document.createElement('table')
    this.tbody = document.createElement('tbody')
    this.table.appendChild(this.tbody)

    for (var r=0; r < this.rows; r++) {
      this.tbody.appendChild(document.createElement('tr'))

      for (var c=0; c < this.cols; c++) {
        this.tbody.rows[r].appendChild(document.createElement('td'))
          .addEventListener('click', function(ev){
            this.style.backgroundColor == DEAD ? 
            this.style.backgroundColor = ALIVE : 
            this.style.backgroundColor = DEAD
          }, false)
      }
    }

    var milkyWay = document.createElement('div')
    milkyWay.appendChild(this.table)
    document.body.appendChild(milkyWay)
    return true
  }

  this.generate = function(){

    for (var a=0; a < this.tbody.rows.length; a++) {

      for (var b=0; b < this.tbody.rows[a].cells.length; b++) {

        var cell = this.tbody.rows[a].cells[b]

        var x = cell.cellIndex
        var y = cell.parentNode.rowIndex

        var xOffset = this.tbody.rows[0].cells.length-1
        var yOffset = this.tbody.rows.length-1

        /* NEIGHBOURS */

        /* TOP */
        var top = (y <= 0) ? 
        null :
        this.tbody.rows[y-1].cells[x]
        /* RIGHT */
        var right = (x >= xOffset) ?
        null :
        this.tbody.rows[y].cells[x+1]
        /* BOTTOM */
        var bottom = (y >= yOffset) ?
        null :
        this.tbody.rows[y+1].cells[x]      
        /* LEFT */
        var left = (x <= 0) ?
        null :
        this.tbody.rows[y].cells[x-1]
        /* TOP_LEFT */
        var top_left = (y <= 0 || x <= 0) ? 
        null :
        this.tbody.rows[y-1].cells[x-1]
        /* TOP_RIGHT */
        var top_right = (y <= 0 || x >= xOffset) ? 
        null :
        this.tbody.rows[y-1].cells[x+1]
        /* BOTTOM_LEFT */
        var bottom_left = (y >= yOffset || x <= 0) ? 
        null :
        this.tbody.rows[y+1].cells[x-1]
        /* BOTTOM_RIGHT */
        var bottom_right = (y >= yOffset || x >= xOffset) ?
        null :
        this.tbody.rows[y+1].cells[x+1]

        /* NEIGHBOURS COUNT */
        var neighbours = 0

        if ( top != null && top.isAlive() )                   { neighbours++ }
        if ( right != null && right.isAlive() )               { neighbours++ }
        if ( bottom != null && bottom.isAlive() )             { neighbours++ }
        if ( left != null && left.isAlive() )                 { neighbours++ }
        if ( top_left != null && top_left.isAlive() )         { neighbours++ }
        if ( top_right != null && top_right.isAlive() )       { neighbours++ }
        if ( bottom_left != null && bottom_left.isAlive() )   { neighbours++ }
        if ( bottom_right != null && bottom_right.isAlive() ) { neighbours++ }

        /* RULES BEGIN */
        if ( cell.isAlive() ) {

          if (neighbours < 2 || neighbours > 3) {
            cell.className = 'dead'
          } else {
            cell.className = 'alive'
          }
        } else { // cell is dead

          if (neighbours == 3) {
            cell.className = 'alive'
          }
        }
        /* RULES END */
      }
    }
  }

  this.spawn = function(name, x, y) {

    if (x < 0 || y < 0) {
      return false
    }

    if (name == 'glider') {
      var shape = [ [2,1], [3,2], [3,3], [2,3], [1,3] ]
    }

    for (s=0; s < shape.length; s++) {
      var cellIndex = shape[s][0]+y-2
      var rowIndex = shape[s][1]+x-2
      this.tbody.rows[rowIndex].cells[cellIndex].live()
    }
  }

  this.renderNextGeneration = function (){

    for (var c=0; c < this.tbody.rows.length; c++) {

      for (var d=0; d < this.tbody.rows[c].cells.length; d++) {

        var nextCell = this.tbody.rows[c].cells[d]
        if (nextCell.className == 'alive') {
          nextCell.style.backgroundColor = ALIVE
        } else {
          nextCell.style.backgroundColor = DEAD
        }
        nextCell.removeAttribute('class')
      }


    }


  }

} // end of World

var startButton = document.createElement('button');
startButton.id = 'start';
startButton.innerHTML = 'Generate';
document.body.appendChild(startButton);

var stopButton = document.createElement('button');
stopButton.id = 'stop';
stopButton.innerHTML = 'Freeze';
document.body.appendChild(stopButton);


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
var world = new World
world.create()
world.spawn('glider', 3, 3)
world.spawn('glider', 15, 20)
world.spawn('glider', 30, 4)


var intervalId = 0;

startButton.addEventListener('click', function(){

  intervalId = setInterval(function() {

    world.generate()
    world.renderNextGeneration()

  }, world.speed)

}, false)

stopButton.addEventListener('click', function(){
  clearInterval(intervalId)
}, false)
