import { CatalogForm } from "@/components/store/services/categories/catalog-form";

export default async function Services({ params }: { params: { id: string } }) {
  return (
    <main className="w-full flex flex-col gap-6 p-4 md:gap-3 md:p-6 mt-[60px] h-full">
      <h1 className="text-[26px] font-bold">Categories</h1>
      <section className="h-full w-full">
        <CatalogForm id={params.id} />
      </section>
    </main>
  );
}
