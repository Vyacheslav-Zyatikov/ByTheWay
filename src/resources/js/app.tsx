import "./bootstrap";
import "../css/App.scss";
import { createInertiaApp } from "@inertiajs/react";
import React from "react";
import { createRoot } from "react-dom/client"
import Layout from "@/components/Layout";

createInertiaApp({
  resolve: name => {
    // eslint-disable-next-line
    // @ts-ignore
    const pages = import.meta.glob("./Pages/**/*.tsx", { eager: true })
    const page = pages[`./Pages/${name}.tsx`]
    // eslint-disable-next-line
    page.default.layout = page.default.layout || (page => <Layout children={page} />)
    return page
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
  progress: {
    color: "#4B5563",
  },
})
