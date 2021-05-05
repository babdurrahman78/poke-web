import Link from "next/link";
import Image from "next/image";
import { css } from "@emotion/react";
import { Navbar } from "reactstrap";

const Topbar = () => {
  return (
    <div>
      <Navbar
        css={css`
          background-image: linear-gradient(
            135deg,
            #2afadf 10%,
            #4c83ff 100%
          ) !important;
          height: 60px;
        `}
        color="light"
        light
        expand="md"
      >
        <Link href="/">
          <a>
            <Image
              src="/pokemon-logo.png"
              alt="pokemon-logo"
              width={100}
              height={35}
            />
          </a>
        </Link>
        <Link href="/mypokemon">
          <a
            css={css`
              position: absolute;
              right: 20px;
            `}
          >
            <Image
              src="/pokemon-navbar.png"
              alt="my pokemons list button"
              width={40}
              height={40}
            />
          </a>
        </Link>
      </Navbar>
    </div>
  );
};

export default Topbar;
