import './bootstrap';
import "../css/App.scss";
import { createInertiaApp } from '@inertiajs/react';
import { InertiaProgress } from "@inertiajs/progress";
import React from "react";
import { render } from "react-dom";
import { createRoot } from 'react-dom/client'
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
    return pages[`./Pages/${name}.tsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
  progress: {
    color: '#4B5563',
  },
})
