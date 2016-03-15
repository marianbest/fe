Date.prototype.days=function(to){
  return  Math.abs(Math.floor( to.getTime() / (3600*24*1000)) -  Math.floor( this.getTime() / (3600*24*1000)))
}

Number.prototype.addZero= function(len){
 var s= String(this), c= '0';
 len= len || 2;
 while(s.length < len) s= c + s;
 return s;
}