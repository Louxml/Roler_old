class Color{
    constructor(r=255,g=255,b=255,a=1){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    toString(){
        return "#"+(0+this.r.toString(16)).slice(-2)+(0+this.g.toString(16)).slice(-2)+(0+this.b.toString(16)).slice(-2)+(0+(this.a*255|0).toString(16)).slice(-2);
    }
}
Color.ToString = function(color){
    if(color[0]=='#')return color+"ff";
    let data = color.match(/-?([0-9]\d*(\.\d*)*|0\.[0-9]\d*)/g);
    return new Color(Number(data[0]),Number(data[1]),Number(data[2]),Number(data[3])).toString();
}