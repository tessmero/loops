

function drawTree(g){

    var n = Math.min( global.maxGrowthIterations,
            Math.floor( global.t / global.growthDelay ) )
            
    for( var i = global.iterationsDrawn ; i < n ; i++ ){
        //global.segsToDraw = global.segsToDraw.filter( s => tryAddSegment(s) )
        
        g.fillStyle = global.bgColor
        g.beginPath()
        global.segsToDraw.forEach( s => { 
            s.advance()
            s.drawBg(g) 
        })
        g.fill()
        
        
        g.fillStyle = global.fgColor
        g.beginPath()
        global.segsToDraw.forEach( s => s.drawFg(g) )
        g.fill()
        
        
        //global.segsToDraw = global.segsToDraw.flatMap(s => tree.grow(s))
    }
    
    global.iterationsDrawn = n
}
    
    
// Render graphics
function draw(fps, t) {
   var ctx = global.ctx
   var canvas = global.canvas
   
    //ctx.clearRect( 0, 0, canvas.width, canvas.height )

    // draw tree
    drawTree(ctx)
    
    //debug
    //drawFilledChunks(ctx)
    
    //y += 30
    //ctx.fillText(`camera: ${cameraX.toFixed(2)}, ${cameraY.toFixed(2)}, ${zoomLevel.toFixed(2)}`, x, y);
    //y += 30
    //ctx.fillText(gameState, x, y);
    //y += 30 
    //ctx.fillText(`canvas pos: ${canvasMouseX}, ${canvasMouseY}`, x, y);
    //y += 30
    //ctx.fillText(`virtual pos: ${virtualMouseX}, ${virtualMouseY}`, x, y);
}