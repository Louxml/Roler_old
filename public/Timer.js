class Timer{
    static data = [];
    static nowTime = 0;
    static deltaTime = 0;
    static Update(t){
        this.deltaTime = t - this.nowTime;
        this.nowTime = t;
        for(var i in this.data){
            this.data[i].#Update(this.deltaTime);
        }
    }

    constructor(func,delta,time=-1){
        Timer.data.push(this);
        this.function = func;
        this.totalDelta = delta;
        this.totalTime = time;
        this.delta = 0;
        this.time = 0;
    }
    #Update(t){
        this.delta += t;
        this.time += t;
        if(this.delta >= this.totalDelta){
            this.delta -= this.totalDelta;
            this.function();
        }
        if(this.totalTime != -1 && this.time >= this.totalTime){
            this.Clear();
        }
    }
    Clear(){
        Timer.data.splice(Timer.data.indexOf(this),1);
    }
}