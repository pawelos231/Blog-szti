import * as React from "react";
import Link from "next/link";
const NoPage = () => {
  return (
    <div className="flex justify-center w-screen h-screen items-center flex-col gap-3">
      <h1 className="text-4xl mb-10">Ups!</h1>
      <p>
        Dotarłeś do nieodkrytych zakątków tego bloga, powróc na stronę główną:
      </p>
      <Link href={"/"}>
        <a className="text-blue-700">Powrót do strony głównej</a>
      </Link>
    </div>
  );
};

export default NoPage;
