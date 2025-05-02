import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/avatar';
import { getCurrentUser } from '@/lib/dal';

export default async function User() {
  const user = await getCurrentUser();

  return (
    <>
      <Avatar className="size-7">
        <AvatarImage src="https://picsum.photos/32" />
        <AvatarFallback>
          {user?.role === 'admin'
            ? 'AD'
            : user?.role === 'editor'
            ? 'ED'
            : 'VI'}
        </AvatarFallback>
      </Avatar>
      <span className="truncate">@{user?.name}</span>
    </>
  );
}
