import { mdiGithub, mdiTwitter, mdiWeb, mdiLaptop } from "@mdi/js";
import { Icon } from "@mdi/react";

export default AboutView

function AboutView() {
  return (
    <section className="flex flex-col text-center select-none 
      h-[calc(100vh_-_4rem)] justify-center">
      <h1
        className="mb-4 text-5xl tracking-widest 
        font-extrabold [text-shadow:0_4px_8px_rgba(0,0,0,0.25)]">
          About
      </h1>
      <div
        className="
        bg-blue-500 text-white p-10 w-fit mx-auto 
        border-2 border-black shadow-xl 
        shadow-black rounded-xl">
        <h2 className="text-4xl font-extrabold mb-5">Jose M. Perez</h2>
        <p>
          <Icon className="inline mr-2" path={mdiWeb} size="1.5rem" />
          <Icon className="inline" path={mdiLaptop} size="1.5rem" />
        </p>
        <p className="italic text-2xl font-bold mb-3">
          <span>Web Developer</span>
        </p>
        <p className="italic font-bold text-sm mb-2">
          <a
            className="link"
            href="https://twitter.com/jmpevzla"
            rel="noopener noreferrer"
            target="_blank">
            <Icon className="inline" path={mdiTwitter} size="1.5rem" />
            <span>Twitter</span>
          </a>
        </p>
        <p className="italic font-bold text-sm">
          <a
            className="link"
            href="https://github.com/jmpevzla"
            rel="noopener noreferrer"
            target="_blank">
            <Icon className="inline" path={mdiGithub} size="1.5rem" />
            <span>Github</span>
          </a>
        </p>
      </div>
    </section>
  )
}