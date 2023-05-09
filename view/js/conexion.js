
const conexion = {};

const get = async (tabla) => {
    const response = await fetch(`http://localhost:3000/${tabla}`)
    return response;
}
const post = async (obj, tabla) => {
    const response = await fetch(`http://localhost:3000/${tabla}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    return response;
}

conexion.get = get;
conexion.post = post;

export default conexion;