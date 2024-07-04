"use server";
import { auth } from "@/auth";
import { StoreForm } from "@/components/store/store";
import { db } from "@/lib/db";

export default async function StorePage() {
  const session = await auth();
  const isLoggedIn = session?.user;
  let email = "";
  let name = "";
  let image = "";
  let id = "";

  if (session?.user) {
    email = JSON.stringify(session.user.email);
    const emailWithoutQuotes = email.replace(/"/g, "");
    email = emailWithoutQuotes;
    name = JSON.stringify(session.user.name);
    const nameWithoutQuotes = name.replace(/"/g, "");
    name = nameWithoutQuotes;
    id = JSON.stringify(session.user.id);
    const idWithoutQuotes = name.replace(/"/g, "");
    id = idWithoutQuotes;
  }

  if (session?.user?.image) {
    image = JSON.stringify(session.user.image);
    const imageWithoutQuotes = image.replace(/"/g, "");
    image = imageWithoutQuotes;
  }

  const store = await db.store.findMany({
    where: { userId: session?.user.id },
  });

  return (
    <div className="w-full h-full flex justify-center items-center dark:bg-black">
      <StoreForm name={name} image={image} email={email} store={store} />
    </div>
  );
}
