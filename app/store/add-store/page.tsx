"use client";
import { createStore } from "@/actions/store";
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
import axios from "axios";
import { useTheme } from "next-themes";
import { ChangeEvent, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import BeatLoader from "react-spinners/BeatLoader";
import * as z from "zod";

export default function AddStorePage() {
  const [page, setPage] = useState<number>(1);
  const [validationResult, setValidationResult] = useState<any>(null);
  const [finalAddress, setFinalAddress] = useState<string>("");
  const [formatted, setFormatted] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const [storeError, setStoreError] = useState<string | undefined>();
  const [storeSuccess, setStoreSuccess] = useState<string | undefined>();
  const [isPedning, startTransition] = useTransition();

  interface Prediction {
    place_id: string;
    description: string;
  }

  interface AddressDetails {
    [key: string]: any;
  }

  const [input, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Prediction[]>([]);
  const [address, setAddress] = useState<AddressDetails | null>(null);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value.length > 2) {
      try {
        const response = await axios.get<Prediction[]>("/api/autocomplete", {
          params: { input: value },
        });
        setSuggestions(response.data);
      } catch (error: any) {
        setError(error.response ? error.response.data.error : error.message);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = async (
    placeId: string,
    description: string
  ) => {
    startTransition(async () => {
      try {
        const response = await axios.get<AddressDetails>("/api/placeDetails", {
          params: { placeId },
        });
        setAddress(response.data);
        setValidationResult(response.data);
        setFinalAddress(description);
        setError(null);
        setSuggestions([]);
        setInput("");
      } catch (error: any) {
        setError(error.response ? error.response.data.error : error.message);
        setAddress(null);
      }
    });
  };

  const form1 = useForm<z.infer<typeof storeSchema>>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      storeName: "",
      category: "",
      description: "",
    },
  });

  const onSubmit3 = async () => {
    startTransition(async () => {
      const values = {
        storeName: form1.getValues("storeName"),
        category: form1.getValues("category"),
        description: form1.getValues("description"),
      };
      setStoreError("");
      setStoreSuccess("");
      await createStore(values, finalAddress).then((data) => {
        if (data.error) {
          setStoreError(data.error);
        }
        if (data.success) {
          setStoreSuccess(data.success);
        }
      });
    });
  };

  const onSubmit = () => {
    setPage(page + 1);
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
                <div className=" w-full flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-2 items-center justify-center">
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
          <div className="flex flex-col space-y-2">
            <div>
              <Input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Enter address"
              />

              {suggestions.length > 0 && (
                <div className="border rounded p-2">
                  <h1 className="text-[12px] font-medium opacity-55">
                    Sugesstions
                  </h1>
                  <ul className="mt-2">
                    {suggestions.map((suggestion) => (
                      <li
                        className="w-full hover:bg-slate-300/40 cursor-pointer py-1 rounded"
                        key={suggestion.place_id}
                        onClick={() =>
                          handleSelectSuggestion(
                            suggestion.place_id,
                            suggestion.description
                          )
                        }
                      >
                        <p className="px-2">{suggestion.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-5">
                {isPedning ? (
                  <BeatLoader
                    color={theme.resolvedTheme !== "dark" ? "white" : "black"}
                    size={10}
                  />
                ) : (
                  <EmbeddedMap
                    address={JSON.stringify(address)}
                    width="100%"
                    height="250px"
                  />
                )}
              </div>

              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
            <div className="space-y-2">
              <Button
                disabled={isPedning}
                className="w-full"
                onClick={() => setPage(page + 1)}
              >
                {isPedning ? (
                  <BeatLoader
                    color={theme.resolvedTheme !== "dark" ? "white" : "black"}
                    size={10}
                  />
                ) : (
                  "Confirm"
                )}
              </Button>
              <Button
                disabled={isPedning}
                variant="outline"
                onClick={() => setPage(page - 1)}
                className="w-full"
              >
                Go Back
              </Button>
            </div>
          </div>
        )}
        {page === 3 && (
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
                <AlertDescription>{finalAddress}</AlertDescription>
              </div>
              <hr className=" group-hover:border-blue-600" />

              <EmbeddedMap
                width="100%"
                height="250px"
                address={JSON.stringify(validationResult)}
              />
            </Alert>
            <FormError message={storeError} />
            <FormSuccess message={storeSuccess} />
            <Button
              disabled={isPedning}
              onClick={() => onSubmit3()}
              className="w-full"
            >
              {isPedning ? (
                <BeatLoader
                  color={theme.resolvedTheme !== "dark" ? "white" : "black"}
                  size={10}
                />
              ) : (
                "Create Store"
              )}
            </Button>
            <Button
              disabled={isPedning}
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
