import { Button } from "@/components/ui/button";
import { getServicesByCategoryId } from "@/data/services";
import { cn } from "@/lib/utils";
import { AddServiceForm } from "./add-service";
import Link from "next/link";

interface ServicesFormProps {
  id: string;
  className?: string;
}

export const ServicesForm = async ({ id, className }: ServicesFormProps) => {
  const services = await getServicesByCategoryId(id);
  if (services.length === 0) {
    return (
      <div className={cn(`h-full ${className}`)}>
        <div className="flex h-full items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Add a new serivce.
            </h3>
            <p className="text-sm text-muted-foreground text-balance">
              Please create at least one category so you will be able to add
              your services.
            </p>
            <Link className={className} href={`/store/add-service/${id}`}>
              <Button size="lg">Add Service</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return <div></div>;
};
