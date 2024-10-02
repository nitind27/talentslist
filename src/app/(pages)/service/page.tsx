import { getServicebyID, getServices } from "@/api/services/services";
import { IServiceID, IServiceIdData } from "@/api/services/types";
import { EditServices } from "@/components/Edit-Services/Edit-Services";
import Link from "next/link";
import React from "react";

const page = async ({ searchParams }: { searchParams: { id: string } }) => {
  console.log("page function started with searchParams:", searchParams);
  let initialValues: IServiceIdData = {
    title: "",
    type: "",
    parent_skills_id: "",
    child_skills_ids: [],
    duration: "",
    offering: {
      key: "",
    },
    require: {
      key: "",
    },
    price: 0,
    advanced_payment: "",
    promote: 1,
    discount: 0,
    discount_from: "" || null,
    discount_to: "" || null,
  };
  if (searchParams.id) {
    console.log("dsfvdfv", searchParams.id);
    const response = await getServicebyID(Number(searchParams?.id));
    if (!response.error && response.data.data) {
      const serviceData = response.data.data[0];
      initialValues = {
        title: serviceData.title,
        type: serviceData.type,
        parent_skills_id: serviceData.parent_skills_id,
        child_skills_ids: serviceData.child_skills_ids,
        duration: serviceData.duration,
        offering: serviceData.offering,
        require: serviceData.require,
        price: serviceData.price,
        advanced_payment: serviceData.advanced_payment,
        promote: serviceData.promote,
        discount: serviceData.discount,
        discount_from: serviceData.discount_from,
        discount_to: serviceData.discount_to,
      };
    }
  }

  return (
    <div>
      <div className="app-toolbar py-lg-6 py-3">
        <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
          <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">
            Services
          </h1>
          <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
            <li className="breadcrumb-item text-muted">
              <Link href="dashboard" className="text-muted text-hover-primary">
                Dashboard
              </Link>
            </li>
            <li className="breadcrumb-item text-muted">-</li>
            <Link
              href="/services"
              className="breadcrumb-item text-muted text-hover-primary"
            >
              Services
            </Link>
          </ul>
        </div>
      </div>
      <EditServices
        initialValues={initialValues}
        searchParams={{ id: searchParams.id }}
      />
    </div>
  );
};

export default page;
