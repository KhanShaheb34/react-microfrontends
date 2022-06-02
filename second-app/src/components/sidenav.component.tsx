import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export type SideNavProps = {
  items: NavItemProps[];
};

export type NavItemProps = {
  title: string;
  to: string;
};

export const SideNav = (props: SideNavProps) => {
  return (
    <Box
      display="flex"
      flexDir="column"
      border="1px"
      borderRadius="md"
      borderColor="#ddd"
      marginX={10}
      marginBottom={10}
    >
      {props.items.map((item) => (
        <NavItem {...item} />
      ))}
    </Box>
  );
};

export const NavItem = (props: NavItemProps) => {
  return (
    <Text
      as={Link}
      padding={5}
      transition="all 0.3s ease-in-out"
      _hover={{
        backgroundColor: "#ddd",
      }}
      to={props.to}
      onClick={() => window.scroll({ top: 0, left: 0 })}
    >
      {props.title}
    </Text>
  );
};
