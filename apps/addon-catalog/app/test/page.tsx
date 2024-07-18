export default async function Page() {
  const fetchAddonsData = async () => {
    const res = await fetch('http://localhost:3001/addons/api/addons');
    const addons = await res.json();
    return addons;
  };

  const addons = await fetchAddonsData();

  return (
    <div>
      {addons.map((addon) => (
        <div>Hello</div>
      ))}
    </div>
  );
}
