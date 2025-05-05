'use client';

import { Button } from '@/components/shadcn/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn/form';
import { Input } from '@/components/shadcn/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/select';
import { getCategoryTitles } from '@/actions/category';
import { createProduct } from '@/actions/product';
import { ProductAddFormSchema } from '@/lib/definitions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function ProductAddModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, setCategories] = useState<string[]>([]);
  const router = useRouter();
  const form = useForm<z.infer<typeof ProductAddFormSchema>>({
    resolver: zodResolver(ProductAddFormSchema),
    defaultValues: {
      model: '',
      title: '',
      category: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof ProductAddFormSchema>) => {
    try {
      const { model, title, category } = values;
      const id = await createProduct(model, title, category);
      toast.success('Đã thêm sản phẩm.');
      router.push(`/admin/products/${id}`);
    } catch (error) {
      toast.error('Thêm sản phẩm không thành công.');
    }
  };

  useEffect(() => {
    const getCategoryOptions = async () => {
      const data = await getCategoryTitles();
      const options = data.map((category) => category.title);
      setCategories(options);
    };
    getCategoryOptions();
  }, []);

  return (
    <Dialog onOpenChange={(open) => open && form.reset()}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tạo sản phẩm mới</DialogTitle>
          <DialogDescription>
            Cung cấp thông tin cơ bản để tạo sản phẩm.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="product-add"
            onSubmit={form.handleSubmit(onSubmit)}
            className=""
          >
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                  <FormLabel className="w-28 text-muted-foreground">
                    Model:{' '}
                  </FormLabel>
                  <FormControl>
                    <div className="flex-1">
                      <Input
                        className="flex-1 !mt-0 max-w-prose !text-base"
                        placeholder="LV6969"
                        {...field}
                      />
                      <FormMessage className="mt-2" />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                  <FormLabel className="w-28 text-muted-foreground">
                    Tên sản phẩm:{' '}
                  </FormLabel>
                  <FormControl>
                    <div className="flex-1">
                      <Input
                        className="flex-1 !mt-0 max-w-prose !text-base"
                        placeholder="Bếp từ đơn âm LV6969"
                        {...field}
                      />
                      <FormMessage className="mt-2" />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                  <FormLabel className="w-28 text-muted-foreground">
                    Danh mục:{' '}
                  </FormLabel>
                  <FormControl>
                    <div className="flex-1">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="flex-1 !mt-0 max-w-prose !text-base">
                            <SelectValue placeholder="Chọn phân loại" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category, index) => (
                            <SelectItem key={index} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="!mt-0" />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>Huỷ</Button>
          </DialogClose>
          <Button form="product-add" type="submit">
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
