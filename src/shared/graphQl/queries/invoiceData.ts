
import { ModuleTicketOptions, ModuleTicketWhere } from "@/gql/graphql"
import Cookies from "js-cookie";

const getInvoiceData = async (id: string) => {
  const token = Cookies.get('conventenToken');

  const res = fetch('http://localhost:25000/', {
      method: 'POST',
      headers: {
          "authorization": `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
            query: `query Query($where: InvoiceWhere) {
              invoices(where: $where) {
                id
                createdAt
                priceWithTax
                taxRate
                taxType
                ticket
                totalPrice
                placeOfSupply
                hsn
                sentBy
                status
                type
                subject
                expiryDate
                hasPurchase {
                  id
                  itemName
                  quantity
                  price
                }
                hasClient {
                  id
                  userIs {
                    companyName
                    companyEmail
                     gstNumber
                    hasPrimaryaddress {
                      street
                      state
                      city
                    }
                  }
                }
                hasTermspage {
                  id
                  content
                }
                vendorCreated {
                  userIs {
                    companyName
                    companyEmail
                    email
                    gstNumber
                    hasPrimaryaddress {
                      street
                      city
                      state
                      Country
                    }
                  }
                }
              }
            }
            `,
            variables: {
                    where: {
                        id: id
                    }
            },

        })
    })

    const { data } = await res.then(res => res.json())


    return data?.invoices[0]

}


export default getInvoiceData