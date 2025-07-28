//

var evalRPN = function(t) {
    let s=[]
    for(let i=0;i<t.length;i++){
        if(t[i]=="+"||t[i]=="-"||t[i]=="*"||t[i]=="/"){
            let a=s.pop()
            let b=s.pop()
            console.log(a,b)
            let c=eval(`${b} ${t[i]} ${a}`)
            console.log(c)
            s.push(Math.trunc(c))
        }else{
            s.push(t[i])
            console.log(s)
        }

    }
    return Number(s.pop())


};
let tokens = ["2","1","+","3","*"]
console.log(evalRPN(tokens))