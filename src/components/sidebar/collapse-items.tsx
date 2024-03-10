'use client';
import React, { useState } from 'react';
import { ChevronUpIcon } from '../icons/sidebar/chevron-up-icon';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { CommonSvg } from '@/assets/CommonSvg';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';
interface Props {
  icon: React.ReactNode;
  title: string;
  items: { name: string; link: string }[];
}

export const CollapseItems = ({ icon, items, title }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathName = usePathname().split('/').slice(-1)[0];

  return (
    <div className="flex gap-4 h-full items-center cursor-pointer">
      <Accordion className="px-0">
        <AccordionItem
          indicator={<ChevronDownIcon className="text-black" />}
          classNames={{
            indicator: 'data-[open=true]:-rotate-180',
            trigger:
              'py-0 min-h-[44px] hover:bg-default-100 rounded-xl active:scale-[0.98] transition-transform pl-2',
            title:
              'px-0 flex text-base gap-2 h-full items-center cursor-pointer',
          }}
          aria-label="Accordion 1"
          title={
            <div className="flex flex-row gap-5 items-center">
              <span>{icon}</span>
              <span className="font-semibold">{title}</span>
            </div>
          }
        >
          <div className="pl-4 space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className={cn(
                  'flex gap-4 items-center px-4 py-2 rounded-sm scale-95 hover:scale-100 transition-all duration-150 ease-in-out cursor-pointer hover:bg-default-100 active:bg-default-200',
                  `/${pathName}` === item.link &&
                    'bg-backgroundChosen pointer-events-none',
                )}
                onClick={() => router.push(item.link)}
              >
                {CommonSvg.circle()}
                <span
                  className={cn(
                    'w-full flex text-description text-base font-medium hover:font-semibold',
                    `/${pathName}` === item.link &&
                      'text-textChosen font-semibold',
                  )}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
      {/* <Accordion
        title={
          <div
            className="flex items-center justify-between w-full py-5 px-7 rounded-8 transition-all duration-150 ease-in-out cursor-pointer hover:bg-accents2 active:scale-98"
            // css={{
            //   gap: "$6",
            //   width: "100%",
            //   py: "$5",
            //   px: "$7",
            //   borderRadius: "8px",
            //   transition: "all 0.15s ease",
            //   "&:active": {
            //     transform: "scale(0.98)",
            //   },
            //   "&:hover": {
            //     bg: "$accents2",
            //   },
            // }}
            // justify={"between"}
            onClick={handleToggle}
          >
            <div className="flex gap-4">
              {icon}
              <span
                className="text-default-900 font-medium text-base"
                //  span
                //  weight={"normal"}
                //  size={"$base"}
                //  css={{
                //    color: "$accents9",
                //  }}
              >
                {title}
              </span>
            </div>

            <ChevronUpIcon
              className={clsx(
                open ? "rotate-180" : "rotate-0",
                "transition-all duration-300 ease-in-out transform"
              )}
              //   css={{
              //     transition: "transform 0.3s ease",
              //     transform: open ? "rotate(-180deg)" : "rotate(0deg)",
              //   }}
            />
          </div>
        }
        //   css={{
        //     width: "100%",
        //     "& .nextui-collapse-view": {
        //       p: "0",
        //     },
        //     "& .nextui-collapse-content": {
        //       marginTop: "$1",
        //       padding: "0px",
        //     },
        //   }}
        divider={false}
        showArrow={false}
      >
        {items.map((item, index) => (
          <div
            className="flex flex-col pl-8"
            key={index}
            // direction={"column"}
            // css={{
            //   paddingLeft: "$16",
            // }}
          >
            <span
              className="text-default-400 font-normal text-md"
              //   span
              //   weight={"normal"}
              //   size={"$md"}
              //   css={{
              //     color: "$accents8",
              //     cursor: "pointer",
              //     "&:hover": {
              //       color: "$accents9",
              //     },
              //   }}
            >
              {item}
            </span>
          </div>
        ))}
      </Accordion> */}
    </div>
  );
};
