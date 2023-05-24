import React from 'react'

const Footer = () => {
  return (
    <a
      href="https://www.themoviedb.org/"
      target="_blank"
      className="w-full my-4 flex flex-col justify-center items-center"
    >
      <p className="mb-2 text-xs tracking-widest text-[#6b7dab]">Powered by</p>
      <img
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
        className="w-1/4"
      />
    </a>
  );
}

export default Footer