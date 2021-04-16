export default function api(action, data) {
    return fetch('https://api.spacexdata.com/v3/' + action, {
        // method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(rsp => {
        if(rsp.ok)
        return rsp.json()
    })
}