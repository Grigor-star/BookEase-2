import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { CardContent } from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-6 mt-[80px]">
      <section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSignIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                +0% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Subscriptions
              </CardTitle>
              <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+0</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCardIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+0</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                +0% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <ActivityIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+0</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                +0 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      <section>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Invoices
            </CardTitle>
            <Link href="/invoices">
              <Button size="sm" variant="outline">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>$250.00</TableCell>
                  <TableCell className="text-right">Credit Card</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV002</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell>$150.00</TableCell>
                  <TableCell className="text-right">PayPal</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV003</TableCell>
                  <TableCell>Unpaid</TableCell>
                  <TableCell>$350.00</TableCell>
                  <TableCell className="text-right">Bank Transfer</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV004</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>$450.00</TableCell>
                  <TableCell className="text-right">Credit Card</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV005</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>$550.00</TableCell>
                  <TableCell className="text-right">PayPal</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
      <section>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Our Services</CardTitle>
            <Button size="sm" variant="outline">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div className="bg-gray-100 dark:bg-gray-800/35 rounded-lg p-4 flex flex-col gap-2">
                <BrushIcon className="w-8 h-8 text-primary" />
                <h3 className="text-lg font-semibold">Graphic Design</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Professional graphic design services.
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800/35 rounded-lg p-4 flex flex-col gap-2">
                <CodeIcon className="w-8 h-8 text-primary" />
                <h3 className="text-lg font-semibold">Web Development</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Custom web development solutions.
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800/35 rounded-lg p-4 flex flex-col gap-2">
                <VideoIcon className="w-8 h-8 text-primary" />
                <h3 className="text-lg font-semibold">Video Production</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  High-quality video production services.
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800/35 rounded-lg p-4 flex flex-col gap-2">
                <MegaphoneIcon className="w-8 h-8 text-primary" />
                <h3 className="text-lg font-semibold">Digital Marketing</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Effective digital marketing strategies.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      <section>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Our Products</CardTitle>
            <Button size="sm" variant="outline">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div className="bg-gray-100 dark:bg-gray-800/35 rounded-lg p-4 flex flex-col gap-2">
                <Image
                  alt="Product 1"
                  className="rounded-lg object-cover"
                  height={100}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "100/100",
                    objectFit: "cover",
                  }}
                  width={100}
                />
                <h3 className="text-lg font-semibold">Product 1</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Description of Product 1.
                </p>
                <div className="font-semibold">$99.99</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800/35 rounded-lg p-4 flex flex-col gap-2">
                <Image
                  alt="Product 2"
                  className="rounded-lg object-cover"
                  height={100}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "100/100",
                    objectFit: "cover",
                  }}
                  width={100}
                />
                <img />
                <h3 className="text-lg font-semibold">Product 2</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Description of Product 2.
                </p>
                <div className="font-semibold">$49.99</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800/35 rounded-lg p-4 flex flex-col gap-2">
                <Image
                  alt="Product 3"
                  className="rounded-lg object-cover"
                  height={100}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "100/100",
                    objectFit: "cover",
                  }}
                  width={100}
                />
                <h3 className="text-lg font-semibold">Product 3</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Description of Product 3.
                </p>
                <div className="font-semibold">$79.99</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800/35 rounded-lg p-4 flex flex-col gap-2" />
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function ActivityIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  );
}

function BrushIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
      <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" />
    </svg>
  );
}

function CodeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function CreditCardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function DollarSignIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function MegaphoneIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function VideoIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}
