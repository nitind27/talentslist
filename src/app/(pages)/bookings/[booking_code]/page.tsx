
import Link from "next/link";

const page = async ({ params }: { params: { booking_code: string }, searchParams: {} }) => {
    return (
        
            <div className="app-toolbar py-3 py-lg-6 ">
                <div className="d-flex flex-stack">
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">
                            Booking
                        </h1>
                        <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                            <li className="breadcrumb-item text-muted">
                                <Link href="dashboard" className="text-muted text-hover-primary">
                                    Dashboard
                                </Link>
                            </li>
                            <li className="breadcrumb-item text-muted">-</li>
                            <li className="breadcrumb-item text-muted">
                                <Link href="/bookings" className="text-muted text-hover-primary">
                                    Booking
                                </Link></li>
                            <li className="breadcrumb-item text-muted">-</li>
                            <li className="breadcrumb-item text-muted">View</li>
                        </ul>
                    </div>
                </div>
            </div>
    );
};

export default page;
