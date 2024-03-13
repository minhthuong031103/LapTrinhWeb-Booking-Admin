import { useAuth } from '@/hooks/useAuth';
import { KEY_CONTEXT } from '@/lib/constant';
import { Avatar } from '@nextui-org/react';
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { CiLogout } from 'react-icons/ci';

const InfoUser = () => {
  const { onLogout } = useAuth();
  const user = JSON.parse(localStorage.getItem(KEY_CONTEXT.USER) as any);
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="bg-darkGray rounded-sm flex min-w-[200px] h-fit px-2 py-1 items-center justify-end gap-3 cursor-pointer hover:bg-darkGray/50">
          <div className="flex flex-col items-end text-white text-xs font-medium">
            <p>{user?.name ? user?.name : 'USER'}</p>
            <p>{user?.roleName ? user?.roleName : 'Moderator'}</p>
          </div>
          <Avatar
            className="border-2 rounded-full"
            size="sm"
            showFallback
            name={user?.name ? user?.name : 'USER'}
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="logout"
          endContent={<CiLogout className="text-danger" />}
          onPress={() => onLogout()}
        >
          <p className="font-medium text-sm text-danger">Đăng xuất</p>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default InfoUser;
