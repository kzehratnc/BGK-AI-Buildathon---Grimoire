"use client";

import Map from "@/components/Map";
import XPBar from "@/components/XPBar";
import Inventory from "@/components/Inventory";

export default function MapPage() {
  return (
    <>
      <Map mode="page" />
      <XPBar />
      <Inventory />
    </>
  );
}