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
        <Accordion type="single" collapsible className="px-4 border">
          {faqs.map((item, index) => (
            <AccordionItem key={index} value={`item${index}`}>
              <AccordionTrigger className="font-bold">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  );
}
