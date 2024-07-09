import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Product } from '@/gql/graphql';

interface IProductModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  data: Product | null;
  updateProduct: (id: string, isApproved: boolean) => void; // Updated function signature
}

const ProductModal = ({ setIsModalOpen, isModalOpen, data, updateProduct }: IProductModalProps) => {
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    if (data && data.id) {
      updateProduct(data.id, true); // Passing true to set isApproved to true
      closeModal();
    }
  };

  return (
    <div>
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="fixed z-[120000000000] inset-0 overflow-y-auto" onClose={closeModal}>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
            </Transition.Child>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <p className="focus:outline-none pt-4 pb-8 text-base text-center sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                  Product Details
                </p>
                <div>
                  <div className="mb-5">
                    <label htmlFor="title" className="block text-gray-700 text-sm mb-1">
                      Product Name
                    </label>
                    <input
                      placeholder="Product name"
                      type="text"
                      value={data?.title || 'N/A'}
                      className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                      readOnly
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="title" className="block text-gray-700 text-sm mb-1">
                      User Name
                    </label>
                    <input
                      placeholder="Product name"
                      type="text"
                      value={data?.title || 'N/A'}
                      className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                      readOnly
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="title" className="block text-gray-700 text-sm mb-1">
                      Product Features
                    </label>
                    <input
                      placeholder="Product name"
                      type="text"
                      value={data?.features || 'N/A'}
                      className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                      readOnly
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="title" className="block text-gray-700 text-sm mb-1">
                      Company name
                    </label>
                    <input
                      placeholder="Product name"
                      type="text"
                      value={data?.features || 'N/A'}
                      className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                      readOnly
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="price" className="block text-gray-700 text-sm mb-1">
                      Price
                    </label>
                    <input
                      placeholder="Price"
                      type="text"
                      value={data?.price || 'N/A'}
                      className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                      readOnly
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="price" className="block text-gray-700 text-sm mb-1">
                      Image
                    </label>
                    {data?.image ? (
                      <img
                        src={data.image}
                        alt="Image"
                        className="mt-1 border border-gray-200 rounded-md w-full"
                      />
                    ) : (
                      <p className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full">
                        N/A
                      </p>
                    )}
                  </div>
                  <div className="mb-5">
                    <label htmlFor="createdAt" className="block text-gray-700 text-sm mb-1">
                      Added Date
                    </label>
                    <input
                      placeholder="Added date"
                      type="text"
                      value={data?.createdAt?.slice(0, 10) || 'N/A'}
                      className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                      readOnly
                    />
                  </div>
                  <div className="mt-10 flex justify-between">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600"
                      onClick={handleConfirm}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default ProductModal;
