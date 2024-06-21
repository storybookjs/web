export const generateStaticParams = () => {
  return [{ id: 'foo' }, { id: 'bar' }];
}

export default function Recipe({ params }: { params: { id?: string } }) {
  return <main className="p-8">{params.id}</main>;
}
