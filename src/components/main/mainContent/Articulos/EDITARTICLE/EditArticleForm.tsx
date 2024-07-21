import React from "react";

type EditArticleFormProps = {
  articleToEdit: { id: string; barcode: string; code: string }; // Define tus props aquí
};

const EditArticleForm: React.FC<EditArticleFormProps> = ({}) => {
  const initialState: articleData = {};
  return (
    <div className="absolute top-0 right-0 left-0 bottom-0 bg-slate-600 z-50"></div>
  );
};

export default EditArticleForm;
