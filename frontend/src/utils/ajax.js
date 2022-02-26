let postRequest_v2 = (url, data, callback) => {
    let formData = new FormData();
    for (let p in data){
        if(data.hasOwnProperty(p))
            formData.append(p, data[p]);
    }

    let opts = {
        method: "POST",
        body: formData,
    };

    fetch(url,opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

let postRequest=(url,json,callback)=>
{
    console.log("post:"+json);
    let opts={
        method:"POST",
        body:JSON.stringify(json),
        headers:{
            'Content-Type': 'application/json'
        },
    };

    fetch(url,opts)
        .then((response) => {
            console.log(url);
            return response.json()
        })
        .then((data) => {
            //console.lg("eeeee  " + data);
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export { postRequest, postRequest_v2 };