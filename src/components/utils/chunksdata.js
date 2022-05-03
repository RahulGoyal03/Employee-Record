




function dataChunks(page,start,limit){
    
    let data = localStorage.getItem("employees")
    
    if(data){
        console.log("page",page)
        console.log("Chunks ka data",JSON.parse(data).slice(start,limit))
       return JSON.parse(data).slice(start,limit)
    }else{
        return []
    }
     
}
 
export {dataChunks}