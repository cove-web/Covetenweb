
'use client';


import AddProductTabs from './AddProductTabs';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation, useQuery } from 'graphql-hooks';
import Loading from '@/app/loading';
import Error from '@/components/Error';
import { toast } from 'react-hot-toast';


export interface addProductVariables {
    title: string,
    shortDescription: string,
    features: string,
    others: string,
    image: string,
    createdAt?: string
    price: number
    category: string
    file?: string,
    video?: string,
    sideImage?: string,
}



const ADD_NEW_PRODUCT = `
mutation Mutation($input: [ProductCreateInput!]!) {
    createProducts(input: $input) {
      info {
        nodesCreated
      }
    }
  }
`

const GET_ALL_PRODUCTS = `
query Products($options: ProductOptions) {
    products(options: $options) {
      id
      title
      shortDescription
      others
      features
      image
      sideImage
      createdAt
      price
      isPopular
      isSpecial
    }
  }

`

const ADD_TO_HOMEPAGE = `
mutation UpdateProducts($update: ProductUpdateInput, $where: ProductWhere) {
    updateProducts(update: $update, where: $where) {
      products {
        id
      }
    }
  }
`

const DELETE_PRODUCT = `

mutation DeleteProducts($where: ProductWhere) {
    deleteProducts(where: $where) {
      nodesDeleted
    }
  }


`

const Main = () => {
    // STATES

    // HOOKS
    const client = useGqlClient()

    // QUERY
    const { data: productData, loading, error, refetch } = useQuery(GET_ALL_PRODUCTS, {
        client,
        variables: {
            "options": {
                "sort": [
                    {
                        "isPopular": "DESC",
                    }
                ]
            }
        }
    })

    // MUTATION
    const [addNewProductFn, addNewProductState] = useMutation(ADD_NEW_PRODUCT, { client })
    const [deleteProductFn, deleteProductState] = useMutation(DELETE_PRODUCT, { client, })
    const [addToHomeFn, addToHomeState] = useMutation(ADD_TO_HOMEPAGE, { client, })



    // initialize the query and mutations

    const addNewProduct = async (input: addProductVariables) => {

        const { data } = await addNewProductFn({
            variables: {
                "input": [
                    {
                        "title": input.title.toLowerCase(),
                        "shortDescription": input.shortDescription,
                        "features": input.features,
                        "others": input.others,
                        "image": input.image,
                        sideImage: input.sideImage,
                        "price": input.price,
                        video: input.video,
                        file: input.file,
                        createdAt: new Date().toISOString(),
                        "categoryHas": {
                            "connect": {
                                "where": {
                                    "node": {
                                        "id": input.category
                                    }
                                }
                            }
                        },
                    }
                ]
            }
        })

        if (data.createProducts.info.nodesCreated) {
            toast.success('Product added successfully')
            refetch()
        }
    }



    const addToHome = async (id: string, status: boolean, type: string) => {
        const { data } = await addToHomeFn({
            variables: {
                where: {
                    id: id
                },
                "update": {
                    "isPopular": type === 'popular' ? status : false,
                    "isSpecial": type === 'spacial' ? status : false
                }
            }
        })

        if (data.updateProducts.products[0].id) {
            toast.success("Updated")
            refetch()
        }
    }


    const deleteProduct = async (id: string) => {
        const { data } = await deleteProductFn({
            variables: {
                where: {
                    id
                }
            }
        })

        if (data.deleteProducts.nodesDeleted) {
            toast.error('Product deleted successfully')
            refetch()
        }
    }




    if (loading || addNewProductState.loading || deleteProductState.loading || addToHomeState.loading) return <Loading />
    // if (error || addNewProductState.error) return <Error />



    return (
        <>
            <AddProductTabs addToHome={addToHome} productData={productData?.products} addNewProductFn={addNewProduct} deleteProduct={deleteProduct} />
        </>
    );
};

export default Main;