import { createRoot } from "react-dom/client";
import { RecoilEnv, RecoilRoot } from "recoil";

import reportWebVitals from "./reportWebVitals";
import { ErrorBoundary } from "./shared";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = true;
RecoilEnv.RECOIL_GKS_ENABLED = new Set();

const root = createRoot(document.getElementById("root"));

root.render(
  <ErrorBoundary componentId='root'>
    <RecoilRoot>
      <div>Hello world!</div>
    </RecoilRoot>
  </ErrorBoundary>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
