import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import prisma from '../lib/prisma';

export default async function FAQ() {
  const faqs = await prisma.faq.findMany();

  return (
    <>
      {faqs.length > 0 && (
        <Accordion type="single" collapsible className="bg-secondary px-6">
          {faqs.map((item, index) => (
            <AccordionItem
              className="py-2 last:border-b-0"
              key={index}
              value={`item${index}`}
            >
              <AccordionTrigger className="font-bold text-sm lg:text-base">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm lg:text-base">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  );
}
