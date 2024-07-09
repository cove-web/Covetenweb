"use client";

import TermsTab from "./TermsTab";
import { useGqlClient } from "@/hooks/UseGqlClient";
import { useMutation, useQuery } from "graphql-hooks";
import Loading from "@/app/loading";
import Error from "@/components/Error";
import { toast } from "react-hot-toast";
import slugify from "slugify";

export interface addTermsVariables {
  title: string;
  content: string;
  forInvoice: boolean;
  docUrl: string;
}

const ADD_NEW = `
mutation CreateTermsPages($input: [TermsPageCreateInput!]!) {
    createTermsPages(input: $input) {
      info {
        nodesCreated
      }
    }
  }
`;

const GET_ALL = `
query TermsPages {
    termsPages {
      id
      title
      content
    }
  }

`;

const DELETE = `

mutation DeleteTermsPages($where: TermsPageWhere) {
    deleteTermsPages(where: $where) {
      nodesDeleted
    }
  }


`;

const Main = () => {
  // STATES

  // HOOKS
  const client = useGqlClient();

  // QUERY
  const {
    data: TermsData,
    loading,
    error,
    refetch,
  } = useQuery(GET_ALL, { client });

  // MUTATION
  const [addNewTermsFn, addNewTermsState] = useMutation(ADD_NEW, { client });
  const [deleteTermsFn, deleteTermsState] = useMutation(DELETE, { client });

  // initialize the query and mutations

  const addNewTerms = async (input: addTermsVariables) => {
    const { data } = await addNewTermsFn({
      variables: {
        input: [
          {
            title: input.title,
            slug: slugify(input.title, {
              replacement: "_",
              remove: / [* +~.()'"!:@]/g,
            }),
            content: input.content,
            downloadUrl: input.docUrl,
            forInvoice: input.forInvoice,
          },
        ],
      },
    });

    if (data.createTermsPages.info.nodesCreated) {
      toast.success("Terms added successfully");
      refetch();
    }
  };

  const deleteTerms = async (id: string) => {
    const { data } = await deleteTermsFn({
      variables: {
        where: {
          id,
        },
      },
    });

    if (data.deleteTermsPages.nodesDeleted) {
      toast.error("Terms deleted successfully");
      refetch();
    }
  };

  if (loading || addNewTermsState.loading || deleteTermsState.loading)
    return <Loading />;
  if (error || addNewTermsState.error) return <Error />;

  return (
    <>
      <TermsTab
        TermsData={TermsData?.termsPages}
        addNewTermsFn={addNewTerms}
        deleteTerms={deleteTerms}
      />
    </>
  );
};

export default Main;
