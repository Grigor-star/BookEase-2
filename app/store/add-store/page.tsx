"use client";
import { createStore } from "@/actions/store";
import { validateAddress } from "@/actions/validate";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { AddStoreForm } from "@/components/store/add-store-form";
import EmbeddedMap from "@/components/store/embed-map";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formattedAddress, storeAddress, storeSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function AddStorePage() {
  const [page, setPage] = useState<number>(1);
  const [validationResult, setValidationResult] = useState<any>(null);
  const [finalAddress, setFinalAddress] = useState<string>("");
  const [formatted, setFormatted] = useState<boolean>(true);
  const [enteredAddress, setEnteredAddress] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [storeError, setStoreError] = useState<string | undefined>();
  const [storeSuccess, setStoreSuccess] = useState<string | undefined>();

  const form1 = useForm<z.infer<typeof storeSchema>>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      storeName: "",
      category: "",
      description: "",
    },
  });

  const form2 = useForm<z.infer<typeof storeAddress>>({
    resolver: zodResolver(storeAddress),
    defaultValues: {
      country: "",
      streetAddress: "",
      state: "",
      city: "",
      zipCode: "",
    },
  });

  const onSubmit3 = async () => {
    const values = {
      storeName: form1.getValues("storeName"),
      category: form1.getValues("category"),
      description: form1.getValues("description"),
    };
    setStoreError("");
    setStoreError("");
    await createStore(values, finalAddress).then((data) => {
      if (data.error) {
        setStoreError(data.error);
      }
      if (data.success) {
        setStoreSuccess(data.success);
      }
    });
  };

  const onSubmit = (values: z.infer<typeof storeSchema>) => {
    setPage(page + 1);
    console.log(values);
  };

  const onSubmit2 = async (values: z.infer<typeof storeAddress>) => {
    const result = await validateAddress(
      values.streetAddress,
      values.country,
      values.city,
      values.state,
      values.zipCode
    );
    const address =
      values.streetAddress +
      " , " +
      values.zipCode +
      " " +
      values.city +
      " " +
      values.state +
      " , " +
      values.country;

    setEnteredAddress(address);
    if (result) {
      setValidationResult(result);
      console.log(result);
      setPage(page + 1);
      setError(null);
    } else {
      setError("Failed to validate address");
      setValidationResult(null);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <AddStoreForm page={page}>
        {page === 1 && (
          <div className="flex flex-col space-y-3">
            <Form {...form1}>
              <form
                onSubmit={form1.handleSubmit(onSubmit)}
                className="flex flex-col space-y-4"
              >
                <div className=" w-full flex space-x-2 items-center justify-center">
                  <FormField
                    control={form1.control}
                    name="storeName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            className="w-full"
                            placeholder="Store Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form1.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue
                                {...field}
                                placeholder="Select the category"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">
                                  Blueberry
                                </SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">
                                  Pineapple
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form1.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={4}
                          placeholder="Description"
                        ></Textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col w-full items-center space-y-2">
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                  <Button
                    disabled={page === 1}
                    variant="outline"
                    className="w-full"
                    onClick={() => setPage(page - 1)}
                  >
                    Back
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
        {page === 2 && (
          <div>
            <Form {...form2}>
              <form
                onSubmit={form2.handleSubmit(onSubmit2)}
                className="flex flex-col space-y-4"
              >
                <FormField
                  control={form2.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex space-x-2 items-center justify-center">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select the country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="AR">🇦🇷 Argentina</SelectItem>
                                <SelectItem value="AU">🇦🇺 Australia</SelectItem>
                                <SelectItem value="AT">🇦🇹 Austria</SelectItem>
                                <SelectItem value="BE">🇧🇪 Belgium</SelectItem>
                                <SelectItem value="BR">🇧🇷 Brazil</SelectItem>
                                <SelectItem value="BG">🇧🇬 Bulgaria</SelectItem>
                                <SelectItem value="CA">🇨🇦 Canada</SelectItem>
                                <SelectItem value="CL">🇨🇱 Chile</SelectItem>
                                <SelectItem value="CO">🇨🇴 Colombia</SelectItem>
                                <SelectItem value="HR">🇭🇷 Croatia</SelectItem>
                                <SelectItem value="CZ">🇨🇿 Czechia</SelectItem>
                                <SelectItem value="DK">🇩🇰 Denmark</SelectItem>
                                <SelectItem value="EE">🇪🇪 Estonia</SelectItem>
                                <SelectItem value="FI">🇫🇮 Finland</SelectItem>
                                <SelectItem value="FR">🇫🇷 France</SelectItem>
                                <SelectItem value="DE">🇩🇪 Germany</SelectItem>
                                <SelectItem value="HU">🇭🇺 Hungary</SelectItem>
                                <SelectItem value="IE">🇮🇪 Ireland</SelectItem>
                                <SelectItem value="IT">🇮🇹 Italy</SelectItem>
                                <SelectItem value="LV">🇱🇻 Latvia</SelectItem>
                                <SelectItem value="LT">🇱🇹 Lithuania</SelectItem>
                                <SelectItem value="LU">
                                  🇱🇺 Luxembourg
                                </SelectItem>
                                <SelectItem value="MY">🇲🇾 Malaysia</SelectItem>
                                <SelectItem value="MX">🇲🇽 Mexico</SelectItem>
                                <SelectItem value="NL">
                                  🇳🇱 Netherlands
                                </SelectItem>
                                <SelectItem value="NO">🇳🇴 Norway</SelectItem>
                                <SelectItem value="NZ">
                                  🇳🇿 New Zealand
                                </SelectItem>
                                <SelectItem value="PL">🇵🇱 Poland</SelectItem>
                                <SelectItem value="PT">🇵🇹 Portugal</SelectItem>
                                <SelectItem value="PR">
                                  🇵🇷 Puerto Rico
                                </SelectItem>
                                <SelectItem value="SG">🇸🇬 Singapore</SelectItem>
                                <SelectItem value="SK">🇸🇰 Slovakia</SelectItem>
                                <SelectItem value="SI">🇸🇮 Slovenia</SelectItem>
                                <SelectItem value="ES">🇪🇸 Spain</SelectItem>
                                <SelectItem value="SE">🇸🇪 Sweden</SelectItem>
                                <SelectItem value="CH">
                                  🇨🇭 Switzerland
                                </SelectItem>
                                <SelectItem value="GB">
                                  🇬🇧 United Kingdom
                                </SelectItem>
                                <SelectItem value="US">
                                  🇺🇸 United States
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex space-x-2 items-center justify-center">
                  <FormField
                    control={form2.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full"
                            type="text"
                            placeholder="State / Province"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form2.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full"
                            type="text"
                            placeholder="City"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex space-x-2 items-center">
                  <FormField
                    control={form2.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem className="w-[50%]">
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full"
                            placeholder="ZIP Code"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form2.control}
                    name="streetAddress"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full"
                            type="text"
                            placeholder="Street Address"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col w-full items-center space-y-2">
                  <Button type="submit" className="w-full">
                    Check
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setPage(page - 1)}
                  >
                    Back
                  </Button>
                </div>
              </form>
            </Form>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        )}
        {page === 3 && (
          <div className="flex flex-col space-y-3">
            <Alert
              onClick={() => {
                setFinalAddress(enteredAddress);
                setFormatted(false);
              }}
              className={`cursor-pointer group hover:bg-slate-300/20 ${
                !formatted && "border-blue-600"
              }  hover:border-blue-600`}
            >
              <AlertTitle
                className={`group-hover:text-blue-600 ${
                  !formatted && "text-blue-600"
                }`}
              >
                What you entered
              </AlertTitle>
              <AlertDescription>
                {'"'}
                {enteredAddress}
                {'"'}
              </AlertDescription>
            </Alert>
            <Alert
              onClick={() => {
                setFinalAddress(validationResult.formattedAddress);
                setFormatted(true);
              }}
              className={`m-0 p-0 cursor-pointer group hover:bg-slate-300/20 ${
                formatted && "border-blue-600"
              } hover:border-blue-600`}
            >
              <div className="p-4">
                <AlertTitle
                  className={`group-hover:text-blue-600 ${
                    formatted && "text-blue-600"
                  }`}
                >
                  Recomended
                </AlertTitle>
                <AlertDescription>
                  {JSON.stringify(validationResult.formattedAddress)}
                </AlertDescription>
              </div>
              <hr
                className={`group-hover:border-blue-600 ${
                  formatted && "border-blue-600"
                }`}
              />
              <EmbeddedMap
                width="100%"
                height="250px"
                address={JSON.stringify(validationResult)}
              />
            </Alert>
            <Button onClick={() => setPage(page + 1)}>Confirm</Button>
            <Button
              variant="outline"
              onClick={() => setPage(page - 1)}
              className="w-full"
            >
              Go Back
            </Button>
          </div>
        )}
        {page === 4 && (
          <div className="flex flex-col space-y-3">
            <div className=" w-full flex space-x-2 items-center justify-center">
              <div className="w-full">
                <h6 className="pl-1 text-[14px] mb-1 opacity-80 font-medium">
                  Store Name
                </h6>
                <Input
                  className="w-full"
                  value={form1.getValues("storeName")}
                  placeholder="Store Name"
                />
              </div>
              <div className="w-full">
                <h1 className="pl-1 text-[14px] mb-1 opacity-80 font-medium">
                  Category
                </h1>
                <Select value={form1.getValues("category")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select the category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem disabled value="apple">
                        Apple
                      </SelectItem>
                      <SelectItem disabled value="banana">
                        Banana
                      </SelectItem>
                      <SelectItem disabled value="blueberry">
                        Blueberry
                      </SelectItem>
                      <SelectItem disabled value="grapes">
                        Grapes
                      </SelectItem>
                      <SelectItem disabled value="pineapple">
                        Pineapple
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="w-full">
              <h1 className="pl-1 text-[14px] mb-1 opacity-80 font-medium">
                Description
              </h1>
              <Textarea
                value={form1.getValues("description")}
                rows={4}
                placeholder="Description"
              ></Textarea>
            </div>
            <Alert className="m-0 p-0">
              <div className="p-4">
                <AlertTitle>Address</AlertTitle>
                <AlertDescription>
                  {JSON.stringify(validationResult.formattedAddress)}
                </AlertDescription>
              </div>
              <hr className=" group-hover:border-blue-600" />
              {formatted && (
                <EmbeddedMap
                  width="100%"
                  height="250px"
                  address={JSON.stringify(validationResult)}
                />
              )}
            </Alert>
            <FormError message={storeError} />
            <FormSuccess message={storeSuccess} />
            <Button onClick={() => onSubmit3()} className="w-full">
              Create Store
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage(page - 1)}
              className="w-full"
            >
              Go Back
            </Button>
          </div>
        )}
      </AddStoreForm>
    </div>
  );
}
