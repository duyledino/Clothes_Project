import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function LoginButton() {
  const router = useNavigate();
  const onClick = () => {
    router("/login");
  };
  return (
    <Button
      onClick={onClick}
      variant={"ghost"}
      className="

        inline-flex items-center justify-center
        rounded-full px-6
        text-sm font-semibold
        transition-all duration-200
        cursor-pointer
        border
        bg-[oklch(0.145_0_0)]
        text-white
        dark:bg-[oklch(0.25_0_0)]
        dark:hover:bg-[oklch(0.3_0_0)]
        dark:active:bg-[oklch(0.22_0_0)]
      "
    >
      Login
    </Button>
  );
}
