export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="content-center min-h-dvh">
      <h1 className="text-center">Product {id}</h1>
    </div>
  );
}
