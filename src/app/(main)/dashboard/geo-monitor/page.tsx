import { redirect } from "next/navigation";

export default function GeoMonitorRedirect() {
  redirect("/dashboard/tasks?tab=geo");
}
