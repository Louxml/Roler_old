var KeyCode = {
    // A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,SPACE:32
    65:0,
    66:0,
    67:0,
    68:0,
    69:0,
    70:0,
    71:0,
    72:0,
    73:0,
    74:0,
    75:0,
    76:0,
    77:0,
    78:0,
    79:0,
    80:0,
    81:0,
    82:0,
    83:0,
    84:0,
    85:0,
    86:0,
    87:0,
    88:0,
    89:0,
    90:0
}
var Input = {
    GetKey : (key) => {
        return KeyCode[key] == 1 ||KeyCode[key] == 2?true:false;
    },
    KeyDown : (e) => {},
    KeyUp : (e) => {},
}
window.onkeydown = function(e){
    if(KeyCode[e.keyCode] == 1)KeyCode[e.keyCode] = 2;
    else if(KeyCode[e.keyCode] != 2 )KeyCode[e.keyCode] = 1;
    Input.KeyDown(e.keyCode);
}
window.onkeyup = function(e){
    if(KeyCode[e.keyCode] == 3)KeyCode[e.keyCode] = 0;
    else if(KeyCode[e.keyCode] != 0)KeyCode[e.keyCode] = 3;
    Input.KeyUp(e.keyCode);
}