import { Agency } from '@prisma/client';

type AgencyCard = Pick<
  Agency,
  'title' | 'image' | 'location' | 'phone' | 'email'
>;

export default function AgencyCard({
  title,
  image,
  location,
  phone,
  email,
}: AgencyCard) {
  return (
    <div className="flex">
      <img src={image || undefined} alt="" />
      <div className="p-4">
        <p className="font-bold">{title}</p>
        <p>Địa chỉ: {location}</p>
        <p>Sđt: {phone}</p>
        <p>Email: {email}</p>
      </div>
    </div>
  );
}
