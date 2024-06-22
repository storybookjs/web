import { Avatar, type sizes } from '../avatar';

interface AvatarListProps {
  isLoading: boolean;
  users: {
    id: string;
    name?: string;
    avatarUrl?: string;
  }[];
  userCount?: number;
  size?: keyof typeof sizes;
}

// @ts-expect-error - Temporary component
const UserAvatar = (props) => <Avatar {...props} />;
// box-shadow: ${color.lightest} 0 0 0 2px;
// display: block;

// @ts-expect-error - Temporary component
const UserEllipses = (props) => <li {...props} />;
// display: inline-flex;
// font-size: ${typography.size.s1}px;
// color: ${color.mediumdark};
// margin-left: 6px;
// white-space: nowrap;

// @ts-expect-error - Temporary component
const User = (props) => <li {...props} />;
// display: inline-flex;

// @ts-expect-error - Temporary component
const Users = (props) => <ul {...props} />;
// display: inline-flex;
// flex-wrap: nowrap;
// flex-direction: row;
// align-items: center;
// justify-content: flex-end;
// vertical-align: top;
// margin: 0;
// padding: 0;
// list-style: none;

// ${User} {
//   position: relative;

//   &:not(:first-child) {
//     margin-left: -6px;
//   }
//   &:nth-child(1) {
//     z-index: 3;
//   }
//   &:nth-child(2) {
//     z-index: 2;
//   }
//   &:nth-child(3) {
//     z-index: 1;
//   }
// }

// Either pass the full list of users, or a userCount if known
export const AvatarList = ({
  isLoading = false,
  users = [
    { id: 'loading', name: 'loading' },
    { id: 'loading2', name: 'loading' },
    { id: 'loading3', name: 'loading' },
  ],
  userCount,
  size = 'medium',
  ...props
}: AvatarListProps) => {
  const count = userCount || users.length;

  return (
    <Users aria-label="users" {...props}>
      {users.slice(0, 3).map(({ id, name, avatarUrl }) => (
        <User key={id}>
          {/* TODO: WithTooltip 😱 */}
          {/* <WithTooltip
            hasChrome={false}
            placement="bottom"
            tooltip={<TooltipNote note={name} />}
            trigger="hover"
          > */}
          <UserAvatar
            isLoading={isLoading}
            size={size}
            src={avatarUrl}
            username={name}
          />
          {/* </WithTooltip> */}
        </User>
      ))}
      {count > 3 && (
        <UserEllipses aria-label={`${count - 3} more user(s)`}>
          {' '}
          &#43; {count - 3}{' '}
        </UserEllipses>
      )}
    </Users>
  );
};
