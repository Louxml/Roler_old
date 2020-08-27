let Loader = new class Loader{
    constructor(){
        this.data = {};
        this.current = 0;
        this.total = 0;
    }

    Image(name,url){
        let image = new Image();
        image.onload = function(e){
            this.data[name] = {
                data:e.path[0],
                state:1
            };
            this.current++;
            this.Check();
        }.bind(this);
        image.onerror = function(e){
            this.data[name] = {
                data:e.path[0],
                state:0
            }
            this.current++;
            this.Check();
        }
        this.total++;
        image.src = url;
        return image;
    }
    
    Check(){
        this.OnProgress()
        if(this.current == this.total){
            this.Complete();
        }
    }
    OnProgress(){

    }
    Complete(){

    }
    
    GetAsset(name){
        if(this.data[name]){
            return this.data[name].data;
        }else{
            //警告信息
        }
    }
    
}