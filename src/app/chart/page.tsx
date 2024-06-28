"use client";

import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { Chart } from "@/src/components/Chart";
import { IFavourite } from "@/src/models/favourite.interface";
import { FavouriteService } from "@/src/services/favourites.service";

export default function Home() {
  const [favourites, setFavourites] = useState<IFavourite[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAppointments = async () => {
      const favourites = await FavouriteService.getAllFavourites();
      setLoading(false);
      setFavourites(favourites);
      console.log(favourites);
    };

    getAppointments();

  }, []);
  return <div style={{}}>{loading ? <Title>Loading</Title> : <Chart favourites={favourites}></Chart>}</div>;
}