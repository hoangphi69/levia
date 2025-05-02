import ImageListEdit from '@/app/(privated)/admin/_components/editable/image-list-edit';
import Header from '@/app/(privated)/admin/_components/layout/header';
import {
  getProductByID,
  updateProductImages,
  updateProductMedia,
  updateProductMetadata,
  updateProductReview,
} from '@/lib/actions/product';
import { Params } from '@/lib/definitions';
import ProductMediaEdit from './product-media-edit';
import ProductMetadataEdit from './product-meta-edit';
import ProductReviewEdit from './product-review-edit';

export default async function ProductEditPage({ params }: { params: Params }) {
  const { id } = await params;
  const product = await getProductByID(id);

  const header = {
    title: product?.title,
    breadcrumb: [
      {
        display: 'Trang chủ',
        href: '/admin',
      },
      {
        display: 'Sản phẩm',
        href: '/admin/products',
      },
      {
        display: product?.title,
        href: `/admin/products/${id}`,
      },
    ],
  };

  const meta = {
    model: product?.model!,
    title: product?.title!,
    category: product?.Category?.title || '',
    price: product?.price || undefined,
    description: product?.description || '',
  };

  const images = product?.images;

  const media = product?.media;

  const reviews = product?.reviews;

  // TODO: Create skeleton page for loading

  return (
    <>
      <Header title={header.title} list={header.breadcrumb} />
      <section className="gap-4 grid grid-cols-1 mx-auto p-4 container">
        {meta && (
          <ProductMetadataEdit
            title="Thông tin"
            description="Thông tin cơ bản của sản phẩm."
            initialMetadata={meta}
            updateMetadataAction={updateProductMetadata.bind(null, id)}
          />
        )}

        {images && (
          <ImageListEdit
            title={'Hình ảnh'}
            description={'Sản phẩm xịn sò với hình ảnh chất lượng.'}
            initialImages={images}
            updateImagesAction={updateProductImages.bind(null, id)}
          />
        )}

        {media && (
          <ProductMediaEdit
            title={'Media'}
            description={'Hình ảnh và sản phẩm từng góc độ.'}
            initialMedia={media}
            updateMediaAction={updateProductMedia.bind(null, id)}
          />
        )}

        {reviews && (
          <ProductReviewEdit
            title={'Review'}
            description={'Đánh giá và xếp hạng sản phẩm.'}
            initialReviews={reviews}
            updateReviewsAction={updateProductReview.bind(null, id)}
          />
        )}
      </section>
    </>
  );
}
