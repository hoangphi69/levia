'use client';

import { getCategoryTitles } from '@/lib/actions/category';
import { ProductMetadataFormSchema, ProductMetadata } from '@/lib/definitions';
import { formattedPrice } from '@/lib/utils/format';
import { Button } from '@/components/shadcn/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
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
import { Textarea } from '@/components/shadcn/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, LoaderCircle, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import CurrencyInput from './currency-input';
import { checkProductExistedByModel } from '@/lib/actions/product';
import _ from 'lodash';

export default function ProductMetadataEdit({
  title,
  description,
  initialMetadata,
  updateMetadataAction,
}: {
  title: React.ReactNode;
  description: React.ReactNode;
  initialMetadata: ProductMetadata;
  updateMetadataAction: (metadata: ProductMetadata) => Promise<void>;
}) {
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [savedMetadata, setSavedMetadata] = useState(initialMetadata);
  const [categories, setCategories] = useState<string[]>([]);

  const form = useForm<z.infer<typeof ProductMetadataFormSchema>>({
    resolver: zodResolver(ProductMetadataFormSchema),
    defaultValues: {
      model: initialMetadata.model,
      title: initialMetadata.title,
      category: initialMetadata.category,
      price: initialMetadata.price,
      description: initialMetadata.description,
    },
  });

  const watchedValues = form.watch();

  useEffect(() => {
    const getCategoryOptions = async () => {
      const data = await getCategoryTitles();
      const options = data.map((category) => category.title);
      setCategories(options);
    };
    getCategoryOptions();
  }, []);

  useEffect(() => {
    watchedValues.price = Number(watchedValues.price?.toString());
    savedMetadata.price = Number(savedMetadata.price?.toString());
    const hasChanged = !_.isEqual(watchedValues, savedMetadata);
    setIsChanged(hasChanged);
  }, [watchedValues, savedMetadata]);

  const resetToDefault = () => {
    form.reset(savedMetadata);
    setIsChanged(false);
  };

  const onSubmit = async (
    updatedMetadata: z.infer<typeof ProductMetadataFormSchema>
  ) => {
    try {
      setIsLoading(true);

      // Check if model existed in database
      const modelChanged = updatedMetadata.model !== savedMetadata.model;
      if (modelChanged) {
        const existed = await checkProductExistedByModel(updatedMetadata.model);
        if (existed) {
          form.setError('model', {
            type: 'custom',
            message: 'Model đã tồn tại.',
          });

          setIsLoading(false);
          return;
        }
      }

      await updateMetadataAction(updatedMetadata);

      setSavedMetadata(updatedMetadata);
      setIsLoading(false);

      toast.success('Đã lưu thay đổi.');
    } catch (error) {
      console.error(`Product meta edit: ${error}`);
      toast.error('Cập nhật thông tin sản phẩm không thành công.');
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-end gap-4">
        <div className="flex-1">
          <CardTitle>
            <h2 className="font-bold text-xl">{title}</h2>
          </CardTitle>
          <CardDescription className="mt-2">{description}</CardDescription>
        </div>
        {isChanged && (
          <div className="flex flex-row gap-4">
            {!isLoading && (
              <Button variant={'outline'} onClick={resetToDefault}>
                <RotateCcw />
                <span>Đặt lại</span>
              </Button>
            )}
            <Button
              type="submit"
              form="product-metadata-edit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin" />
                  <span>Đang lưu</span>
                </>
              ) : (
                <>
                  <Check />
                  <span>Lưu thay đổi</span>
                </>
              )}
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            id="product-metadata-edit"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
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
                    <Input
                      className="flex-1 !mt-0 max-w-prose !text-base"
                      placeholder="LV6969"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="!mt-0" />
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
                    <Input
                      className="flex-1 !mt-0 max-w-prose !text-base"
                      placeholder="Bếp từ đơn âm LV6969"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="!mt-0" />
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
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                  <FormLabel className="w-28 text-muted-foreground">
                    Giá tiền:{' '}
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex-1 !mt-0 max-w-prose">
                      <CurrencyInput
                        value={
                          field.value
                            ? formattedPrice(field.value)
                                .replace('₫', '')
                                .trim()
                            : ''
                        }
                        onChange={field.onChange}
                        placeholder="6.900.000"
                        className="!text-base"
                      />
                      <span className="top-1/2 right-4 absolute text-muted-foreground text-sm -translate-y-1/2 select-none">
                        đ
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage className="!mt-0" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex gap-4">
                  <FormLabel className="pt-3 w-28 text-muted-foreground">
                    Mô tả:{' '}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="flex-1 !mt-0 max-w-prose h-32 !text-base"
                      placeholder="Sản phẩm độc đáo, có 102."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="!mt-0" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
