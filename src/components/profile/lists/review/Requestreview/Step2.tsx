"use client";
import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface Step2Props {
  formData: any;
  data: any;
  onEditorChange: (editorContent: string) => void; // Define a prop to handle editor content change
}

const Step2: React.FC<Step2Props> = ({ formData, data, onEditorChange }) => {
  const [editorData, setEditorData] = useState("");

  useEffect(() => {
    const template = `
      <p>Hi ${formData.client_name},</p>
      <p>It was great working together on your recent event ${
        formData.event_type
      }!</p>
      <p>Would you mind sharing a brief review about my work with you? It will help build my profile on Talents List and show my value to other potential clients.</p>
      <p>Thanks in advance for your help!</p>
      <p>Regards,</p>
      <p>${data?.data?.information?.full_name || ""}</p>
    `;
    setEditorData(template);
    // Pass editor content to parent component
    onEditorChange(template);
  }, []);

  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    setEditorData(data); // Update editorData state with current editor content
    // Pass updated content to parent component
    onEditorChange(data);
  };

  return (
    <div className="mb-5">
      <CKEditor
        editor={ClassicEditor}
        data={editorData} // Set initial data for CKEditor
        onChange={handleEditorChange} // Handle editor content changes
      />
    </div>
  );
};

export default Step2;
