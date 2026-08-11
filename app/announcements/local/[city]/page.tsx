import Nav from "@/component/announcements/Nav";
import Footer from "@/component/announcements/Footer";
import LocalTable from "@/component/announcements/LocalTable";

export default async function LocalAnnouncementsPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  return (
    <>
      <Nav />
      <LocalTable city={decodeURIComponent(city)} />
      <Footer />
    </>
  );
}
