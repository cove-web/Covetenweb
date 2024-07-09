import { FaFirefox } from "react-icons/fa";

export default function Companies({ clients }: { clients: any[] }) {
    return (
        <div className="py-2 ">
            <div className="max-w-screen-2xl mx-auto px-2 lg:px-12">
                <section className="relative pt-28 pb-36 bg-blueGray-100 overflow-hidden">
                    <img className="absolute top-0 left-0" src="flaro-assets/images/logos/gradient3.svg" alt="" />
                    <div className="relative z-10 container px-4 mx-auto">
                        <p className="mb-14 text-base  text-center font-semibold uppercase tracking-px">Powering next-gen companies</p>
                        <div className="overflow-hidden">
                            <ul className="flex items-center justify-center animate-marquee">
                                {
                                    clients && clients.map((item, idx) =>
                                        <li key={item.id} className="flex-none px-12">
                                            <img src={item?.logo} className="w-32" alt="client image" />
                                        </li>
                                    )
                                }
                                {
                                    clients && clients.map((item, idx) =>
                                        <li key={item.id + '-clone'} className="flex-none px-12">
                                            <img src={item?.logo} className="w-32" alt="client image" />
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
