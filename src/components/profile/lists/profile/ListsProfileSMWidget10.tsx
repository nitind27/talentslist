import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { KTIcon } from "@/_metronic/helpers";
import { UncontrolledTooltip } from "reactstrap";
import Image from "next/image";
import {
  getprofileinformationClient,
  updatesocialmedia,
} from "@/api/profile/get_profile_information";
import { Iprofile } from "@/api/profile/types";
import { toast } from "react-toastify";

const ListsProfileSMWidget10 = () => {
  const [socialMedia, setSocialMedia] = useState<any | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchProfileInformation = async () => {
      try {
        const response = await getprofileinformationClient();
        setSocialMedia(response);
      } catch (error) {
        console.error("Error fetching profile information:", error);
      }
    };

    fetchProfileInformation();
  }, []);

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // Reset form values if needed
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      facebook: socialMedia?.data?.social_media_links?.Facebook?.name || "",
      instagram: socialMedia?.data?.social_media_links?.instagram?.name || "",
      linkedin: socialMedia?.data?.social_media_links?.Linkedin?.name || "",
      youtube: socialMedia?.data?.social_media_links?.youtube?.name || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      facebook: Yup.string(),
      instagram: Yup.string(),
      linkedin: Yup.string(),
      youtube: Yup.string(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await updatesocialmedia(values as any);
        if (response.status) {
          toast.success(response.message);
          setIsEditMode(false);
          setSocialMedia({
            ...socialMedia,
            data: {
              ...socialMedia?.data,
              social_media_links: {
                ...socialMedia?.data?.social_media_links,
                Facebook: {
                  ...socialMedia?.data?.social_media_links?.Facebook,
                  name: values.facebook,
                },
                instagram: {
                  ...socialMedia?.data?.social_media_links?.instagram,
                  name: values.instagram,
                },
                Linkedin: {
                  ...socialMedia?.data?.social_media_links?.Linkedin,
                  name: values.linkedin,
                },
                youtube: {
                  ...socialMedia?.data?.social_media_links?.youtube,
                  name: values.youtube,
                },
              },
            },
          });
        }
        // Update local state with new data after submission
      } catch (error) {
        toast.error("Failed to update social media information.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <div className="card mb-5 mb-xl-10">
        <div className="card-header">
          <div className="card-title m-0">
            <h4 className="fw-bold m-0 d-flex gap-3">
              <KTIcon
                iconName="profile-user"
                iconType="duotone"
                className="fs-1"
              />
              Social media
            </h4>
          </div>
          <div className="card-toolbar">
            {!isEditMode && (
              <button
                type="button"
                className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary menu-dropdown"
                data-kt-menu-trigger="click"
                data-kt-menu-placement="bottom-end"
                data-kt-menu-flip="top-end"
                onClick={handleEditClick}
              >
                <KTIcon iconName="pencil" iconType="duotone" className="fs-2" />
              </button>
            )}
          </div>
        </div>
        <div className="separator"></div>

        <div className="card-body p-9 pt-5 pb-5">
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              {/* Render fields based on edit mode */}
              {/* Facebook */}
              <div className="col-lg-6 d-flex align-items-center mb-5">
                <Link
                  href={
                    socialMedia?.data?.social_media_links?.Facebook?.url || "#"
                  }
                  target="_blank"
                  className="d-flex align-items-center"
                >
                  <Image
                    src="/media/svg/facebook-4.svg"
                    alt="Facebook"
                    width={20}
                    height={20}
                    id="tooltipFacebook"
                  />
                </Link>
                {isEditMode ? (
                  <input
                    className="form-control ms-3"
                    placeholder="Enter your Facebook username"
                    id="facebook"
                    name="facebook"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.facebook}
                  />
                ) : (
                  <span className="mx-5 fw-bold">
                    {socialMedia?.data?.social_media_links?.Facebook?.name ||
                      "-"}
                  </span>
                )}
                <UncontrolledTooltip
                  delay={0}
                  placement="top"
                  target="tooltipFacebook"
                >
                  Facebook
                </UncontrolledTooltip>
              </div>
              {/* Instagram */}
              <div className="col-lg-6 d-flex align-items-center mb-5">
                <Link
                  href={
                    socialMedia?.data?.social_media_links?.instagram?.url || "#"
                  }
                  target="_blank"
                  className="d-flex align-items-center"
                >
                  <Image
                    src="/media/svg/instagram-2-1.svg"
                    alt="Instagram"
                    width={20}
                    height={20}
                    id="tooltipInsta"
                  />
                </Link>
                {isEditMode ? (
                  <input
                    className="form-control  ms-3"
                    placeholder="Enter your Instagram username"
                    id="instagram"
                    name="instagram"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.instagram}
                  />
                ) : (
                  <span className="mx-5 fw-bold">
                    {socialMedia?.data?.social_media_links?.instagram?.name ||
                      "-"}
                  </span>
                )}
                <UncontrolledTooltip
                  delay={0}
                  placement="top"
                  target="tooltipInsta"
                >
                  Instagram
                </UncontrolledTooltip>
              </div>
            </div>
            <div className="row">
              {/* LinkedIn */}
              <div className="col-lg-6 d-flex align-items-center mb-5">
                <Link
                  href={
                    socialMedia?.data?.social_media_links?.Linkedin?.url || "#"
                  }
                  target="_blank"
                  className="d-flex align-items-center"
                >
                  <Image
                    src="/media/svg/linkedin-2.svg"
                    alt="LinkedIn"
                    width={20}
                    height={20}
                    id="tooltiplinkdin"
                  />
                </Link>
                {isEditMode ? (
                  <input
                    className="form-control  ms-3"
                    placeholder="Enter your LinkedIn username"
                    id="linkedin"
                    name="linkedin"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.linkedin}
                  />
                ) : (
                  <span className="mx-5 fw-bold">
                    {socialMedia?.data?.social_media_links?.Linkedin?.name ||
                      "-"}
                  </span>
                )}
                <UncontrolledTooltip
                  delay={0}
                  placement="top"
                  target="tooltiplinkdin"
                >
                  LinkedIn
                </UncontrolledTooltip>
              </div>
              {/* YouTube */}
              <div className="col-lg-6 d-flex align-items-center mb-5">
                <Link
                  href={
                    socialMedia?.data?.social_media_links?.youtube?.url || "#"
                  }
                  target="_blank"
                  className="d-flex align-items-center"
                >
                  <Image
                    src="/media/svg/youtube-play.svg"
                    alt="YouTube"
                    width={20}
                    height={20}
                    id="tooltipyoutube"
                  />
                </Link>
                {isEditMode ? (
                  <input
                    className="form-control  ms-3"
                    placeholder="Enter your YouTube username"
                    id="youtube"
                    name="youtube"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.youtube}
                  />
                ) : (
                  <span className="mx-5 fw-bold">
                    {socialMedia?.data?.social_media_links?.youtube?.name ||
                      "-"}
                  </span>
                )}
                <UncontrolledTooltip
                  delay={0}
                  placement="top"
                  target="tooltipyoutube"
                >
                  YouTube
                </UncontrolledTooltip>
              </div>
            </div>

            {isEditMode && (
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-sm me-5"
                  style={{ backgroundColor: "#D9214E", color: "white" }}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-sm"
                  style={{ backgroundColor: "#0036e3", color: "white" }}
                >
                  Save
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListsProfileSMWidget10;
