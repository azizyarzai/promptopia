import React, { Suspense } from "react";

const UpdatePromptLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<div>Loading</div>}>{children}</Suspense>;
};

export default UpdatePromptLayout;
