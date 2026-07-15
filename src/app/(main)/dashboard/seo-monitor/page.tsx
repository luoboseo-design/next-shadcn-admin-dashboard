import { redirect } from "next/navigation";

export default function SeoMonitorRedirect() {
  redirect("/dashboard/tasks?tab=seo");
}
