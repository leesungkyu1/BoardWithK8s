const asyncRequestBase = async (method, url, body) => {
    const baseUrl = 'http://192.168.1.13:8070';
    const decodeUrl = decodeURI(baseUrl + url);
    let response;

    try{
        response = await fetch(decodeUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization : localStorage.getItem("token")
            },
            body: JSON.stringify(body),
        });

        if(!response.ok){
            throw new Error(`${response.status}`);
        }

        response = await response.json();

        return response.data;
    }catch(e){
        return await response.json();
    }
};

export default asyncRequestBase;