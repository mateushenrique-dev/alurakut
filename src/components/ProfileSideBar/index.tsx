import Box from '../Box';
import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommons';

interface IProfileSideBarProps {
  user: string;
}

export function ProfileSideBar({ user }: IProfileSideBarProps) {
  return (
    <Box as="aside">
      <img
        style={{ borderRadius: "8px" }}
        src={`https://github.com/${user}.png`}
        alt="Profile Picture"
      />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${user}`}>
          @{user}
        </a>
      </p>
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}
