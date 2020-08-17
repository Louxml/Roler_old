let Time = {
    nowTime:0,
    deltaTime:0,
    Update(t){
        this.deltaTime = t - this.nowTime;
        this.nowTime = t;
    }
}