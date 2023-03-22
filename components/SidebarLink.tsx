import { ComponentClass, ReactComponentElement, SVGProps } from "react";
import { IconBaseProps } from "react-icons";

interface Props {
  Icon: any
  text: string
}

function SidebarLink({ Icon, text }:Props) {
  return (
    <>
      <div
        className={`text-[#d9d9d9] flex items-center justify-center
    xl:justify-start text-xl space-x-3 hoverAnimation`}>
        <Icon className="h-7 text-white" />
        <span className="hidden xl:inline">{text}</span>
      </div>
    </>
  );
}

export default SidebarLink;
