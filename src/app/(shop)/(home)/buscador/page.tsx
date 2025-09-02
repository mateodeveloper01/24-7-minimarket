
import { Suspense } from "react";
import SearchBar from "@/components/search/SearchBar";

function SearchBarFallback() {
  return <>placeholder</>;
}

export default function SearchPage() {
  return (
    <>
      <Suspense fallback={<SearchBarFallback />}>
        <SearchBar />
      </Suspense>
    </>
  );
}
