import Nav from "@/component/announcements/Nav";
import Footer from "@/component/announcements/Footer";
import LocalDetail from "@/component/announcements/LocalDetail";

export default async function LocalDetailPage({
  params,
}: {
  params: Promise<{ city: string; idx: string }>;
}) {
  const { city, idx } = await params;
  return (
    <>
      <Nav />
      <LocalDetail city={decodeURIComponent(city)} idx={parseInt(idx, 10)} />
      <Footer />
    </>
  );
}
