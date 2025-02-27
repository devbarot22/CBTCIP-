import Image from "next/image";
import React from "react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import Collection from '@/components/shared/Collection'
import { getAllEvents } from "@/lib/actions/event.actions";
import Search from "@/components/shared/Search";
import { SearchParamProps } from "@/types";
import CategoryFilter from "@/components/shared/CategoryFilter"

export default  async function Home({ searchParams}: SearchParamProps) {



  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const events = await getAllEvents({
    query: '',
    category,
    page,
    limit: 6
  });

  console.log(events)


  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Tame Management Chaos. We&apos;ve Got Your Back</h1>
            <p className="p-regular-20 md:p-regular-24">Events got you stressed? We co-op the chaos. Our platform empowers seamless planning, leaving you free to focus on creating unforgettable experiences.</p>
            <Button className="button w-full sm:w-fit" size="lg" asChild>
              <Link href="#events">
                Check It Out
              </Link>
            </Button>
          </div>
          <Image src="/assets/images/hero.png" alt="hero" width={1000} height={1000} className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]" />
        </div>
      </section>
      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold ">Your Trust Our Tools <br /><br /> Events To Explore</h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>
        <Collection 
        data={events?.data}
        emptyTitle="No Events Found"
        emptyStateSubtext="Come back later"
        collectionType="All_Events"
        limit={6}
        page={page}
        totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}