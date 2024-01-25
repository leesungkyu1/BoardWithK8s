const asyncRequestBase = async(method, url, body) => {
    const decodeUrl = decodeURI(url);

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