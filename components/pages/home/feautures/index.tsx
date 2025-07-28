import React from "react";

type Props = {
  items: { title: string; description: string; icon: React.ReactNode }[];
};

export default function ServiceFeatures({ items }: Props) {
  return (
    <ul className="w-full sm:px-6 px-4 z-10 relative mt-5 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-primary">
      {items.map((service, index) => (
        <li
          key={index}
          className="flex flex-col items-center justify-center rounded-xl bg-accent/20 border border-accent px-2 py-2 gap-2 text-center"
        >
          <span className="border-2 border-accent bg-white dark:bg-background text-accent flex items-center justify-center rounded-full p-2 shadow-md">
            {service.icon}
          </span>
          <h4 className="text-base font-semibold tracking-tight">{service.title}</h4>
          <p className="text-xs text-muted-foreground">{service.description}</p>
        </li>
      ))}
    </ul>
  );
}