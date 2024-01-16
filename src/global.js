const global = {
    // graphics context
    canvas: null,
    ctx: null,
    
    // relate pixels to virtual units
    canvasOffsetX: 0,
    canvasOffsetY: 0,
    canvasScale: 0,

    // mouse
    canvasMousePos: v(0,0),     //pixels
    mousePos: v(0,0),           //internal units

    // 
    bgColor: 'black',
    fgColor: 'rgba(255,255,255,1)',
    
    // total time elapsed in milliseconds
    t: 0,
    
    
    // growth animation delay (ms)
    growthDelay: 5,
    maxGrowthIterations: 200000,
    
    //
    startShrinkFactor: .75,
    minShrinkFactor: .1,
    shrinkFactor: .8,
    dShrinkFactor: 2e-4,
    
    startSpawnFactor: -.001,
    maxSpawnFactor: 1,
    spawnFactor: .01,
    dSpawnFactor: 3e-5,
    
    //
    segLen: .002,
    chunkWidth: .004,
    segMargin: .002,
    
    //
    segsToDraw: null,
    iterationsDrawn: 0,
    autoResetCountdown: 0,
    autoResetDelay: 30000,
    
    // chunk grid
    // initialized in setup.js
    chunksPerRow : null,
    chunkIdMul : null,
    nChunks : null,
    filledChunks : null,

    
    //debug
    //debugPoint: v(0,0),
}