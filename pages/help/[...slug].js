import { useRouter } from "next/router";

export default function HelpPage() {
  const router = useRouter();
  const { slug } = router.query;

  const page = slug?.[0];

  const renderContent = () => {
    if (page === 'faq') {
        return <h1>FAQs</h1>;
      } else if (page === 'contact') {
        return <h1>Contact</h1>;
      } else if (page === 'privacy') {
        return <h1>Privacy</h1>;
      } else {
        return <h1>Page Not Found</h1>;
      }
      
  };

  return (
    <div className="p-4">
      {renderContent()}
    </div>
  );
}
