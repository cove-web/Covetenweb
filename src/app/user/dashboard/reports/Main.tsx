"use client";
import { useGqlClient } from "@/hooks/UseGqlClient";
import { useMutation, useQuery } from "graphql-hooks";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";

import AuthConfig from "@/firebase/oauth.config";
import DocCards from "./DocCards";
import Loading from "@/app/loading";
import ComplainModal from "./ComplainModal";
import { toast } from "react-hot-toast";
import createLog from "@/shared/graphQl/mutations/createLog";

const GET_MODULE_TICKETS = `
query ModuleTickets($where: ModuleTicketWhere) {
  moduleTickets(where: $where) {
    id
    reports
    ticket
    isViewedByClient
    forModule {
      title
    }
    vendorHas {
      userIs {
        id
      }
    }
  }
}
`;
const UPDATE_MODULE = `
mutation UpdateModuleTickets($where: ModuleTicketWhere, $update: ModuleTicketUpdateInput) {
  updateModuleTickets(where: $where, update: $update) {
    moduleTickets {
      id
    }
  }
}
`;

const SEND_NOTIFICATION = `
  mutation CreateNotifications($input: [NotificationCreateInput!]!) {
      createNotifications(input: $input) {
        info {
          nodesCreated
        }
      }
    }`;

const Main = () => {
  //states
  const [currentModule, setCurrentModule] = React.useState("");
  const [messages, setMessages] = React.useState<any>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [vendorId, setVendorId] = React.useState("");
  //hooks
  const client = useGqlClient();
  const { user } = AuthConfig();

  // fetching data
  const { data, loading, error, refetch } = useQuery(GET_MODULE_TICKETS, {
    client,
    variables: {
      where: {
        clientHas: {
          userIs: {
            email: user?.email || "no email",
          },
        },
        status_IN: ["DRAFT", "COMPLETED"],
        isApprovedByAdmin: true,
      },
    },
  });

  // ADDING COMPLAIN
  const [addComplainFn, state, resetFn] = useMutation(UPDATE_MODULE, {
    client,
  });
  const [sendNotificationFn, notificationState] = useMutation(
    SEND_NOTIFICATION,
    { client }
  );

  // initializing add complain function
  const addComplain = async (complain: string) => {
    const { data } = await addComplainFn({
      variables: {
        where: {
          id: currentModule,
        },
        update: {
          status: "COMPLAINED",
          complain: complain,
        },
      },
    });

    if (data.updateModuleTickets.moduleTickets[0].id) {
      setIsOpen(false);
      resetFn();

      refetch();
      sendNotification("commented");
      toast.success("Complain Added Successfully");
      createLog(
        `Module Report`,
        `Report added to ${data?.updateModuleTickets?.moduleTickets[0]?.forModule?.title} module`
      );
    }
  };
  const confirmComplete = async () => {
    const { data } = await addComplainFn({
      variables: {
        where: {
          id: currentModule,
        },
        update: {
          status: "COMPLETED",
        },
      },
    });

    if (data.updateModuleTickets.moduleTickets[0].id) {
      setIsOpen(false);
      resetFn();
      refetch();

      toast.success(" Project Completed");
      sendNotification("confirmed");
      createLog(
        `Module Report`,
        `Report confirmed ${data?.updateModuleTickets?.moduleTickets[0]?.forModule?.title} module`
      );
    }
  };

  useEffect(() => {}, [data?.moduleTickets]);

  const sendNotification = async (type: string) => {
    const { data: adminData } = await sendNotificationFn({
      variables: {
        input: [
          {
            title: `A user has ${type} a report`,
            description: `A user has created a new project with ticket ${type}`,
            createdAt: new Date().toISOString(),
            notificationFor: "VENDOR",
            vendorHas: {
              connect: {
                where: {
                  node: {
                    userIs: {
                      id: vendorId,
                    },
                  },
                },
              },
            },
          },
        ],
      },
    });
  };

  if (loading || state.loading) return <Loading />;

  return (
    <div className="flex flex-row h-full  lg:max-h-[85vh] w-full overflow-x-hidden">
      <Sidebar data={data?.moduleTickets} setCurrentModule={setCurrentModule} />
      <div className="w-full">
        <DocCards
          currentModule={currentModule}
          setIsOpen={setIsOpen}
          confirmComplete={confirmComplete}
          setVendorId={setVendorId}
        />
      </div>
      <ComplainModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addComplain={addComplain}
      />
    </div>
  );
};

export default Main;
