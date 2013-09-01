function World(){ 

  this.rows = 48
  this.cols = 64
  this.speed = 224 // ms
  this.tbody = null
  this.generationCount = 0
  this.populationCount = 0

  this.create = function(){

    this.table = document.createElement('table')
    this.tbody = document.createElement('tbody')
    this.table.appendChild(this.tbody)

    /* HOLDING FEATURE */
    // on mousedown, holding = true
    // on mouseup and on mouseleave, holding = false
    var holding = false,
        timeoutId = 0

    this.table.addEventListener('mousedown', function(){

      timeoutId = setTimeout(function() {
        holding = true
      }, 10)

    }, false)

    function release() {
      clearTimeout(timeoutId)
      holding = false
    }
    this.table.addEventListener('mouseup', function(){
      release()
    })

    this.table.addEventListener('mouseleave', function(){
      release()
    })

    for (var r=0; r < this.rows; r++) {
      this.tbody.appendChild(document.createElement('tr'))

      for (var c=0; c < this.cols; c++) {

        var td = this.tbody.rows[r].appendChild(document.createElement('td'))

          td.addEventListener('mouseover', function(ev){
            if (holding) {
              this.toggleColor()
            }
          }, false)

          td.addEventListener('click', function(ev){
            this.toggleColor()
          }, false)
      }
    }
    /* END HOLDING FEATURE */

    var milkyWay = document.createElement('div')
    milkyWay.appendChild(this.table)
    document.body.appendChild(milkyWay)
  }

  this.generate = function(){

    // reset population counter for this generation
    this.populationCount = 0

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
        var neighboursCount = 0

        if ( top != null && top.isAlive() )                   { neighboursCount++ }
        if ( right != null && right.isAlive() )               { neighboursCount++ }
        if ( bottom != null && bottom.isAlive() )             { neighboursCount++ }
        if ( left != null && left.isAlive() )                 { neighboursCount++ }
        if ( top_left != null && top_left.isAlive() )         { neighboursCount++ }
        if ( top_right != null && top_right.isAlive() )       { neighboursCount++ }
        if ( bottom_left != null && bottom_left.isAlive() )   { neighboursCount++ }
        if ( bottom_right != null && bottom_right.isAlive() ) { neighboursCount++ }

        this.applyRulesOn(cell, neighboursCount)

        // log population for this generation
        if (cell.isAlive()) {
          this.populationCount++
        }

      }
    }
  }

  this.applyRulesOn = function(cell, neighboursCount){
    /* RULES BEGIN */
    if (cell.isAlive()) {

      if (neighboursCount < 2 || neighboursCount > 3) {
        cell.className = 'dead'
      } else {
        cell.className = 'alive'
      }
    } else { // cell is dead

      if (neighboursCount == 3) {
        cell.className = 'alive'
      }
    }
    /* RULES END */    
  }

  this.spawn = function(name, x, y){

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

  this.renderNextGeneration = function(){

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

    this.generationCount++
  }

} // end of World
