import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { useMutation, useQuery } from "graphql-hooks";
import { useGqlClient } from "@/hooks/UseGqlClient";
import HandleFileUpload from "@/shared/HandleFileUpload";
import Loading from "@/app/loading";
import PageTextEditor from "@/components/PageTextEditor";

interface Props {
  setOpenUpdateModal: any;
  openUpdateModal: any;
  id: string;
  category: any;
  selectedCategory: any;
  setSelectedCategory: any;
  updateEvent: any;
}

const FIND_EVENT = `
query Events($where: EventWhere, $options: EventOptions) {
    events(where: $where, options: $options) {
      id
      name
      slug
      description
      location
      registrationUrl
      image
      video
      endAt
      startAt
    }
  }
`;

const UpdateModal: React.FC<Props> = ({
  setOpenUpdateModal,
  openUpdateModal,
  id,
  category,
  selectedCategory,
  setSelectedCategory,
  updateEvent,
}) => {
  const [editorState, setEditorState] = useState("");
  const [input, setInput] = useState({
    name: "",
    startAt: "",
    endAt: "",
    image: "",
    video: "",
    location: "",
    regUrl: "",
    fetch: false,
  });

  // hooks
  const client = useGqlClient();
  const { uploadFile } = HandleFileUpload();

  function closeModal() {
    setOpenUpdateModal(false);
  }

  const {
    loading: eventLoading,
    error,
    data,
    refetch,
  } = useQuery(FIND_EVENT, {
    client,
    variables: {
      where: {
        id_CONTAINS: id,
      },
    },
  });

  const convertToIsoDate = (date: string) => {
    const dateObject = new Date(date);
    return dateObject.toISOString();
  };

  const convertToStandardDate = (date: string) => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const startAt = convertToIsoDate(e.target.startAt.value);
    const endAt = convertToIsoDate(e.target.endAt.value);
    const description = JSON.stringify(editorState);
    const image = e.target.image.files[0];
    const video = e.target.video.files[0];
    const location = e.target.location.value;
    const regUrl = e.target.regUrl.value;
    
    const uploadedImageLink = image ? await uploadFile(image, `events-${uuidv4()}`, "event_images") : data.events[0].image;
    const uploadedVideoLink = video ? await uploadFile(video, `events-${uuidv4()}`, "event_videos") : data.events[0].video;
    
    const input = {
      name,
      startAt: new Date(startAt).toISOString(),
      endAt: new Date(endAt).toISOString(),
      description,
      location,
      regUrl,
      image: uploadedImageLink as string,
      video: uploadedVideoLink as string,
    };
    updateEvent(input, id);
  };

  useEffect(() => {
    if (data) {
      const event = data.events[0];
      if (event) {
        setInput({
          name: event?.name,
          startAt: event?.startAt,
          endAt: event?.endAt,
          location: event?.location,
          image: event?.image,
          video: event?.video,
          regUrl: event?.registrationUrl,
          fetch: false,
        });

        try {
          setEditorState(JSON.parse(event?.description));
        } catch (error) {
          console.error("Failed to parse description JSON:", error);
          setEditorState(event?.description || "");
        }
      }
    }
  }, [data]);

  if (eventLoading) return <Loading />;

  return (
    <Transition appear show={openUpdateModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[90000000000000]"
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-[750px] py-12 flex items-center justify-center flex-col transform overflow-hidden rounded-2xl bg-transprent p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-gray-900 mb-7 w-full"
                >
                  Update Event
                </Dialog.Title>
                <form
                  onSubmit={handleSubmit}
                  className="bg-transparent w-full"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full">
                    <div className="p-1">
                      <label className="block text-sm text-gray-500">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={(e) =>
                          setInput({ ...input, name: e.target.value })
                        }
                        placeholder="Name"
                        className="mt-2 w-full block placeholder-gray-400/70 rounded-lg border border-gray-200 bg-transprent px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                      />
                    </div>

                    <div className="p-1">
                      <label
                        htmlFor="startAt"
                        className="block text-sm text-gray-500"
                      >
                        Start at
                      </label>
                      <input
                        type="date"
                        id="startAt"
                        name="startAt"
                        value={convertToStandardDate(input.startAt)}
                        onChange={(e) =>
                          setInput({ ...input, startAt: e.target.value })
                        }
                        className="mt-2 w-full block placeholder-gray-400/70 rounded-lg border border-gray-200 bg-transprent px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                      />
                    </div>
                    <div className="p-1">
                      <label
                        htmlFor="endAt"
                        className="block text-sm text-gray-500"
                      >
                        End at
                      </label>
                      <input
                        type="date"
                        id="endAt"
                        name="endAt"
                        value={convertToStandardDate(input.endAt)}
                        onChange={(e) =>
                          setInput({ ...input, endAt: e.target.value })
                        }
                        className="mt-2 w-full block placeholder-gray-400/70 rounded-lg border border-gray-200 bg-transprent px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                      />
                    </div>
                    <div className="p-1 col-span-2">
                      <label className="block text-sm text-gray-500">
                        Image
                      </label>
                      <input
                        name="image"
                        type="file"
                        className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-transprent border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full focus:outline-none focus:ring focus:ring-blue-300"
                      />
                    </div>
                    <div className="p-1 col-span-2">
                      <label className="block text-sm text-gray-500">
                        Video
                      </label>
                      <input
                        name="video"
                        type="file"
                        className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-transprent border border-gray-200 rounded-lg file:bg-gray-200
                        file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full focus:outline-none focus:ring focus:ring-blue-300"
                      />
                    </div>
                    <div className="p-1 col-span-2">
                      <label className="block text-sm text-gray-500">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={input.location}
                        onChange={(e) =>
                          setInput({ ...input, location: e.target.value })
                        }
                        placeholder="Location"
                        className="mt-2 w-full block placeholder-gray-400/70 rounded-lg border border-gray-200 bg-transprent px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                      />
                    </div>
                    <div className="p-1 col-span-2">
                      <label className="block text-sm text-gray-500">
                        Registration URL
                      </label>
                      <input
                        type="url"
                        name="regUrl"
                        value={input.regUrl}
                        onChange={(e) =>
                          setInput({ ...input, regUrl: e.target.value })
                        }
                        placeholder="Registration URL"
                        className="mt-2 w-full block placeholder-gray-400/70 rounded-lg border border-gray-200 bg-transprent px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                      />
                    </div>
                  </div>
                  <div className="p-1 col-span-2 mt-4">
                    <label className="block text-sm text-gray-500 mb-2">
                      Description
                    </label>
                    <PageTextEditor
                      editorState={editorState}
                      setEditorState={setEditorState}
                    />
                  </div>
                  <div className="mt-6 flex justify-end space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdateModal;
