
import Cookies from "js-cookie";

const createLog = async (title: string,message: string, ) => {

    const token = Cookies.get('conventenToken');

    const res = fetch('http://localhost:25000/', {
        method: 'POST',
        headers: {
            "authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `mutation CreateLogs($input: [LogCreateInput!]!) {
                createLogs(input: $input) {
                  info {
                    nodesCreated
                  }
                }
              }`,
              variables: {
                "input": [
                    {
                        "message": message,
                        "createdAt": new Date().toISOString(),
                        "title": title
                    }
                  ]
              },
        
        })
    })

    const {data} = await res.then(res => res.json())
    return data?.createLogs?.info?.nodesCreated
}


export default createLog