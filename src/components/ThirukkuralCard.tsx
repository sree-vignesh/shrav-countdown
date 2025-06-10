"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function ScrapedCard() {
  const [data, setData] = useState<{
    kuralNo: string;
    kural: string;
    kuralMeaning: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/scrape/route")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="w-full max-w-2xl mb-10">
      <Card className="bg-white/90 dark:bg-purple-950/10 dark:border dark:border-pink-900 backdrop-blur shadow-2xl rounded-xl">
        {/* // <Card className="bg-background text-foreground shadow-md p-4 max-w-md"> */}

        <CardHeader>
          {data ? (
            <h3 className="text-xl font-semibold">{data.kuralNo}</h3>
          ) : (
            <p></p>
          )}
        </CardHeader>
        <CardContent>
          {data ? (
            <div className="space-y-1 text-1xl font-bold">
              {/* <p className="font-medium">{data.kuralNo}</p> */}
              <p className=" text-primary dark:text-primary">{data.kural}</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Loading...</p>
          )}
        </CardContent>
        <CardFooter>
          {data ? <p className="font-medium">{data.kuralMeaning}</p> : <p></p>}
        </CardFooter>
      </Card>
    </div>
  );
}
