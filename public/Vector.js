class Vector{

    static Distance(x,y){
        return Math.hypot(x,y);
    }
    static Add(vector1,vector2){
        return Vector(vector1.x+vector2.x,vector1.y+vector2.y);
    }

    constructor(x=0,y=0){
        this.x = x;
        this.y = y;
    }
    Distance(){
        return Math.hypot(this.x,this.y);
    }
}