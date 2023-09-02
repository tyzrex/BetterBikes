import Link from "next/link";

interface Props {
  title: string;
  icon: JSX.Element;
}

export default function SmallCards(props: Props) {
  return (
    <>
      <article className="flex-col h-40 md:max-w-80 overflow-hidden rounded-lg  bg-secondary p-12 border-b-4 border-b-main-accent bg-gray-100 transition hover:shadow-lg hover:bg-main-foreground hover:text-white text-main-foreground sm:p-6 gap-2">
        <span className="inline-block rounded bg-accent p-1 sm:p-2 text-5xl">
          {props.icon}
        </span>

        <Link prefetch={false} href="#">
          <h3 className="mt-0.5 text-md md:text-lg font-semibold d">
            {props.title}
          </h3>
        </Link>
      </article>
    </>
  );
}
