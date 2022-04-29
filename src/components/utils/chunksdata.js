function dataChunks(){
    let data = localStorage.getItem("employees")
    return JSON.parse(data)
}
 
export {dataChunks}