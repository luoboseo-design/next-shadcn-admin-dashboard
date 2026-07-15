import { redirect } from "next/navigation";

export default function NewsMonitorRedirect() {
  redirect("/dashboard/tasks?tab=news");
}
