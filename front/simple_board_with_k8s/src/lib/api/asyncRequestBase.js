const asyncRequestBase = async(method, url, body) => {
    const baseUrl = 'localhost:8080/';
    const decodeUrl = decodeURI(baseUrl + url);

    let response = await fetch(decodeUrl, {
        method: method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body),
    });

    response = await response.json();
    
    return response;
};

export default asyncRequestBase;