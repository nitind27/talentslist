import React, { useContext, useState } from "react";
import { PinturaEditorModal } from "@pqina/react-pintura";
import styles from "@pqina/pintura/pintura.module.css";
import pinturaTheme from "../../../../../index.module.css";

import {
  locale_en_gb,
  createDefaultImageReader,
  createDefaultImageWriter,
  createDefaultShapePreprocessor,
  plugin_crop,
  plugin_crop_locale_en_gb,
  plugin_finetune,
  plugin_finetune_locale_en_gb,
  plugin_finetune_defaults,
  plugin_filter,
  plugin_filter_locale_en_gb,
  plugin_filter_defaults,
  plugin_annotate,
  plugin_annotate_locale_en_gb,
  markup_editor_defaults,
  markup_editor_locale_en_gb,
  setPlugins,
} from "@pqina/pintura";
import Image from "next/image";
import { updateProfileImage } from "@/api/profile/portfolio/addfeaturedphotos";
import { toast } from "react-toastify";
import { ManageProfileImageContext } from "./ProfileImage.tsx/ProfileImageProvider";

setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate);

const editorDefaults = {
  utils: ["crop", "finetune", "filter", "annotate"],
  imageReader: createDefaultImageReader(),
  imageWriter: createDefaultImageWriter(),
  shapePreprocessor: createDefaultShapePreprocessor(),
  ...plugin_finetune_defaults,
  ...plugin_filter_defaults,
  ...markup_editor_defaults,
  locale: {
    ...locale_en_gb,
    ...plugin_crop_locale_en_gb,
    ...plugin_finetune_locale_en_gb,
    ...plugin_filter_locale_en_gb,
    ...plugin_annotate_locale_en_gb,
    ...markup_editor_locale_en_gb,
  },
};

interface Props {
  src: string;
  width: number;
  height: number;
  className: string;
  style: any;
}

interface State {
  visible: boolean;
  selectedImage: string | null;
  result: string;
}

const ExampleModal: React.FC<Props> = ({
  src,
  width,
  height,
  className,
  style,
}) => {
  const [state, setState] = useState<State>({
    visible: false,
    selectedImage: null,
    result: `${src}`,
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setState({
        ...state,
        selectedImage: URL.createObjectURL(file),
        visible: true,
      });
    }
  };

  const handleFileChange = async (editedImage: File) => {
    setSelectedFile(editedImage);

    try {
      await updateProfileImage(editedImage); // Call the API with the edited image
      toast.success("Profile Image Update Successfully ");
      setProfileImage(URL.createObjectURL(editedImage)); // Update the context with the new image URL
    } catch (error) {
      toast.error("Error uploading profile photo");
    }
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { setProfileImage } = useContext(ManageProfileImageContext);

  return (
    <div>
      {state.visible && state.selectedImage && (
        <PinturaEditorModal
          {...editorDefaults}
          className={`${styles.pintura} ${pinturaTheme.pinturaTheme}`}
          src={state.selectedImage}
          onLoad={(res) => console.log("load modal image", res)}
          onHide={() => setState({ ...state, visible: false })}
          onProcess={({ dest }) => {
            setState({
              ...state,
              result: URL.createObjectURL(dest),
              visible: false,
            });

            handleFileChange(dest); // Call handleFileChange with the edited image
          }}
        />
      )}
      <label style={{ cursor: "pointer" }}>
        {!!state.result.length && (
          <p>
            <div
              className="d-block overlay position-relative cursor-pointer mb-5"
              data-fslightbox="lightbox-basic"
            >
              <div className="overlay-wrapper">
                <Image
                  src={state.result}
                  alt=""
                  width={width}
                  height={height}
                  style={style}
                  className={className}
                />
              </div>
              <div className="overlay-layer card-rounded bg-dark bg-opacity-25 shadow d-flex align-items-center justify-content-center">
                <img
                  src="/media/svg/camera.svg"
                  height={"50px"}
                  width={"50px"}
                />
              </div>
            </div>
          </p>
        )}

        <input
          type="file"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <span className="pencil-icon" style={{ float: "left" }}></span>
      </label>
    </div>
  );
};

export default ExampleModal;
