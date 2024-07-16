"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { serviceSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import Link from "next/link";
import BeatLoader from "react-spinners/BeatLoader";
import { createService } from "@/actions/services/service";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import useMediaQuery from "@/hooks/useMediaQuery";

interface AddServiceFormProps {
  id: string;
  categories: Categories[];
}

interface Categories {
  id: string;
  storeId: string;
  title: string;
  description: string;
}

export function AddServiceForm({ id, categories }: AddServiceFormProps) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const isLargeDisplay = useMediaQuery("(min-width: 640px)");
  const router = useRouter();
  const theme = useTheme();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      serviceType: "",
      duration: "",
      price: "",
      currency: "",
    },
  });
  const onSubmit = (values: z.infer<typeof serviceSchema>) => {
    startTransition(() => {
      createService(values, id).then((data) => {
        if (data?.success) {
          setSuccess(data.success);
          router.push(`/store/services/${id}`);
        }
        setError(data?.error);
      });
    });
  };
  if (isLargeDisplay) {
    return (
      <Card className="w-full max-w-2xl shadow-none">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
            <CardContent className="grid gap-4 mt-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormField
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            id="title"
                            placeholder="Enter service title"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    name="serviceType"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Type</FormLabel>
                        <FormControl>
                          <Select
                            disabled={isPending}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select service type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="consulting">
                                Consulting
                              </SelectItem>
                              <SelectItem value="training">Training</SelectItem>
                              <SelectItem value="support">Support</SelectItem>
                              <SelectItem value="implementation">
                                Implementation
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isPending}
                          id="description"
                          {...field}
                          placeholder="Describe the service"
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormField
                    name="categoryId"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Select
                            disabled={isPending}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select service category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col space-y-2 w-full">
                        <FormField
                          name="duration"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Duration</FormLabel>
                              <FormControl>
                                <Select
                                  disabled={isPending}
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selcet duration on minutes" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="5min">
                                      5 minutes
                                    </SelectItem>
                                    <SelectItem value="10min">
                                      10 minutes
                                    </SelectItem>
                                    <SelectItem value="15min">
                                      15 minutes
                                    </SelectItem>
                                    <SelectItem value="20min">
                                      20 minutes
                                    </SelectItem>
                                    <SelectItem value="25min">
                                      25 minutes
                                    </SelectItem>
                                    <SelectItem value="30min">
                                      30 minutes
                                    </SelectItem>
                                    <SelectItem value="35min">
                                      35 minutes
                                    </SelectItem>
                                    <SelectItem value="40min">
                                      40 minutes
                                    </SelectItem>
                                    <SelectItem value="45min">
                                      45 minutes
                                    </SelectItem>
                                    <SelectItem value="50min">
                                      50 minutes
                                    </SelectItem>
                                    <SelectItem value="55min">
                                      55 minutes
                                    </SelectItem>
                                    <SelectItem value="1 hour">
                                      1 hour
                                    </SelectItem>
                                    <SelectItem value="1h 5min">
                                      1h 5min
                                    </SelectItem>
                                    <SelectItem value="1h 10min">
                                      1h 10min
                                    </SelectItem>
                                    <SelectItem value="1h 15min">
                                      1h 15min
                                    </SelectItem>
                                    <SelectItem value="1h 20min">
                                      1h 20min
                                    </SelectItem>
                                    <SelectItem value="1h 25min">
                                      1h 25min
                                    </SelectItem>
                                    <SelectItem value="1h 30min">
                                      1h 30min
                                    </SelectItem>
                                    <SelectItem value="1h 45min">
                                      1h 45min
                                    </SelectItem>
                                    <SelectItem value="2 hours">
                                      2 hours
                                    </SelectItem>
                                    <SelectItem value="2h 15min">
                                      2h 15min
                                    </SelectItem>
                                    <SelectItem value="2h 30min">
                                      2h 30min
                                    </SelectItem>
                                    <SelectItem value="2h 45min">
                                      2h 45min
                                    </SelectItem>
                                    <SelectItem value="3 hours">
                                      3 hours
                                    </SelectItem>
                                    <SelectItem value="3h 15min">
                                      3h 15min
                                    </SelectItem>
                                    <SelectItem value="3h 30min">
                                      3h 30min
                                    </SelectItem>
                                    <SelectItem value="3h 45min">
                                      3h 45min
                                    </SelectItem>
                                    <SelectItem value="4 hours">
                                      4 hours
                                    </SelectItem>
                                    <SelectItem value="4h 15min">
                                      4h 15min
                                    </SelectItem>
                                    <SelectItem value="4h 30min">
                                      4h 30min
                                    </SelectItem>
                                    <SelectItem value="4h 45min">
                                      4h 45min
                                    </SelectItem>
                                    <SelectItem value="5 hours">
                                      5 hours
                                    </SelectItem>
                                    <SelectItem value="5h 15min">
                                      5h 15min
                                    </SelectItem>
                                    <SelectItem value="5h 30min">
                                      5h 30min
                                    </SelectItem>
                                    <SelectItem value="5h 45min">
                                      5h 45min
                                    </SelectItem>
                                    <SelectItem value="6 hours">
                                      6 hours
                                    </SelectItem>
                                    <SelectItem value="6h 15min">
                                      6h 15min
                                    </SelectItem>
                                    <SelectItem value="6h 30min">
                                      6h 30min
                                    </SelectItem>
                                    <SelectItem value="6h 45min">
                                      6h 45min
                                    </SelectItem>
                                    <SelectItem value="7 hours">
                                      7 hours
                                    </SelectItem>
                                    <SelectItem value="7h 15min">
                                      7h 15min
                                    </SelectItem>
                                    <SelectItem value="7h 30min">
                                      7h 30min
                                    </SelectItem>
                                    <SelectItem value="7h 45min">
                                      7h 45min
                                    </SelectItem>
                                    <SelectItem value="8 hours">
                                      8 hours
                                    </SelectItem>
                                    <SelectItem value="8h 15min">
                                      8h 15min
                                    </SelectItem>
                                    <SelectItem value="8h 30min">
                                      8h 30min
                                    </SelectItem>
                                    <SelectItem value="8h 45min">
                                      8h 45min
                                    </SelectItem>
                                    <SelectItem value="9 hours">
                                      9 hours
                                    </SelectItem>
                                    <SelectItem value="9h 15min">
                                      9h 15min
                                    </SelectItem>
                                    <SelectItem value="9h 30min">
                                      9h 30min
                                    </SelectItem>
                                    <SelectItem value="9h 45min">
                                      9h 45min
                                    </SelectItem>
                                    <SelectItem value="10 hours">
                                      10 hours
                                    </SelectItem>
                                    <SelectItem value="10h 15min">
                                      10h 15min
                                    </SelectItem>
                                    <SelectItem value="10h 30min">
                                      10h 30min
                                    </SelectItem>
                                    <SelectItem value="10h 45min">
                                      10h 45min
                                    </SelectItem>
                                    <SelectItem value="11 hours">
                                      11 hours
                                    </SelectItem>
                                    <SelectItem value="11h 15min">
                                      11h 15min
                                    </SelectItem>
                                    <SelectItem value="11h 30min">
                                      11h 30min
                                    </SelectItem>
                                    <SelectItem value="11h 45min">
                                      11h 45min
                                    </SelectItem>
                                    <SelectItem value="12 hours">
                                      12 hours
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gap-4">
                  <div className="space-y-2  w-full">
                    <div className="flex items-center gap-2  w-full">
                      <div className="flex flex-col space-y-2 w-full">
                        <FormField
                          name="price"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price</FormLabel>
                              <FormControl>
                                <Input
                                  disabled={isPending}
                                  {...field}
                                  id="price"
                                  className="w-full"
                                  type="number"
                                  placeholder="0"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gap-4">
                  <div className="space-y-2  w-full">
                    <div className="flex items-center gap-2  w-full">
                      <div className="flex flex-col space-y-2">
                        <FormField
                          name="currency"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Currency</FormLabel>
                              <FormControl>
                                <Select
                                  disabled={isPending}
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger>
                                    <SelectValue
                                      className="w-full"
                                      placeholder="Currency"
                                    />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="USD">USD $</SelectItem>
                                    <SelectItem value="EUR">EUR €</SelectItem>
                                    <SelectItem value="RUB">RUBLE ₽</SelectItem>
                                    <SelectItem value="AMD">AMD Դ</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <FormSuccess message={success} />
                <FormError message={error} />
              </div>
            </CardContent>
            <CardFooter className="justify-end flex items-center gap-3 w-full">
              <Link className="w-full" href={`/store/services/${id}`}>
                <Button
                  className="w-full sm:w-auto"
                  disabled={isPending}
                  size="lg"
                  variant="outline"
                >
                  Close
                </Button>
              </Link>
              <Button
                className="w-full sm:w-auto"
                disabled={isPending}
                size="lg"
                type="submit"
              >
                {isPending ? (
                  <BeatLoader
                    color={theme.resolvedTheme !== "dark" ? "white" : "black"}
                    size={10}
                  />
                ) : (
                  "Continue"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    );
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
          <CardContent className="grid gap-4 mt-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <FormField
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          id="title"
                          placeholder="Title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  name="serviceType"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          disabled={isPending}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Service Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="consulting">
                              Consulting
                            </SelectItem>
                            <SelectItem value="training">Training</SelectItem>
                            <SelectItem value="support">Support</SelectItem>
                            <SelectItem value="implementation">
                              Implementation
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-2">
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isPending}
                        id="description"
                        {...field}
                        placeholder="Description"
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <FormField
                  name="categoryId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          disabled={isPending}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col space-y-2 w-full">
                      <FormField
                        name="duration"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select
                                disabled={isPending}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Duration" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="5min">
                                    5 minutes
                                  </SelectItem>
                                  <SelectItem value="10min">
                                    10 minutes
                                  </SelectItem>
                                  <SelectItem value="15min">
                                    15 minutes
                                  </SelectItem>
                                  <SelectItem value="20min">
                                    20 minutes
                                  </SelectItem>
                                  <SelectItem value="25min">
                                    25 minutes
                                  </SelectItem>
                                  <SelectItem value="30min">
                                    30 minutes
                                  </SelectItem>
                                  <SelectItem value="35min">
                                    35 minutes
                                  </SelectItem>
                                  <SelectItem value="40min">
                                    40 minutes
                                  </SelectItem>
                                  <SelectItem value="45min">
                                    45 minutes
                                  </SelectItem>
                                  <SelectItem value="50min">
                                    50 minutes
                                  </SelectItem>
                                  <SelectItem value="55min">
                                    55 minutes
                                  </SelectItem>
                                  <SelectItem value="1 hour">1 hour</SelectItem>
                                  <SelectItem value="1h 5min">
                                    1h 5min
                                  </SelectItem>
                                  <SelectItem value="1h 10min">
                                    1h 10min
                                  </SelectItem>
                                  <SelectItem value="1h 15min">
                                    1h 15min
                                  </SelectItem>
                                  <SelectItem value="1h 20min">
                                    1h 20min
                                  </SelectItem>
                                  <SelectItem value="1h 25min">
                                    1h 25min
                                  </SelectItem>
                                  <SelectItem value="1h 30min">
                                    1h 30min
                                  </SelectItem>
                                  <SelectItem value="1h 45min">
                                    1h 45min
                                  </SelectItem>
                                  <SelectItem value="2 hours">
                                    2 hours
                                  </SelectItem>
                                  <SelectItem value="2h 15min">
                                    2h 15min
                                  </SelectItem>
                                  <SelectItem value="2h 30min">
                                    2h 30min
                                  </SelectItem>
                                  <SelectItem value="2h 45min">
                                    2h 45min
                                  </SelectItem>
                                  <SelectItem value="3 hours">
                                    3 hours
                                  </SelectItem>
                                  <SelectItem value="3h 15min">
                                    3h 15min
                                  </SelectItem>
                                  <SelectItem value="3h 30min">
                                    3h 30min
                                  </SelectItem>
                                  <SelectItem value="3h 45min">
                                    3h 45min
                                  </SelectItem>
                                  <SelectItem value="4 hours">
                                    4 hours
                                  </SelectItem>
                                  <SelectItem value="4h 15min">
                                    4h 15min
                                  </SelectItem>
                                  <SelectItem value="4h 30min">
                                    4h 30min
                                  </SelectItem>
                                  <SelectItem value="4h 45min">
                                    4h 45min
                                  </SelectItem>
                                  <SelectItem value="5 hours">
                                    5 hours
                                  </SelectItem>
                                  <SelectItem value="5h 15min">
                                    5h 15min
                                  </SelectItem>
                                  <SelectItem value="5h 30min">
                                    5h 30min
                                  </SelectItem>
                                  <SelectItem value="5h 45min">
                                    5h 45min
                                  </SelectItem>
                                  <SelectItem value="6 hours">
                                    6 hours
                                  </SelectItem>
                                  <SelectItem value="6h 15min">
                                    6h 15min
                                  </SelectItem>
                                  <SelectItem value="6h 30min">
                                    6h 30min
                                  </SelectItem>
                                  <SelectItem value="6h 45min">
                                    6h 45min
                                  </SelectItem>
                                  <SelectItem value="7 hours">
                                    7 hours
                                  </SelectItem>
                                  <SelectItem value="7h 15min">
                                    7h 15min
                                  </SelectItem>
                                  <SelectItem value="7h 30min">
                                    7h 30min
                                  </SelectItem>
                                  <SelectItem value="7h 45min">
                                    7h 45min
                                  </SelectItem>
                                  <SelectItem value="8 hours">
                                    8 hours
                                  </SelectItem>
                                  <SelectItem value="8h 15min">
                                    8h 15min
                                  </SelectItem>
                                  <SelectItem value="8h 30min">
                                    8h 30min
                                  </SelectItem>
                                  <SelectItem value="8h 45min">
                                    8h 45min
                                  </SelectItem>
                                  <SelectItem value="9 hours">
                                    9 hours
                                  </SelectItem>
                                  <SelectItem value="9h 15min">
                                    9h 15min
                                  </SelectItem>
                                  <SelectItem value="9h 30min">
                                    9h 30min
                                  </SelectItem>
                                  <SelectItem value="9h 45min">
                                    9h 45min
                                  </SelectItem>
                                  <SelectItem value="10 hours">
                                    10 hours
                                  </SelectItem>
                                  <SelectItem value="10h 15min">
                                    10h 15min
                                  </SelectItem>
                                  <SelectItem value="10h 30min">
                                    10h 30min
                                  </SelectItem>
                                  <SelectItem value="10h 45min">
                                    10h 45min
                                  </SelectItem>
                                  <SelectItem value="11 hours">
                                    11 hours
                                  </SelectItem>
                                  <SelectItem value="11h 15min">
                                    11h 15min
                                  </SelectItem>
                                  <SelectItem value="11h 30min">
                                    11h 30min
                                  </SelectItem>
                                  <SelectItem value="11h 45min">
                                    11h 45min
                                  </SelectItem>
                                  <SelectItem value="12 hours">
                                    12 hours
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="gap-4">
                <div className="space-y-2  w-full">
                  <div className="flex items-center gap-2  w-full">
                    <div className="flex flex-col space-y-2 w-full">
                      <FormField
                        name="price"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                disabled={isPending}
                                {...field}
                                id="price"
                                className="w-full"
                                type="number"
                                placeholder="Price"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="gap-4">
                <div className="space-y-2  w-full">
                  <div className="flex items-center gap-2  w-full">
                    <div className="flex flex-col space-y-2">
                      <FormField
                        name="currency"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select
                                disabled={isPending}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue
                                    className="w-full"
                                    placeholder="Currency"
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="USD">USD $</SelectItem>
                                  <SelectItem value="EUR">EUR €</SelectItem>
                                  <SelectItem value="RUB">RUBLE ₽</SelectItem>
                                  <SelectItem value="AMD">AMD Դ</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <FormSuccess message={success} />
              <FormError message={error} />
            </div>
          </CardContent>
          <CardFooter className="justify-end flex items-center gap-3 w-full">
            <Button
              className="w-full sm:w-auto"
              disabled={isPending}
              size="lg"
              type="submit"
            >
              {isPending ? (
                <BeatLoader
                  color={theme.resolvedTheme !== "dark" ? "white" : "black"}
                  size={10}
                />
              ) : (
                "Continue"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </div>
  );
}
