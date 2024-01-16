

function update(dt) {    
    global.t += dt
    
    if( global.shrinkFactor > global.minShrinkFactor ){
        global.shrinkFactor = Math.max(global.minShrinkFactor,global.shrinkFactor-global.dShrinkFactor*dt)
    }
    
    if( global.spawnFactor < global.maxSpawnFactor ){
        global.spawnFactor = Math.min(global.maxSpawnFactor,global.spawnFactor+global.dSpawnFactor*dt)
    }
    
    global.autoResetCountdown -= dt
    if( global.autoResetCountdown < 0 ){
        resetGame()
    }
    
    // debug chunk grid
    //activeChunks = {}
    //addSegment( new Segment( global.mousePos, global.debugPoint ) )
}