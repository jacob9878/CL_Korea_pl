import Nav from "@/component/announcements/Nav";
import Footer from "@/component/announcements/Footer";
import AnnouncementTable from "@/component/announcements/AnnouncementTable";

export default async function DeptAnnouncementsPage({
  params,
}: {
  params: Promise<{ dept: string }>;
}) {
  const { dept } = await params;
  return (
    <>
      <Nav />
      <AnnouncementTable deptKey={decodeURIComponent(dept)} />
      <Footer />
    </>
  );
}
