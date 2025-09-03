import { LogoutConfirmation } from "@/components/common/LogoutConfirmation";

export default function DashboardLogout() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-8">
      <LogoutConfirmation/>
    </div>
  );
}