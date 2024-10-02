"use client";
import { FC, useState, useEffect } from "react";
import { KTIcon } from "@/_metronic/helpers";
import Link from "next/link";
import classNames from "classnames";
import { IServices } from "@/api/services/types";
import { getActiveInactive, getDeleteServices } from "@/api/services/services";
import { toast } from "react-toastify";
import Pagination from "../Pagination/Pagination";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import TablePagination from "../Pagination/TablePagination";

interface AddServicesProps {
  servicesData: IServices;
}

const AddServices: FC<AddServicesProps> = ({
  servicesData: initialServicesData,
}) => {
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageIndex: 0,
  });
  const [servicesData, setServicesData] =
    useState<IServices>(initialServicesData);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedSkillId, setSelectedSkillId] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );

  useEffect(() => {
    setServicesData(initialServicesData);
  }, [initialServicesData]);

  const handleStatusClick = (status: string) => {
    setSelectedStatus(status);
  };

  const handleSkillsClick = (skillId: number | null) => {
    setSelectedSkillId(skillId);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedItems = {
      ...checkedItems,
      [index]: !checkedItems[index],
    };
    setCheckedItems(updatedCheckedItems);
  };

  const handleDeleteClick = async () => {
    const checkedIndexes = Object.keys(checkedItems).filter(
      (index: any) => checkedItems[index]
    );
    const servicesToDelete = checkedIndexes.map(
      (index: any) => servicesData.data.talent_packages.data[index].id
    );

    try {
      const deleteResponse = await getDeleteServices({
        services_ids: servicesToDelete,
      });

      if (deleteResponse.data.message) {
        toast.success(deleteResponse.data.message);

        // Remove deleted items from local state
        const updatedPackages = servicesData.data.talent_packages.data.filter(
          (_, index) => !checkedItems[index]
        );

        setServicesData({
          ...servicesData,
          data: {
            ...servicesData.data,
            talent_packages: {
              ...servicesData.data.talent_packages,
              data: updatedPackages,
            },
          },
        });

        setCheckedItems({});
      } else {
        console.error("Failed to delete services:", deleteResponse.error);
        toast.error("Failed to delete services");
      }
    } catch (error) {
      console.error("Error deleting services:", error);
      toast.error("Failed to delete services");
    }
  };

  const handleEnableDisableService = async (id: number, isEnabled: boolean) => {
    try {
      const response = await getActiveInactive(id);
      if (response.status) {
        const message = isEnabled
          ? "Service disabled successfully"
          : "Service enabled successfully";
        toast.success(message);

        // Update local state to reflect the change
        const updatedPackages = servicesData.data.talent_packages.data.map(
          (packageItem) => {
            if (packageItem.id === id) {
              return {
                ...packageItem,
                enabled: isEnabled ? "no" : "yes", // Toggle enabled status
              };
            }
            return packageItem;
          }
        );

        setServicesData({
          ...servicesData,
          data: {
            ...servicesData.data,
            talent_packages: {
              ...servicesData.data.talent_packages,
              data: updatedPackages,
            },
          },
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Failed to toggle service status:", error);
      toast.error("Failed to toggle service status");
    }
  };

  const filteredPackages = servicesData.data.talent_packages.data.filter(
    (packageItem) => {
      if (selectedSkillId) {
        return packageItem.skills.some(
          (skill) => skill.skill.id === selectedSkillId
        );
      }

      if (selectedStatus === "Enabled") {
        return packageItem.enabled === "yes";
      }

      if (selectedStatus === "Disabled") {
        return packageItem.enabled === "no";
      }

      return true;
    }
  );

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, pageIndex: page - 1 }));
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const pageSize = parseInt(event.target.value, 10);
    setPagination({ pageSize, pageIndex: 0 });
  };

  return (
    <>
      <div className="card mb-5 mb-xl-10">
        <div className="card-header">
          <div className="card-title m-0">
            <h4 className="fw-bold m-0 d-flex gap-3 ">
              <KTIcon
                iconName="gear"
                iconType="duotone"
                className="fs-2 text-gray-500"
              />
              Services
            </h4>
          </div>
          <div className="card-toolbar">
            <Link href="/service" className="btn btn-sm fw-bold btn-primary">
              Add service
            </Link>
          </div>
        </div>
        <div className="card-body p-9 pt-5 table-responsive">
          <div className="d-flex flex-wrap">
            <div className="filter_by_status pe-2">
              <h6 className="text-gray-800 fw-bold fs-6">Filter by status</h6>
              <div className="status_for_filter mt-2 row mx-0">
                <Link
                  href="#"
                  className={classNames(
                    "me-2 booking_statuses all rounded mb-5 w-auto text-gray-500",
                    { "btn-bg-secondary text-white": selectedStatus === "All" }
                  )}
                  style={{
                    backgroundColor:
                      selectedStatus === "All" ? "#D3D3D3" : "#F4F4F4",
                    padding: "6px 9px",
                  }}
                  onClick={() => handleStatusClick("All")}
                >
                  <div className="fs-6">All</div>
                </Link>
                <Link
                  href="#"
                  className={classNames(
                    "btn me-2 booking_statuses completed rounded mb-5 w-auto text-gray-500",
                    {
                      "btn-bg-secondary text-white":
                        selectedStatus === "Enabled",
                    }
                  )}
                  style={{
                    backgroundColor:
                      selectedStatus === "Enabled" ? "#D3D3D3" : "#F4F4F4",
                    padding: "6px 9px",
                  }}
                  onClick={() => handleStatusClick("Enabled")}
                >
                  <div className="fs-6">Enabled</div>
                </Link>
                <Link
                  href="#"
                  className={classNames(
                    "btn booking_statuses cancelled rounded mb-5 w-auto text-gray-500",
                    {
                      "btn-bg-secondary text-white":
                        selectedStatus === "Disabled",
                    }
                  )}
                  style={{
                    backgroundColor:
                      selectedStatus === "Disabled" ? "#D3D3D3" : "#F4F4F4",
                    padding: "6px 9px",
                  }}
                  onClick={() => handleStatusClick("Disabled")}
                >
                  <div className="fs-6">Disabled</div>
                </Link>
              </div>
            </div>
            <div className="d-flex border-start border-1">
              <div className="ms-lg-3 ms-md-3">
                <h6 className="text-gray-800 fw-bold fs-6">Filter by skills</h6>
                <div className="status_for_filter mt-2 row mx-0">
                  <Link
                    href="#"
                    className={classNames(
                      "me-2 booking_statuses all rounded mb-5 w-auto text-gray-500",
                      {
                        "btn-bg-secondary text-white": selectedSkillId === null,
                      }
                    )}
                    style={{
                      backgroundColor:
                        selectedSkillId === null ? "#D3D3D3" : "#F4F4F4",
                      padding: "6px 9px",
                    }}
                    onClick={() => handleSkillsClick(null)}
                  >
                    <div className="fs-6">All</div>
                  </Link>
                  {servicesData.data.parent_skill.map((skill) => (
                    <Link
                      key={skill.id}
                      href="#"
                      className={classNames(
                        "btn me-2 booking_statuses completed rounded mb-5 w-auto text-gray-500",
                        {
                          "btn-bg-secondary text-white":
                            selectedSkillId === skill.id,
                        }
                      )}
                      style={{
                        backgroundColor:
                          selectedSkillId === skill.id ? "#D3D3D3" : "#F4F4F4",
                        padding: "6px 9px",
                      }}
                      onClick={() => handleSkillsClick(skill.id)}
                    >
                      <div className="fs-6">{skill.name}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <table
            className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4"
            style={{ width: "100%", textAlign: "center" }}
          >
            <thead>
              <tr className="fw-bold text-muted">
                <th></th>
                <th className="text-start ps-0">Event</th>
                <th className="text-start ps-0">Performance Type</th>
                <th className="text-center">Promotion</th>
                <th className="text-center">Duration</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPackages.length > 0 ? (
                filteredPackages.map((packageItem, index) => (
                  <tr key={index}>
                    <td>
                      <div className="form-check form-check-sm">
                        <input
                          className="form-check-input widget-9-check"
                          type="checkbox"
                          value={index}
                          onChange={() => handleCheckboxChange(index)}
                          checked={checkedItems[index] || false}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="d-flex justify-content-start flex-column text-start">
                          <span
                            className="h-17px"
                            style={{ textAlign: "left" }}
                          >
                            <Link
                              href=""
                              className="text-gray-800 fw-bold text-hover-primary mb-1"
                            >
                              {packageItem.title}
                            </Link>
                          </span>
                          <span className="text-gray-700 fw-semibold d-block fs-7 mt-1">
                            {packageItem.skills
                              .filter((skill) => skill.parent === "Y")
                              .map((skill) => (
                                <span key={skill?.skill?.id}>
                                  {skill?.skill?.name || ""}
                                </span>
                              ))}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-muted fw-semibold text-muted d-block fs-7 text-start">
                        {packageItem.type === "online" ? "Online" : "Onsite"}
                      </span>
                    </td>
                    <td>
                      <span className="fw-bold text-gray-800">
                        <span className="text-muted fw-semibold text-muted">
                          {packageItem.discount !== null ? "Yes" : "No"}
                        </span>
                      </span>
                    </td>
                    <td>
                      <span className="fw-bold text-gray-800">
                        <span className="text-muted fw-semibold text-muted">
                          {packageItem.duration}
                        </span>
                      </span>
                    </td>
                    <td className="text-muted fw-semibold">
                      <div className="form-check form-switch ms-10">
                        <input
                          className="form-check-input cursor-pointer"
                          type="checkbox"
                          checked={packageItem.enabled === "yes"}
                          onChange={() =>
                            handleEnableDisableService(
                              packageItem.id,
                              packageItem.enabled === "yes"
                            )
                          }
                        />
                      </div>
                    </td>
                    <td className="fs-1 p-0">
                      <Link href={`/service?id=${packageItem.id}`}>
                        {/* <Link href={"/service"}> */}
                        <button className="btn btn-icon btn-bg-light btn-active-color-primary menu-dropdown">
                          <KTIcon
                            iconName="pencil"
                            iconType="solid"
                            className="fs-3"
                          />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center fw-bold text-gray-600 pt-5"
                  >
                    No data available in Table
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {Object.values(checkedItems).some((item) => item) && (
            <div className="text-start mt-5">
              <button
                className="btn btn-danger btn-sm"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="row mb-5 mb-xl-10">
        <div className="col-sm-12 col-md-12 d-flex align-items-center justify-content-between justify-content-md-end">
          <TablePagination
            className=" d-flex justify-content-between"
            totalItems={servicesData.data.talent_packages.total}
          />
        </div>
      </div>
    </>
  );
};

export default AddServices;
