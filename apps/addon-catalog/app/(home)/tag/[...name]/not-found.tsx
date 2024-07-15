import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2 className="mb-8 text-2xl font-bold">Not Found</h2>
      <p className="mb-8">We could not found any information for this tag.</p>
      <Link href="/" className="text-blue-500">
        Return to the list of addons
      </Link>
    </div>
  );
}
