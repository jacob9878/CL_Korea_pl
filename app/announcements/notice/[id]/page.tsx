import Nav from "@/component/announcements/Nav";
import Footer from "@/component/announcements/Footer";
import AnnouncementDetail from "@/component/announcements/AnnouncementDetail";

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <Nav />
      <AnnouncementDetail id={id} />
      <Footer />
    </>
  );
}
