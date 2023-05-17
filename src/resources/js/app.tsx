import "../css/App.scss";
import "./bootstrap";
import { createInertiaApp } from "@inertiajs/react";
import React from "react";
import { createRoot } from "react-dom/client"
import Layout from "@/components/Layout";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import axiosInstance from "axios";
export const axios = axiosInstance.create({
  baseURL: "/",
});

createInertiaApp({
  resolve: name => {
    // eslint-disable-next-line
    // @ts-ignore
    const pages = import.meta.glob("./Pages/**/*.tsx", { eager: true })
    const page = pages[`./Pages/${name}.tsx`]
    page.default.layout = page.default.layout || (page => (
      <Provider store={store}>
        {/* eslint-disable-next-line */}
        <Layout children={page} />
      </Provider>
    ));
    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
  progress: {
    color: "#4B5563",
  },
})
