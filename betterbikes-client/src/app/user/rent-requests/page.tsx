import { getMyBookingRequests } from "@/api/dashboard";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Session, getServerSession } from "next-auth";
import BookingTable from "./_components/BookingTable";
import { Suspense } from "react";

interface ISearchProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function RentRequests({ searchParams }: ISearchProps) {
  const params = searchParams;
  const session = await getServerSession(options);

  const data = await getMyBookingRequests(params ?? {}, session as Session);

  return (
    <section className="w-full">
      <Suspense fallback={<>Loading....</>}>
        <BookingTable data={data} searchParams={params} />
      </Suspense>
    </section>
  );
}
