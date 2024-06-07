import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./assets/component/MainPage/MainPage";
import FileUpload from "./assets/component/FileUpload/FileUpload";
import ViewerPageCampaign from "./assets/component/Viewer/TestReadOnly";
import PAdmin from "./assets/component/AdminCanChangePosition/PAdmin";
import AdminCampagin from "./assets/component/AdminCanChangePosition/AdminCampagin";
import AdminLookBook from "./assets/component/AdminCanChangePosition/AdminLookbook";
import ViewerPageLookbook from "./assets/component/Viewer/ViewerPageLookbook";
import Info from "./assets/component/Info/Info";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="admin" element={<PAdmin />}>
          <Route index element={<FileUpload />} />
          <Route path="lookbook" element={<AdminLookBook />} />
          <Route path="campaign" element={<AdminCampagin />} />
        </Route>

        <Route path="/campaign" element={<ViewerPageCampaign />} />
        <Route path="/lookbook" element={<ViewerPageLookbook />} />
        <Route path="/info" element={<Info />} />


      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
