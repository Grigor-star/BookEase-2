import { auth } from "@/auth";
import { Dashboard } from "@/components/dashboard";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isLoggedIn = session?.user;
  let email = "";
  let name = "";
  let image = "";

  if (session?.user) {
    email = JSON.stringify(session.user.email);
    const emailWithoutQuotes = email.replace(/"/g, "");
    email = emailWithoutQuotes;
    name = JSON.stringify(session.user.name);
    const nameWithoutQuotes = name.replace(/"/g, "");
    name = nameWithoutQuotes;
  }

  if (session?.user?.image) {
    image = JSON.stringify(session.user.image);
    const imageWithoutQuotes = image.replace(/"/g, "");
    image = imageWithoutQuotes;
  }

  return (
    <Dashboard name={name} email={email} image={image}>
      {children}
    </Dashboard>
  );
}
