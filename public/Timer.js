class Timer{
    static #data = [];
    static nowTime = 0;
    static deltaTime = 0;
    static Update(t){
        this.deltaTime = t - this.nowTime;
        this.nowTime = t;
        for(var i in this.#data){
            if(this.#data[i].#state == 1)this.#data[i].#Update(this.deltaTime);
        }
    }


    #function = null;
    #totalDelta = 0;
    #totalTime = 0;
    #delta = 0;
    #time = 0;
    #state = 0;
    constructor(func,delta,time=-1){
        Timer.#data.push(this);
        this.#function = func;
        this.#totalDelta = delta;
        this.#totalTime = time;
    }
    
    #Update(t){
        this.#delta += t;
        this.#time += t;
        if(this.#delta >= this.#totalDelta){
            this.#delta -= this.#totalDelta;
            if(this.#function)this.#function();
        }
        if(this.#totalTime != -1 && this.#time >= this.#totalTime){
            this.#Clear();
        }
    }

    Start(){
        if(this.#state != 1)this.#state = 1;
    }

    Pause(){
        if(this.#state == 1)this.#state = 0;
    }

    #Clear(){
        Timer.#data.splice(Timer.#data.indexOf(this),1);
    }
}