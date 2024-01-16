class Loop {
    
    
    constructor( c, rad, reverse = false ){
        this.c = c
        this.rad = rad
        this.reverse = reverse
        
        // number of bezier segments
        let n = 12
        this.n = n
        
        
        // randomly generate precise shape
        let amplitude = .1 // radians
        this.noise = []
        for( let i = 0 ; i < n ; i++ ){
            this.noise.push(randRange(-amplitude,amplitude))
        }
        this._buildCurves()
        
        // potential connected loop instances
        this.connectedLoops = Array(n).fill(null)
        
        // drawing points along loop where 0=1
        this.drawingPoints = []
        
        // fraction of complete circle per ms
        this.speed = 2e-4 / this.rad
        if( this.reverse ) this.speed *= -1
    }
    
    
    _buildCurves(){
        let n = this.n
        let c = this.c
        let rad = this.rad
        
        
        //https://stackoverflow.com/a/27863181
        // distance to control points to approx circle
        let cpd = rad*(4/3)*Math.tan(pi/(2*n))
        
        // build groups of 3 colinear control points
        let ts = []
        for( let i = 0 ; i < n ; i++ ){
            let a = i*twopi/n
            let p = c.add(vp(a,rad))
            
            let cpa = a + this.noise[i]
            
            let p0 = p.add(vp(cpa-pio2,cpd))
            let p1 = p.add(vp(cpa+pio2,cpd))
            ts.push([p0.xy(),p.xy(),p1.xy()])
        }
        
        // build bezier curves
        let curves = []
        for( let i = 1 ; i < n ; i++ )
            curves.push(new Bezier([ts[i-1][1], ts[i-1][2], ts[i][0], ts[i][1]]))
        curves.push(new Bezier([ts[n-1][1], ts[n-1][2], ts[0][0], ts[0][1]]))
        this.curves = curves
    }
    
    advance(){
        let n = this.n
        let dps = this.drawingPoints
                
        // advance each drawing point one iteration
        for( let i = 0 ; i < dps.length ; i++ ){
            
            let oldsegindex = Math.floor(dps[i]*n)
            dps[i] = nnmod(dps[i]+this.speed,1)
            let newsegindex = Math.floor(dps[i]*n)
            
            // check if switched segments
            if( oldsegindex != newsegindex ){
                
                // chance to switch to connected loop
                let cl = this.connectedLoops[newsegindex]
                if( cl && (rand()<.7) ){
                    cl.drawingPoints.push((dps[i]+.5-this.speed)%1)
                    dps.splice(i,1)
                    i--
                    continue
                }
                
                // chance to spawn new loop
                else if( (!cl) && (this.rad >= .005) && (rand()<global.spawnFactor) ){
                    if( global.segsToDraw.length < 2000 ){
                        let newr = Math.min( .1, randRange( global.shrinkFactor,.95 ) * this.rad )
                        let newc = this.c.add( vp( dps[i]*twopi, newr+this.rad ) )
                        let cids = tryAddLoop(newc,newr,this.cids)
                        if( cids ) {
                            
                            // spawn new loop
                            let loop = new Loop(newc,newr,!this.reverse)
                            loop.cids = cids
                            loop.drawingPoints = [(dps[i]+.5-this.speed)%1]
                            this.connectedLoops[newsegindex] = loop
                            let nsi = newsegindex+this.n/2
                            if( !this.reverse ) nsi -= 1
                            if( this.reverse ) nsi += 1
                            loop.connectedLoops[(nsi)%this.n] = this
                            
                            // switch this drawing point to new loop
                            global.segsToDraw.push(loop)
                            dps.splice(i,1)
                            i--
                            continue
                        }
                    }
                }
            }
        }
    }
    
    drawBg(g){
        // erase in front
        let dps = this.drawingPoints
        let ts = this.triples
        let n = this.n
        let s = 5e-3
        dps.forEach( realdp => {
            let dp = nnmod(realdp+1.6*this.speed,1)
            
            let i = Math.floor(dp*n)
            let r = (dp*n)%1
            let p = this.curves[i].b_t(r)
            g.moveTo(...p)
            g.arc(...p,s,0,twopi)
        })
    }
    
    drawFg(g){
        // draw
        let dps = this.drawingPoints
        let ts = this.triples
        let n = this.n
        let s = 2e-3
        dps.forEach( dp => {
            let i = Math.floor(dp*n)
            let r = (dp*n)%1
            let p = this.curves[i].b_t(r)
            g.moveTo(...p)
            g.arc(...p,s,0,twopi)
        })
    }
    
}