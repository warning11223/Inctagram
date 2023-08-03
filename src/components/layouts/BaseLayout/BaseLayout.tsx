import React, { ReactNode } from "react";
import { Header } from "../../Header/Header";

type Props = {
  title?: string;
  children: ReactNode;
};

export const BaseLayout: React.FC<Props> = ({ children, title }: Props) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};