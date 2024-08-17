import React from "react";
import { articleData } from "../../../../../../types/types";

interface EditArticleFormProps {
  onChangeModal: (p: boolean) => void;
  categorys: any[];
  brands: any[];
  articles: articleData[];
  articleToEdit: {
    id: string;
    idArticle: string;
    code: string;
    barcode: string;
  };
}

// Resto del componente...



const EditArticleForm: React.FC<EditArticleFormProps> = ({}) => {
  return (
    <div className="absolute top-0 right-0 left-0 bottom-0 bg-slate-600 z-50"></div>
  );
};

export default EditArticleForm;
