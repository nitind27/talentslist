"use client";
import React, { useState, useEffect } from "react";
import { UncontrolledTooltip } from "reactstrap";
import { KTIcon } from "@/_metronic/helpers";
import { IPlatformData } from "@/api/services/types";
import Image from "next/image";
import { updatePlatform } from "@/api/services/services";
import { toast } from "react-toastify";

interface PlatformProps {
  PlatformData: IPlatformData[];
}

const Platform: React.FC<PlatformProps> = ({ PlatformData: initialPlatformData }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<number[]>([]);
  const [PlatformData, setPlatformData] = useState<IPlatformData[]>(initialPlatformData);

  useEffect(() => {
    if (!isEditMode) {
      const initiallySelected = PlatformData.filter(platform => platform.checked).map(platform => platform.platform_id);
      setSelectedPlatforms(initiallySelected);
    }
  }, [PlatformData, isEditMode]);

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    const initiallySelected = PlatformData.filter(platform => platform.checked).map(platform => platform.platform_id);
    setSelectedPlatforms(initiallySelected);
  };

  const handleSave = async () => {
    try {
      const response = await updatePlatform(selectedPlatforms); 
      if (response.data) {
        setIsEditMode(false);
        toast.success(response.data.message)
        const updatedPlatformData = PlatformData.map(platform => ({
          ...platform,
          checked: selectedPlatforms.includes(platform.platform_id)
        }));
        setPlatformData(updatedPlatformData);
      } else {
        console.error('Failed to update platform');
      }
    } catch (error) {
      console.error('An error occurred while updating the platform', error);
    }
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedPlatforms((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((platformId) => platformId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <div className="card mb-5 mb-xl-10">
      <div className="card-header">
        <div className="card-title m-0">
          <h4 className="fw-bold m-0 d-flex gap-3">
            <KTIcon iconName="profile-user" iconType="duotone" className="fs-2" />
            Platform
          </h4>
        </div>
        <div className="card-toolbar">
          <div className="me-0">
            <button
              className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary menu-dropdown"
              onClick={handleEditClick}
            >
              <KTIcon iconName="pencil" iconType="duotone" className="fs-4 cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
      <div className="card-body p-9 pt-5 pb-5">
        <div className="row text-muted fw-semibold text-muted d-block fs-7">
          {PlatformData.length > 0 ? (
            PlatformData.map((platform) => {
              if (!isEditMode && !platform.checked) {
                return null;
              }
              return (
                <span key={platform.platform_id} id={`tooltip-${platform.platform_id}`}>
                  {isEditMode ? (
                    <div className="form-check form-check-sm">
                      <input
                        name="checked"
                        className="form-check-input"
                        type="checkbox"
                        value={platform.platform_id}
                        checked={selectedPlatforms.includes(platform.platform_id)}
                        onChange={() => handleCheckboxChange(platform.platform_id)}
                      />
                      <Image src={platform.image} height={20} width={20} alt={platform.title} />
                    </div>
                  ) : (
                    <>
                      <Image src={platform.image} height={20} width={20} alt={platform.title} />
                      <UncontrolledTooltip delay={0} placement="top" target={`tooltip-${platform.platform_id}`}>
                        {platform.title}
                      </UncontrolledTooltip>
                    </>
                  )}
                </span>
              );
            })
          ) : (
            <p>No platforms found.</p>
          )}
        </div>
        {isEditMode && (
          <div className="d-flex justify-content-end mt-3">
            <button
              className="btn btn-sm me-5"
              style={{ backgroundColor: "#D9214E", color: "white" }}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="btn btn-sm"
              style={{ backgroundColor: "#0036e3", color: "white" }}
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Platform;