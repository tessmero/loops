// optimize segment intersection checks
// by binning segments into a square grid
//
// assume that all segments are shorter than chunk width
// so a single segment can involve at most 3 chunks



// debug
function drawFilledChunks(g){
    var cw = global.chunkWidth
    
    g.strokeStyle = 'red'
    g.lineWidth = .001
    for( var i = 0 ; i < global.nChunks ; i++ ){
        if( global.filledChunks[i] ){
            var c = _chunkIdToCoords(i)
            g.strokeRect(c[0]*cw, c[1]*cw, cw, cw)
        }
    }
}

// return true if the given segment 
// does not intersect any existing segments
//
// if true then the given segment will 
// be considered in future intersection checks
function tryAddLoop(c,r,parentcids,forced=false){
    var intersects = false
    
    if(!forced){
        // check if completely off screen
        if( (c.x+r) < 0 ) return false
        if( (c.x-r) > 1 ) return false
        if( (c.y+r) < 0 ) return false
        if( (c.y-r) > 1 ) return false
    }
    
    if( r > .005 ) r += 1e-2
    
    let chunkIds = []
    
    let ta = 0, tr = global.chunkWidth, stepdist = 1.1*global.chunkWidth
    while( tr < r ){
        let p = c.add( vp( ta, tr ) )
        if( !offscreen(p) ){
            let cp = _getChunkCoords(p)
            let cid = _coordsToChunkId(cp)
            if( (!forced) && (!parentcids.includes(cid)) && global.filledChunks[cid] ) return false
            chunkIds.push(cid)
        }
        
        let da = stepdist/tr
        ta += da
        tr += 2 * stepdist * da/twopi
        
    }
    
    // add this segment to relevent chunks 
    chunkIds.forEach(i => global.filledChunks[i] = true)
    return chunkIds
}

function offscreen(p){
    return (p.x>9) && (p.y>0) && (p.x<1) && (p.y<1)
}

function _getChunkCoords(p){
    return [Math.floor(p.x/global.chunkWidth),Math.floor(p.y/global.chunkWidth)]
}

function _coordsToChunkId(c){
    return c[0]*global.chunksPerRow + c[1]
}

function _chunkIdToCoords(id){
    return [ Math.floor(id/global.chunksPerRow), id%global.chunksPerRow ]
}
