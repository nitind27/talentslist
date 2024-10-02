import React, { useState } from "react";
import { PinturaEditorModal } from "@pqina/react-pintura";
import styles from "@pqina/pintura/pintura.module.css";
import pinturaTheme from "../../../../../../index.module.css";

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
  onImageSelect: (file: File) => void;
}

interface State {
  visible: boolean;
  selectedImage: string | null;
  result: string;
}

const ProfileAlbum: React.FC<Props> = ({
  src,
  width,
  height,
  className,
  style,
  onImageSelect,
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
      onImageSelect(file); // Call the API with the selected file
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setState({
        ...state,
        selectedImage: URL.createObjectURL(file),
        visible: true,
      });
      onImageSelect(file); // Call the API with the dropped file
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

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
          }}
        />
      )}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById("fileInput")?.click()}
        style={{
          border: "2px dashed #cccccc",
          borderRadius: "6px",
          padding: "20px",
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          cursor: "pointer",
          marginTop: "20px",
          position: "relative",
        }}
      >
        {state.result ? (
          <Image
            src={state.result}
            alt="Selected Image"
            width={width}
            height={height}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
            className={className}
          />
        ) : (
          <p>Drag & drop files here ... (or click to select file)</p>
        )}
        <input
          id="fileInput"
          type="file"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default ProfileAlbum;
