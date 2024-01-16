

// Initialize the game
function init() {
    var cvs = document.getElementById("gameCanvas");
    cvs.addEventListener("mousemove", mouseMove);
    cvs.addEventListener("click", mouseClick);
    global.canvas = cvs
    global.ctx = cvs.getContext("2d");
    
    resetRand()
    global.chunksPerRow = Math.floor(1/global.chunkWidth)
    global.nChunks = Math.floor(Math.pow(global.chunksPerRow,2))
    global.filledChunks = new Array(global.nChunks);
    //var filledChunks = new Set()
    
    resetGame()
    requestAnimationFrame(gameLoop);
}


function resetGame(){
    resetRand(hard=true)
    global.autoResetCountdown = global.autoResetDelay
    global.t = 0
    global.iterationsDrawn = 0
    global.segsToDraw = []
    global.filledChunks.fill(false)      
    fitToContainer()
    placeStartingSegs()
}

// clear any axisting line segments
// place line segments around the outer edge
// pointing inwards
function placeStartingSegs() {
    
    let loop = new Loop(v(.5,.5),.1)
    
    loop.maxrad = loop.rad // prevent initial loop growth
    
    let mn = 200
    for( let i = 0 ; i < mn ; i++ )
        loop.drawingPoints.push((i*.381966)%1)
    
    loop.cids = tryAddLoop(loop.c,loop.rad,[],true)
    
    global.segsToDraw = [
        loop,
    ]
    
    global.shrinkFactor = global.startShrinkFactor
    global.spawnFactor = global.startSpawnFactor
}

function fitToContainer(){
    
    var cvs = global.canvas
  cvs.style.width='100%';
  cvs.style.height='100%';  
  cvs.width  = cvs.offsetWidth;
  cvs.height = cvs.offsetHeight;
    
    var padding = 10; // (extra zoom IN) thickness of pixels CUT OFF around edges
    var dimension = Math.max(cvs.width, cvs.height) + padding*2;
    global.canvasScale = dimension;
    global.canvasOffsetX = (cvs.width - dimension) / 2;
    global.canvasOffsetY = (cvs.height - dimension) / 2;
    
    global.ctx.setTransform(global.canvasScale, 0, 0, 
        global.canvasScale, global.canvasOffsetX, global.canvasOffsetY);
    global.ctx.fillStyle = global.bgColor
    global.ctx.fillRect( 0, 0, cvs.width, cvs.height )
}



// Main game loop
let secondsPassed;
let oldTimeStamp;
let fps;

function gameLoop(timeStamp) {
    
    var msPassed = 0;
    if (oldTimeStamp) {
      msPassed = timeStamp - oldTimeStamp;
    }
    var secondsPassed = msPassed / 1000;
    oldTimeStamp = timeStamp;
    var fps = Math.round(1 / secondsPassed);


    msPassed = Math.min(msPassed,50)

    update(msPassed);
    draw(fps);

    requestAnimationFrame(gameLoop);
}


// Initialize the game
init();

