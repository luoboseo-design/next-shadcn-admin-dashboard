import { redirect } from "next/navigation";

export default function SocialMonitorRedirect() {
  redirect("/dashboard/tasks?tab=social");
}
