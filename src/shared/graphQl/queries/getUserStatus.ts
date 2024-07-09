
import Cookies from "js-cookie";

const getUserStatus = async (email: string) => {


    const token = Cookies.get('conventenToken');

    const res = fetch('http://localhost:25000/', {
        method: 'POST',
        headers: {
            "authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `query Users($where: UserWhere) {
                users(where: $where) {
                  status
                  user_type
                }
              }`,
              variables: {
                where: {
                    email: email
                  },
              },
        })
    })

    const {data} = await res.then(res => res.json())
    return data?.users
}


export default getUserStatus