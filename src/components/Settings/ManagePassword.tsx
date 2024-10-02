"use client";
import { KTIcon } from "@/_metronic/helpers";
import { updatePassword } from "@/api/settings/updatePassword";
import { FC, useState } from "react";
import { toast } from "react-toastify";

const ManagePassword: FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from submitting the default way

    try {
      const response = await updatePassword(password);

      if (response.error) {
        if (typeof response.data.message === "object") {
          const errorMessage = Object.values<string>(response.data.message);
          toast.error(errorMessage[0].toString());
        } else {
          toast.error(response.data.message.toString());
        }
      } else {
        toast.success(response.data.message);
        setIsEditing(false); // Reset the form after successful update
        setPassword({
          current_password: "",
          password: "",
          password_confirmation: "",
        });
      }
    } catch (error) {
      toast.error("An error occurred while updating the password.");
    }
  };

  const handleResetClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="card pb-4 mb-5 mb-xl-10">
      <div className="card-header">
        <div className="card-title m-0">
          <h4 className="fw-bold m-0 d-flex gap-3">
            <KTIcon
              iconName="lock"
              iconType="duotone"
              className="fs-2 text-gray-500"
            />
            Change password
          </h4>
        </div>
      </div>

      <div id="kt_account_signin_method" className="collapse show">
        <div className="card-body pt-5 pb-5">
          <div className="d-flex flex-wrap align-items-center">
            <div
              id="kt_signin_password"
              style={{ display: isEditing ? "none" : "block" }}
            >
              <div className="fs-6 fw-bolder mb-1">Password</div>
              <div className="fw-bold text-gray-600">************</div>
            </div>

            <div
              id="kt_signin_password_edit"
              style={{ display: isEditing ? "block" : "none" }}
            >
              <form
                id="kt_signin_change_password"
                className="form"
                noValidate
                onSubmit={handleSaveChanges}
              >
                <div className="row mb-1">
                  <div className="col-lg-4">
                    <div className="fv-row mb-0">
                      <label
                        htmlFor="currentpassword"
                        className="form-label fs-6 fw-bolder mb-3"
                      >
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="current_password"
                        value={password.current_password}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "bg-body",
                        }}
                        className="form-control  form-control-lg border-1"
                        id="currentpassword"
                      />
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="fv-row mb-0">
                      <label
                        htmlFor="newpassword"
                        className="form-label fs-6 fw-bolder mb-3"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={password.password}
                        onChange={handleInputChange}
                        className="form-control form-control-lg bg-body border-1"
                        id="newpassword"
                      />
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="fv-row mb-0">
                      <label
                        htmlFor="confirmpassword"
                        className="form-label fs-6 fw-bolder mb-3"
                      >
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="password_confirmation"
                        value={password.password_confirmation}
                        onChange={handleInputChange}
                        className="form-control form-control-lg bg-body border-1"
                        id="confirmpassword"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-text mb-5">
                  Password must be at least 8 characters and contain symbols
                </div>
                <div className="d-flex">
                  <button
                    id="kt_password_submit"
                    type="submit"
                    className="btn btn-primary text-white me-2 px-6 btn-sm"
                  >
                    Update Password
                  </button>
                  <button
                    id="kt_password_cancel"
                    type="button"
                    className="btn btn-active-light-primary px-6 btn-sm"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            <div
              id="kt_signin_password_button"
              className="ms-auto"
              style={{ display: isEditing ? "none" : "block" }}
            >
              <button
                className="btn btn-sm btn-light text-muted"
                onClick={handleResetClick}
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ManagePassword };
