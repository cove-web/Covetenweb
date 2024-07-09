import Cookies from "js-cookie";


const GetLeads = async (where:any = {}, options: any = {})=> {

  const token = Cookies.get('conventenToken');

  const res = fetch('http://localhost:25000/', {
      method: 'POST',
      headers: {
          "authorization": `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
            query: `query Query($where: LeadsWhere, $options: LeadsOptions) {
              leads(where: $where, options: $options) {
                id
                name
                email
                phone
                createdAt
                company
                isViewed
                leadOwner
                leadSource
                leadStatus
                hasPrimaryaddress {
                  zipCode
                }
              }
            }`,
              variables: {
                where: where,
                options: options
              }
        })
    })

    const {data} = await res.then(res => res.json())
    return data?.leads



}

export default GetLeads