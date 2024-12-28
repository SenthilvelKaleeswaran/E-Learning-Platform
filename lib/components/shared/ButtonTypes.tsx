import { Button } from "@/lib/components/ui";
import { Icon } from "@/lib/icon";

const IconButtonContainer = ({ icon, onClick, className, ...rest }: any) => {
  return (
    <Button className="  bg-white p-0 px-0 py-0  " onClick={onClick} {...rest}>
      <div className={` p-1.5 rounded-full  ${className}`}>
        <Icon name={icon} className="4.5" />
      </div>
    </Button>
  );
};

export const EditButton = (props: any) => {
  return (
    <IconButtonContainer
      icon={"Edit"}
      className={`text-blue-500 border border-blue-300 p-1.5 rounded-full hover:bg-blue-100 ${
        props?.disabled ? "hover:bg-white" : ""
      }`}
      {...props}
    />
  );
};

export const DeleteButton = (props: any) => {
  return (
    <IconButtonContainer
      icon={"Trash"}
      className={`text-red-500 border border-red-300 p-1.5 rounded-full hover:bg-red-100 ${
        props?.disabled ? "hover:bg-white" : ""
      }`}
      {...props}
    />
  );
};
